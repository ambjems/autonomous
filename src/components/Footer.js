import React from 'react'
import { Typography } from '@material-ui/core';
import dot1 from '../assets/dots1.svg'
import dot2 from '../assets/dots2.svg'
import { useSelector} from "react-redux";

export default function Footer() {
    const noOfCards = useSelector((state) => state.info.noOfCards);
    return (
        <div 
            style={{padding:'0 1%', 
                    color:'#FFFFFFA6', 
                    display:'flex', 
                    flexDirection:'row', 
                    justifyContent:'space-between'}}>

           <Typography style={{marginTop:'0px', fontSize:'0.7rem'}}>Viewing {noOfCards} - {noOfCards+4} of 20</Typography>
          {
              (noOfCards===1)?
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={dot1} alt='dot1' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot2' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
           </div>:
           (
               (noOfCards===6)?
               <div style={{display:'flex', alignItems:'center'}}>
                <img src={dot2} alt='dot1' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot1} alt='dot2' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
           </div>:
                (
                    (noOfCards===11)?
                    <div style={{display:'flex', alignItems:'center'}}>
                <img src={dot2} alt='dot1' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot2' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot1} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
           </div>:
           <div style={{display:'flex', alignItems:'center'}}>
                <img src={dot2} alt='dot1' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot2' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot2} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
                <img src={dot1} alt='dot3' height='8px' width='8px' style={{paddingRight:'3px'}}/>
           </div>
                )
           )
          }
           <Typography style={{marginTop:'0px', fontSize:'0.7rem'}}>© Copyright 2018 HighRadius. All Rights Reserved.</Typography>
        </div>
    )
}
