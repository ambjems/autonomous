import React, {useState, useEffect} from 'react';
import Call from '../assets/call.svg'
import End from '../assets/end.svg'
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import Popper from '@material-ui/core/Popper';
import CallIcon from '@material-ui/icons/Call';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography, duration } from '@material-ui/core';
import {getCallDuration,getCallStatus,changeInd, createCommunication, updateCommunication} from '../redux/actions/infoActions'
import Timer from './Timer'
import './Popper.css'
import {
  sipStart,
  sipCall,
  hangupCall,
  callMuteUnmute,
} from '../SIPcalling/sipUtil';
export default function CallingInfra() {

  const BlueRadio = withStyles({
    root: {
      color: '#78838C',
      '&$checked': {
        color: '#14AFF1',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

 
    var localCallStatus = null;
    const contact = useSelector((state) => state.info.contact);
    const status = useSelector((state) => state.info.status);
    const ind = useSelector((state) => state.info.ind);
    const cardIndex = useSelector((state) => state.info.value);
    const cardData = useSelector((state) => state.info.cardData);
    const comId = useSelector((state) => state.info.commId);
    const uniqueId = useSelector((state) => state.info.uniqueId);
    const duration = useSelector((state) => state.info.duration);
    const dispatch = useDispatch();
    //const [showPopper, setShowPopper] = useState(false);
    const [mute, setMute] = useState(false);
  
    const handleClick = (event) =>{
      setAnchorEl(anchorEl ? null : event.currentTarget);  
    }

   
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const open = Boolean(anchorEl);
    const id = open ? 'spring-popper' : undefined;
  
    const [value, setValue] = React.useState('phone');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    const callNow = (index)=>{
      if(value==='phone'){
        sipCall(contact[index].phoneNumber);
        dispatch(changeInd(index))
        dispatch(createCommunication({customerMapId:cardData[cardIndex].id,
          totalOpenAmount: cardData[cardIndex].totalCurrentOpenAmount,
          totalPastDueAmount: cardData[cardIndex].pastDueBucketDocumentAmount.reduce(function(a, b){
            return a + b;
        }, 0),
          dialedNumber: contact[index].phoneNumber}))
      }else{
        sipCall(contact[index].mobileNumber);
        dispatch(changeInd(index))
        dispatch(createCommunication({customerMapId:cardData[cardIndex].id,
          totalOpenAmount: cardData[cardIndex].totalCurrentOpenAmount,
          totalPastDueAmount: cardData[cardIndex].pastDueBucketDocumentAmount.reduce(function(a, b){
            return a + b;
        }, 0),
          dialedNumber: contact[index].mobileNumber}))
      }
    }

    const virtualNumberConfig = {
      virtualNumber: 'ambuj-chaudhary',
      fullName: 'ambuj-chaudhary',
      sipUser: 'ambuj-chaudhary',
      sipToken: 'nnbfnFDDtpZawJSMVLPhq',
      incomingNumber: '18329007690',
    };
    const asteriskConfig = {
      asteriskIp: 'call-sandbox.highradius.com',
      iceServers:
      "[{\"urls\":\"stun:global.stun.twilio.com:3478?transport=udp\",\"url\":\"stun:global.stun.twilio.com:3478?transport=udp\"},{\"urls\":\"turn:global.turn.twilio.com:3478?transport=udp\",\"credential\":\"00GFMckG1EZIxNoCyMawP7PyaVFg0Ry1ptO43ha/8+U=\",\"url\":\"turn:global.turn.twilio.com:3478?transport=udp\",\"username\":\"0303a485b90809fd8539a69e14518219eac26bbed3b36e88571e289fbb91d4fb\"},{\"urls\":\"turn:global.turn.twilio.com:3478?transport=tcp\",\"credential\":\"00GFMckG1EZIxNoCyMawP7PyaVFg0Ry1ptO43ha/8+U=\",\"url\":\"turn:global.turn.twilio.com:3478?transport=tcp\",\"username\":\"0303a485b90809fd8539a69e14518219eac26bbed3b36e88571e289fbb91d4fb\"},{\"urls\":\"turn:global.turn.twilio.com:443?transport=tcp\",\"credential\":\"00GFMckG1EZIxNoCyMawP7PyaVFg0Ry1ptO43ha/8+U=\",\"url\":\"turn:global.turn.twilio.com:443?transport=tcp\",\"username\":\"0303a485b90809fd8539a69e14518219eac26bbed3b36e88571e289fbb91d4fb\"}]"
     ,ipTrunk: 'twiliofdev',
    };

  
    useEffect(() => {
      sipStart(virtualNumberConfig, asteriskConfig);
    }, []);
    var call = () => {
      const today = new Date();
      var year = today.getFullYear().toString();
      var month = today.getMonth().toString();
      var date = today.getDate().toString();
      const dt = (year+'-'+month+'-'+date).toString()
      console.log(dt);
      sipCall(contact[0].phoneNumber);
      dispatch(changeInd(0))
      dispatch(getCallDuration(0)) 
      dispatch(createCommunication({dateTime:dt,
        uniqueId:uniqueId.toString(),
        customerMapId:cardData[cardIndex].id,
        totalOpenAmount: cardData[cardIndex].totalCurrentOpenAmount,
        totalPastDueAmount: cardData[cardIndex].pastDueBucketDocumentAmount.reduce(function(a, b){
          return a + b;
      }, 0),
        dialedNumber: contact[0].phoneNumber}))
    };

    if(status === 'Ended'){
      setTimeout(()=>{
        dispatch(getCallStatus(''));
      },1000);
      
    }

    if(status==='timer'){
      localCallStatus = 'Successful'
    }else if(status === 'Ringing'){
      localCallStatus = 'Unanswered/Declined'
    }else{
      localCallStatus = 'Failed'
    }
  
    var hangup = () => {
      hangupCall();
      
      console.log('fireddd')
      console.log(duration/1000)
      dispatch(updateCommunication({comId:comId,
      callDuration: duration,
      callStatus:localCallStatus}));
    };

    const muteUnmute = () => {
      if(mute === false){
        setMute(true);
      callMuteUnmute();
      }
      else{
        setMute(false);
      callMuteUnmute();
      }
    };
    
    return (
        <div style={{width:'67%', height:'70%', 
                        border:'1px solid #14AFF1',
                        marginRight:'5px',
                        borderRadius: '2rem',
                        paddingLeft:'5px',
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between'}}>

               <div style={{display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-end'}}>
               <Typography variant='body2' 
               style={{color:'#8E98A4', padding:'0 8px'}}>{contact[ind].firstName}</Typography>
               {
                 (contact[ind].firstName==='Select a card to call' || contact[ind].firstName==='No contacts')?<div></div>:
                    <ExpandMoreIcon 
                    style={{ color:'#8E98A4',cursor:'pointer',height:'20px', width:'20px'}} 
                    onClick={handleClick}/> 
               }
               </div>
                <Typography variant='caption'> 
                            {(status==='timer')?<Timer/>: 
                            <div style={{color:'#FFFFFF'}}>{status}</div>}
                </Typography>

                {
                  (status==='timer')?
                  (<div style={{display:'flex', alignItems:'center'}}>
                  {
                       (mute)?<MicOffIcon style={{ color:'#8E98A4',cursor:'pointer',height:'20px', width:'20px'}}  
                       onClick={muteUnmute}/>:
                       <MicIcon style={{color:'#8E98A4', cursor:'pointer',height:'20px', width:'20px'}} 
                       onClick={muteUnmute}/>
                  }</div>
                   ):
                   (<div></div>)
                }

                {
                 (status==='')?

                 ((contact[ind].firstName==='Select a card to call')?

                 <div 
                style={{width:'17%', height:'100%', 
                backgroundColor:'#8FD163',
                borderRadius:'50%', 
                display:'flex',
                justifyContent:'center', 
                alignItems:'center', 
                cursor:'pointer'}}>
                        <img src={Call} alt='Call' height='18px' width='18px'/>
                </div>:

                <div 
                onClick={call} style={{width:'17%', height:'100%',
                 backgroundColor:'#8FD163',
                borderRadius:'50%', 
                display:'flex',
                justifyContent:'center', 
                alignItems:'center', 
                cursor:'pointer'}}>
                        <img src={Call} alt='Call' height='18px' width='18px'/>
                </div>
                )
                :
                <div onClick={hangup}
                style={{ cursor:'pointer',width:'17%', height:'100%', 
                backgroundColor:'#FF5B5B',
                borderRadius:'50%', 
                display:'flex',
                justifyContent:'center', 
                alignItems:'center'}}>
                        <img src={End} alt='End' height='20px' width='20px'/>
                </div>
               }

           
            <Popper  id={id} open={open} anchorEl={anchorEl} transition>

              <div className='box arrow-top'></div>
            
              <div className='popper' 
              style={{marginTop:'2vh', width:'25vw',
              scrollbarWidth:'10px',
              borderRadius:'5px',
              border:'1px solid #14AFF1', 
              height:'85vh', elevation:'5',
              backgroundColor:'#283A46', 
              padding:'10px', 
              color:'#FFFFFF', 
              overflow:'auto'}}>
                 <Typography style={{fontSize:'20px'}}>Contacts</Typography>

          { 
              contact.map((element,index)=>{
                  return(
                    <div key={index} style={{width:'100%%',
                                           height:'25vh',
                                           backgroundColor:'#21303B', 
                                           borderRadius:'5px', 
                                           color:'white', 
                                           padding:'10px', 
                                           margin:'5px',
                                           display:'flex',
                                           flexDirection:'column',
                                           justifyContent:'space-around',
                                          }}>
                <div>
                  <Typography style={{fontSize:'14px'}}>{element.firstName}{' '}{element.lastName}</Typography>
               </div>

               <div>
               <RadioGroup aria-label="gender" name="gender1" 
                           value={value} onChange={handleChange} 
                           style={{display:'flex', flexDirection:'row', 
                           flexWrap:'nowrap', justifyContent:'flex-start'}}>

                  <FormControlLabel value="phone" control={<BlueRadio  />} 
                  label={<Typography style={{fontSize:'10px', color:'#C0C6CA'}}>
                  Phone Number:<br/><Typography style={{fontSize:'12px', color:'#FFFFFF'}}>
                  {element.phoneNumber}</Typography></Typography> } />
                  
                  <FormControlLabel value="mobile" control={<BlueRadio />} 
                  label={<Typography style={{fontSize:'10px', color:'#C0C6CA'}}>
                  Mobile Number:<br/><Typography style={{fontSize:'12px', color:'#FFFFFF'}}>
                  {element.mobileNumber}</Typography></Typography>} />

              </RadioGroup>        
               </div>

               <div>
                 <CallIcon onClick={()=>{callNow(index)}} 
                 style={{cursor:'pointer',padding:'5px', borderRadius:'50%', border:'1px solid #14AFF1'}}/>
               </div>
              </div>
            )
        })
      }
      </div>
      </Popper>
    </div>

    )
}
