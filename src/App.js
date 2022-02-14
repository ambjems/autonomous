import  React from 'react';
import Drawers from './components/Drawers'
import Content from './components/Content';
import {useEffect} from 'react';
import { useDispatch,useSelector} from "react-redux";
import { getInfoRequest, getUpcomingRequest, getContactRequest } from "./redux/actions/infoActions";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getInfoRequest())
    dispatch(getUpcomingRequest())
  },[]);


  return (
    <div>
     <Drawers />
     <Content />
    </div>
  );
}

export default App;
