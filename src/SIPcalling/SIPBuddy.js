/* eslint-disable no-console */
/**
 * @author Shubham Agarwal <shubham.agarwal@highradius.com>
 * @author Aditi Agrawal <aditi.agrawal@highradius.com>
 * @description
 * SIPBuddy is a SIP Client. It takes advantage of SIP and WebRTC to provide a fully featured SIP endpoint in any web application.
 * It allows any website to get real-time communication features using audio.
 * It makes it possible to build SIP user agents that send and receive audio video calls
 */
import { getCallStatus } from '../redux/actions/infoActions';
import store from '../redux/configureStore'
import {


	WEBSOCKET_STATUS,
	CALL_STATUS,
	DTMF_TONE_DURATION,
	DTMF_INTER_TONE_GAP,
	ICE_GATHERING_TIMEOUT,
	MAX_GET_USER_MEDIA_RETRIES
} from "./sipConstants";

const { JsSIP } = window;
const sessionEventsMap = {
	getusermediafailed: CALL_STATUS.GET_USER_MEDIA_FAILED,
	newDTMF: CALL_STATUS.NEW_DTMF,
	newInfo: CALL_STATUS.NEW_INFO,
	peerconnection: CALL_STATUS.PEER_CONNECTION,
	icecandidate: CALL_STATUS.ICE_CANDIDATE,
	connecting: CALL_STATUS.CONNECTING,
	progress: CALL_STATUS.PROGRESS,
	accepted: CALL_STATUS.ACCEPTED,
	confirmed: CALL_STATUS.CONFIRMED,
	ended: CALL_STATUS.ENDED,
	failed: CALL_STATUS.FAILED,
	hold: CALL_STATUS.HOLD,
	unhold: CALL_STATUS.UNHOLD,
	muted: CALL_STATUS.MUTED,
	unmuted: CALL_STATUS.UNMUTED
	// sdp: "",
	// reinvite: "",
	// update: "",
	// refer: "",
	// replaces: "",
	// sending: "",
	// "peerconnection:setremotedescriptionfailed": "",
	// "peerconnection:createofferfailed": "",
	// "peerconnection:createanswerfailed": ""
};
const uaEventsMap = {
	connecting: WEBSOCKET_STATUS.CONNECTING,
	connected: WEBSOCKET_STATUS.CONNECTED,
	registered: WEBSOCKET_STATUS.REGISTERED,
	unregistered: WEBSOCKET_STATUS.UNREGISTERED,
	registrationFailed: WEBSOCKET_STATUS.REGISTRATION_FAILED,
	disconnected: WEBSOCKET_STATUS.DISCONNECTED,
	newMessage: WEBSOCKET_STATUS.NEW_MESSAGE,
	newRTCSession: WEBSOCKET_STATUS.NEW_RTC_SESSION
	// newTransaction: "",
	// sipEvent: ""
};

export default class SIPBuddy {

	/**c
	 * @param {audio} audioSource
	 * @param {Object} IceServer
	 * @param {Function} registrationEventCallback - callBack event listner function for socket creation and sip Registeration
	 * @param {Function} outgoingCallEventCallback - callBack event listner function for outgoing Calls
	 * @param {Function} incomingCallEventCallback - callBack event listner function for incoming Calls
	 * @param {Function} incomingMessageEventCallback - callBack event listner function for incoming Messages
	 */
	constructor(
		iceServer,
		audioSource,
		registrationEventCallback,
		outgoingCallEventCallback,
		incomingCallEventCallback,
		incomingMessageEventCallback,
		debugMode = false
	) {
		this.iceServer = iceServer && iceServer !== "" ? JSON.parse(iceServer) : null;
		this.audioSource = audioSource;
		this.registrationEventCallback = registrationEventCallback;
		this.outgoingCallEventCallback = outgoingCallEventCallback;
		this.incomingCallEventCallback = incomingCallEventCallback;
		this.incomingMessageEventCallback = incomingMessageEventCallback;
		this.getUserMediaRetries = MAX_GET_USER_MEDIA_RETRIES;
		this.sipHeaders = null;
		this.phoneNumber = null;
		this.mediaStream = null;
		this.mediaConstraints = {
			audio: true,
			video: false
		};
		this.debug(debugMode);
	}

	/**
	 * Middleware for events emitted by the user agent
	 * @param {string} event - the name of the event
	 * @param {Object} data - data associated with the event
	 */
	userAgentEventMiddleware(event, data) {
		switch (event) {
			case WEBSOCKET_STATUS.NEW_MESSAGE:
				this.incomingMessageEventCallback(data.request.body);
				break;
			case WEBSOCKET_STATUS.NEW_RTC_SESSION:
				if (this.isOnCall() && !this.isRetrying()) data.session.terminate();
				else if (this.isRetrying() && data.session.direction === "incoming")
					data.session.terminate();
				else {
					this.session = data.session;
					this.hasActiveSession = true;
					if (this.session.direction === "incoming") {
						this.incomingCallRemoteIdentity = data.request.from._uri._user;
						Object.keys(sessionEventsMap).forEach(ev =>
							this.session.on(ev, dat => {
								console.log(`SIPBuddy::: Incoming Call Event: ${ev}`);
								this.incomingCallEventMiddleware(sessionEventsMap[ev], dat);
							})
						);
					} else {
						this.session.connection.addEventListener("addstream", e => {
							//Ringing
							store.dispatch(getCallStatus('Ringing'));
							console.log("SIPBuddy::: Outgoing Call Event: Stream Added");
							this.audioSource.srcObject = e.stream;
							this.audioSource.play();
						});
					}
				}
				break;
			case WEBSOCKET_STATUS.DISCONNECTED:
				this.hasActiveSession = false;
				this.registrationEventCallback(event);
				if (data?.error?.code === 1006) this.unregister();
				break;
			default:
				this.registrationEventCallback(event);
				break;
		}
	}

	/**
	 * Middleware for events emitted during an outgoing call
	 * @param {string} event - the name of the event
	 * @param {Object} data - data associated with the event
	 */
	outgoingCallEventMiddleware(event, data) {
		let statusCode;
		switch (event) {
			case CALL_STATUS.ICE_CANDIDATE:
				if (this.iceCandidateTimeout != null) clearTimeout(this.iceCandidateTimeout);
				this.iceCandidateTimeout = setTimeout(data.ready, ICE_GATHERING_TIMEOUT);
				break;
			case CALL_STATUS.CONNECTING:
				this.outgoingCallEventCallback(event);
				break;
			case CALL_STATUS.PROGRESS:
				this.sipHeaders = null;
				this.phoneNumber = null;
				this.getUserMediaRetries = MAX_GET_USER_MEDIA_RETRIES;
				this.outgoingCallEventCallback(event);
				break;
			case CALL_STATUS.ENDED:
			case CALL_STATUS.FAILED:
				if (data.cause === "User Denied Media Access" && this.getUserMediaRetries > 0) {
					this.getUserMediaRetries -= 1;
					this.call(this.phoneNumber, this.sipHeaders);
					return;
				}
				this.getUserMediaRetries = MAX_GET_USER_MEDIA_RETRIES;
				this.hasActiveSession = false;
				statusCode = this.getSipCode(data);
				//ended or failed
				store.dispatch(getCallStatus('Ended'));
				console.log(`SIPBuddy::: Outgoing Call Event: ${event} Status Code: ${statusCode}`);
				this.outgoingCallEventCallback(event, statusCode);
				break;
			default:
				this.outgoingCallEventCallback(event);
				break;
		}
	}

	/**
	 * Middleware for events emitted during an incoming call
	 * @param {string} event - the name of the event
	 * @param {Object} data - data associated with the event
	 */
	incomingCallEventMiddleware(event, data) {
		let statusCode;
		switch (event) {
			case CALL_STATUS.ICE_CANDIDATE:
				if (this.iceCandidateTimeout != null) clearTimeout(this.iceCandidateTimeout);
				this.iceCandidateTimeout = setTimeout(data.ready, ICE_GATHERING_TIMEOUT);
				break;
			case CALL_STATUS.PROGRESS:
				this.incomingCallEventCallback(event);
				break;
			case CALL_STATUS.PEER_CONNECTION:
				this.session.connection.addEventListener("addstream", e => {
					console.log("SIPBuddy::: Incoming Call Event: Stream Added");
					this.audioSource.srcObject = e.stream;
					this.audioSource.play();
				});
				break;
			case CALL_STATUS.ENDED:
			case CALL_STATUS.FAILED:
				this.hasActiveSession = false;
				this.incomingCallRemoteIdentity = null;
				statusCode = this.getSipCode(data);
				console.log(`SIPBuddy::: Incoming Call Event: ${event} Status Code: ${statusCode}`);
				this.incomingCallEventCallback(event, statusCode);
				break;
			default:
				this.incomingCallEventCallback(event);
				break;
		}
	}

	/**
	 * register is used to register a session with PBX and create websocket
	 * @param {string} serverIp - Address of the PBX
	 * @param {string} username - Username of SipUser
	 * @param {string} password - SipToken for the configuered virtual number
	 * @param {string} displayName - virtual number as the display name
	 */
	register(serverIp, username, password, displayName) {
		const socket = new JsSIP.WebSocketInterface(`wss://${serverIp}/ws`);
		const configuration = {
			sockets: [socket],
			uri: `sip:${username}@${serverIp};transport=ws;rtcweb-breaker=no`,
			realm: serverIp,
			password,
			display_name: displayName,
			register: true,
			turn_servers: this.iceServer,
			contact_uri: `sip:${username}@${serverIp};transport=wss;rtcweb-breaker=no`
		};
		this.userAgent = new JsSIP.UA(configuration);
		Object.keys(uaEventsMap).forEach(ev =>
			this.userAgent.on(ev, data => {
				console.log(`SIPBuddy::: UA Event: ${ev}`);
				this.userAgentEventMiddleware(uaEventsMap[ev], data);
			})
		);
		this.userAgent.start();
	}

	/**
	 * Unregister the user agent
	 */
	unregister() {
		if (this.isSessionRegistered()) this.userAgent.unregister({ all: true });
		this.stop();
	}

	/**
	 * Stop/Disconnect the user agent
	 */
	stop() {
		this.userAgent.stop();
	}

	/**
	 * Place an outgoing call
	 * @param {string} phoneNumber - the number on which an outgoing call has to be made
	 * @param {Object} sipHeaders - headers required to make an outgoing call
	 */
	call(phoneNumber, sipHeaders) {
		this.sipHeaders = sipHeaders;
		this.phoneNumber = phoneNumber;
		const options = {
			extraHeaders: this.headersFormatter(sipHeaders),
			mediaConstraints: this.mediaConstraints,
			pcConfig: { iceServers: this.iceServer }
		};
		if (this.mediaStream !== null) options.mediaStream = this.mediaStream;
		this.userAgent.call(phoneNumber, options);
		Object.keys(sessionEventsMap).forEach(ev =>
			this.session.on(ev, data => {
					//connecting accepted confirmed
				if(ev === 'connecting'){
					store.dispatch(getCallStatus('Connecting'));
				}
				if(ev === 'confirmed'){
					store.dispatch(getCallStatus('timer'));
				}
				console.log(`SIPBuddy::: Outgoing Call Event: ${ev}`);
				this.outgoingCallEventMiddleware(sessionEventsMap[ev], data);
			})
		);
	}

	/**
	 * Answer the incoming call
	 */
	answerIncomingCall() {
		if (this.session.direction === "incoming") {
			const options = {
				mediaConstraints: this.mediaConstraints,
				pcConfig: { iceServers: this.iceServer }
			};
			if (this.mediaStream !== null) options.mediaStream = this.mediaStream;
			this.session.answer(options);
		}
	}

	/**
	 * Send the DTMF tone during the call
	 * @param {string} tone - dtmf tone to be sent
	 */
	sendDTMF(tones) {
		if (!this.isOnCall() || !tones || tones === "") return;
		if (tones.match(/^[\d*#]+$/g) === null) {
			console.log(`SIPBuddy::: Invalid DTMF - ${tones}`);
			return;
		}

		const dtmfOptions = {
			duration: DTMF_TONE_DURATION,
			interToneGap: DTMF_INTER_TONE_GAP
		};
		this.session.sendDTMF(tones, dtmfOptions);
	}

	/**
	 * Mute the microphone during the call
	 */
	toggleMute() {
		if (!this.isOnCall()) return;
		if (this.session.isMuted().audio) this.session.unmute(this.mediaConstraints);
		else this.session.mute(this.mediaConstraints);
	}

	/**
	 * Terminate a outgoing call
	 */
	hangUp() {
		if (this.isOnCall()) this.session.terminate();
	}

	/**
	 * Restart the connection if connection failed or broken
	 */
	reInitiateRegistration() {
		if (!(this.isSessionRegistered() && this.isWebSocketConnected())) this.userAgent.start();
	}

	/**
	 * sipHeader as per JsSIP standards
	 * @param {JSONArray} sipHeaders - headers required to make an outgoing call
	 */
	headersFormatter = sipHeaders => {
		const headerArray = [];
		Object.keys(sipHeaders).forEach(key => {
			headerArray.push(`${key}: ${sipHeaders[key]}`);
		});
		return headerArray;
	};

	/**
	 * get SIP Status Code from event data
	 * @param {Object} data - data associated with an event
	 */
	getSipCode = data => {
		if (data.cause === "Terminated") return -1;
		if (data.cause === "Canceled") return 487;
		if (data.originator === "remote") return data?.message?.status_code;
		if (data.cause === "Rejected") return 603;
		return -1;
	};

	/**
	 *  Get the caller id of the incoming call
	 */
	getIncomingCallIdentity() {
		return this.incomingCallRemoteIdentity;
	}

	/**
	 *  Get the call direction
	 */
	getCallDirection() {
		if (this.isOnCall()) return this.session?.direction;
		return null;
	}

	/**
	 *  Initialise the user media device stream
	 */
	assignStream(stream) {
		this.mediaStream = stream;
	}

	/**
	 * Returns true if the User Agent is registered, false otherwise.
	 */
	isSessionRegistered() {
		return this.userAgent.isRegistered();
	}

	/**
	 * Returns true if the Call is Connected, false otherwise.
	 */
	isOnCall() {
		return this.hasActiveSession;
	}

	/**
	 * Returns true if the WebSocket connection is established, false otherwise.
	 */
	isWebSocketConnected() {
		return this.userAgent.isConnected();
	}

	/**
	 * Returns true if the UA is retrying to call in an event of UserMedia Error
	 */
	isRetrying() {
		return this.getUserMediaRetries < MAX_GET_USER_MEDIA_RETRIES;
	}

	/**
	 * Enable the debugMode
	 * @param {Boolean} debugMode
	 */
	debug = debugMode => {
		if (debugMode === true) JsSIP.debug.enable("JsSIP:*");
	};


}

