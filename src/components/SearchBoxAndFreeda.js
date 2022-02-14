import React, {useState} from 'react';
import { useDispatch} from "react-redux";
import Freeda from '../assets/freeda.svg'
import Search from '../assets/search.svg'
import Call from '../assets/call.svg'
import End from '../assets/end.svg'
import Input from '@material-ui/core/Input';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';
import {showFreeda} from '../redux/actions/infoActions'
import { Typography } from '@material-ui/core';
import CallingInfra from './CallingInfra';
export default function SearchBoxAndFreeda() {
    const dispatch = useDispatch();

    const [typing, setTyping] = useState(false);
    const [value, setValue] = useState('');

    const onChangeFunc = (e) =>{
            if(e.target.value){
                setTyping(true);
                setValue(e.target.value)
            }
            else{
                setTyping(false)
                setValue('')
            }
    }

    const noTyping = () =>{
                setTyping(false)
                setValue('')
    }

    const handleFreeda=() =>{
        dispatch(showFreeda())           
    }

    return (
        <div 
            style={{
                
                    display:'flex', 
                    flexDirection:'row', 
                    justifyContent:'flex-end', 
                    alignItems:'center',
                    width:'40%'}}>

            <CallingInfra/>
           
            <Input 
                onChange={onChangeFunc} 
                value = {value}
                startAdornment={<img src={Search} alt='Freeda' height='32px' width='32px'/>}
                endAdornment={(typing)?<CloseIcon onClick={noTyping} style={{cursor: 'pointer', color:'#59A0D3'}}/>:<ArrowDropDownIcon style={{cursor: 'pointer', color:'#59A0D3'}}/>} disableUnderline placeholder='  Search Name' variant='body2'
                
                style={{
                    color:'#FFFFFF',
                    fontSize:'0.9rem',
                    width:'50%',
                    paddingRight:'5px',
                    border:'1px solid #5DAAE0',
                    borderRadius: '2rem',
                    marginRight:'2%'}}/>
            <button 
                onClick={handleFreeda}
                style={{
                    backgroundColor:'#FC7500',
                    marginRight:'1%',
                    padding:'2px 1px 2px 10px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between',
                    color:'white',  
                    borderRadius:'2rem', 
                    border:'0px',
                    cursor:'pointer'}}>
                    <Typography variant='body2'>FREEDA</Typography>
                    <img src={Freeda} alt='Freeda' height='28px' width='28px'/>
            </button>
         </div>
    )
}
