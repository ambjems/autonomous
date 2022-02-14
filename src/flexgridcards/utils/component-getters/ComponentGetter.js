import React,{useState} from "react";
import { MY_RENDER_APP } from "../Constants";
import RestCard from '../../components/homePage/RestCard'
import LastCard from "../../components/homePage/LastCard";


let i = 0;
let value = 0;

function componentGetter(props){




  const {componentId} = props;
 
    switch (componentId) {
      case MY_RENDER_APP.REST_CARD:
        return (                   
              <RestCard id={(i++)%5} value={(value++)%5}/>         
        );
        case MY_RENDER_APP.LAST_CARD:
        return (                   
              <LastCard id={55}/>         
        );
      default:
        return null;
        }
}

export default componentGetter;
