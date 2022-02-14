import React from "react";
import {getCallDuration} from '../redux/actions/infoActions'
import { useDispatch,useSelector} from "react-redux";
const Timer = () => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);
  const dispatch = useDispatch();
  var a = useSelector((state) => state.info.duration);
  React.useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        a=a+10;
        dispatch(getCallDuration(a)) 
        setTime((prevTime) => prevTime + 10);
        
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  React.useEffect(()=>{
      setTimerOn(true);
  },[])

  return (
    <div className="Timers" style={{color:'#5DAAE0'}}>
      <div id="display">
      {/* {dispatch(getCallDuration(time))} */}
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
    </div>
  );
};

export default Timer;