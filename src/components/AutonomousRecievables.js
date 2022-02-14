import React from 'react';
import Typography from '@material-ui/core/Typography';
import AutoIconLeft from '../assets/auto-1.svg';
import AutoIconRight from '../assets/auto-2.svg';
export default function AutonomousRecievables() {
    return (
        <div 
            style={{display:'flex', 
                    flexDirection:'row', 
                    justifyContent:'center', 
                    alignItems:'flex-start', 
                    width:'20%'}}>

                    <div 
                         style={{borderRadius:'0px 0px 8px 8px', 
                                 height:'25%',
                                 backgroundColor:'#FC7500', 
                                 color:'#FFFFFF', 
                                 display:'flex', 
                                flexDirection:'row'}}>

                        <img src={AutoIconLeft} alt='AutoIconLeft' height='8px' width='8px' />
                        <Typography style={{fontSize:'8px'}}>AUTONOMOUS RECEIVABLES</Typography>
                        <img src={AutoIconRight} alt='AutoIconRight' height='8px' width='8px' />

                    </div>
        </div>
    )
}
