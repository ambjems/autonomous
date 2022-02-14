import SIPBuddy from './SIPBuddy';
import { getUniqueId } from '../redux/actions/infoActions';
import store from '../redux/configureStore'
var sip;
var audioRemote = document.getElementById('audio_remote');

export function sipStart(virtualNumberConfig, asteriskConfig) {
  sip = new SIPBuddy(
    asteriskConfig.iceServers,
    audioRemote,
    registrationEventCallback,
    outgoingCallEventCallback,
    incomingCallEventCallback,
    incomingMessageEventCallback
  );

  sip.register(
    asteriskConfig.asteriskIp,
    virtualNumberConfig.sipUser,
    virtualNumberConfig.sipToken,
    virtualNumberConfig.virtualNumber
  );
}

function registrationEventCallback(e) {
  console.log('registration status -->' + e);
}
function incomingCallEventCallback() {}

export function sipCall(phoneNumber) {
  if (sip.isSessionRegistered()) {
    const sipHeaders = {
      'Caller-ID': '18329007690', //Caller ID
      'Do-Record': 'true',
      'Phrase-Hint': '["Tovo Test2","CollectionsTovo","Tovo","Test2",null,""]',
      Platform: 'tovo',
      UID: generateUID(phoneNumber),
      accountId: '12208', //Employee ID
      agentId: '27449',
      callRecordingType: 'CALL_RECORDING_DISABLED',
      isAutoSuggestedActionsRequired: 'false',
      isDialPlanRequired: 'false',
      isTranscriptRequired: 'false',
      sipTrunk: 'twiliofdev', //SIP Trunk
      transcriptLanguage: 'en-US',
      virtualNumber: '18329007690', //Caller ID
    };

    sip.call(phoneNumber, sipHeaders);
  }
}

function generateUID(phoneNumber) {
  let out = 'OUT';
  let num = phoneNumber;
  let currentDate = new Date();

  const today = new Date();
  var dateObj = today.toJSON().slice(0, 10);

  /* Captures Current date */
  var date = dateObj.slice(8, 10) + dateObj.slice(5, 7) + dateObj.slice(0, 4);
  let time =
    currentDate.getHours() +
    ':' +
    currentDate.getMinutes() +
    ':' +
    currentDate.getSeconds();

  let acc_id = 12208;

  store.dispatch(getUniqueId(out + '-' + num + '-' + date + '-' + time + '-' + acc_id));

  return out + '-' + num + '-' + date + '-' + time + '-' + acc_id;
}

function outgoingCallEventCallback(e, cause = null) {
  console.log(generateUID('+9779827652779'));
  console.log('Outgoing:' + e);
}

function incomingMessageEventCallback(e, cause = null) {}

export const hangupCall = () => {
  if (!sip) return;
  if (sip.isOnCall()) {
    sip.hangUp();
  }
};

export function sipUnregister() {
  sip.unregister();
}

export function callMuteUnmute() {
  sip.toggleMute();
}

export function answerCall() {}

export function recordCall() {}

