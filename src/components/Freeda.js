import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FreedaIcon from '../assets/freeda.svg'
import Avatar from '@material-ui/core/Avatar';
import { useDispatch } from "react-redux";
import {showFreeda} from '../redux/actions/infoActions'
export default function Freeda() {

    const dispatch = useDispatch();
    const handleFreeda=() =>{
        dispatch(showFreeda())           
    }

    return (
        <div 
        style={{
            backgroundColor:'#39495E', 
            height:'100%', 
            width:'20%',
            borderLeft:'1px solid white',
            boxSizing:'border-box'}}>
            <Divider orientation="vertical" flexItem />
            <Paper 
            style={{
                backgroundColor:'#2D4250', 
                height:'100%',
                width:'96%', 
                borderTop:'2px solid #AD6225',
                marginLeft:'3%'}} 
            variant='outlined' elevation={3}>

            <div style={{display:'flex', flexDirection:'column', margin:'8px'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', color:'#CAD0D3'}}>
                     <Typography>FREEDA</Typography>
                    <CloseIcon style={{cursor: 'pointer'}}
                        onClick={handleFreeda}
                    />
                 </div>
                 <div style={{paddingTop:'15px', display:'flex', flexDirection:'row'}}>
                     <img 
                     style={{transform:'scaleX(-1)'}}
                     src={FreedaIcon} alt='Freeda' height='24px' width='24px'/>
                     <div style={{paddingLeft:'10px', color:'#ECEEEF', display:'flex', flexDirection:'column'}}>
                             <Typography variant='caption'>Hi, Jems,</Typography>
                             <Typography variant='caption'>How can I help you?</Typography>
                     </div>
                 </div>

                 <div style={{color:'#ECEEEF', paddingTop:'15px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>

                             <Typography variant='caption'>Pull up account Walmart</Typography>
                             <Avatar  style={{
                                        backgroundColor:'#4F8DB8', height:'25px', width:'25px',
                                        marginLeft:'10px', fontSize:'10px'
                            }}>ME</Avatar>
                 </div>

                 <div style={{paddingTop:'15px', display:'flex', flexDirection:'row'}}>
                     <img 
                     style={{transform:'scaleX(-1)'}}
                     src={FreedaIcon} alt='Freeda' height='24px' width='24px'/>
                     <div style={{paddingLeft:'10px', color:'#ECEEEF', display:'flex', flexDirection:'column'}}>
                             <Typography variant='caption'>I found 3 customers by</Typography>
                             <Typography variant='caption'>name Walmart, which one?</Typography>
                     </div>
                 </div>

                 <div style={{paddingTop:'5px', display:'flex', flexDirection:'column'}}>
        
                     <div style={{backgroundColor:'#37576D', padding:'5px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                             <Typography 
                             style={{fontWeight:'bold', color:'#CDD5DA'}}
                             variant='caption'>Walmart USA</Typography>
                             <Typography 
                             style={{fontSize:'10px', color:'#CDD5DA'}}
                             variant='caption'>4435434232</Typography>
                     </div>
                     <div style={{backgroundColor:'#37576D', margin:'5px 0px', padding:'5px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                             <Typography 
                             style={{fontWeight:'bold', color:'#CDD5DA'}}
                             variant='caption'>Walmart Asia</Typography>
                             <Typography 
                             style={{fontSize:'10px', color:'#CDD5DA'}}
                             variant='caption'>3645344343</Typography>
                     </div>
                     <div style={{backgroundColor:'#37576D', padding:'5px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                             <Typography 
                             style={{fontWeight:'bold', color:'#CDD5DA'}}
                             variant='caption'>Walmart Malaysia</Typography>
                             <Typography 
                             style={{fontSize:'10px', color:'#CDD5DA'}}
                             variant='caption'>265464543</Typography>
                     </div>
                 </div>

                 <div style={{color:'#ECEEEF', paddingTop:'15px', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>

                             <Typography variant='caption'>Okay, Select Walmart Asia</Typography>
                             <Avatar  style={{
                                        backgroundColor:'#4F8DB8', height:'25px', width:'25px',
                                        marginLeft:'10px', fontSize:'10px'
                            }}>ME</Avatar>
                 </div>

            </div>

            </Paper>
        </div> 
    )
}
