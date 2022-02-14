import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

export default function Title() {
    return (
        <div 
            style={{color:'#5DAAE0',
                    display:'flex', 
                    flexDirection:'row', 
                    alignItems:'center', 
                    width:'40%'}}>

            <ArrowBackIcon style={{margin:'0.8rem', color:'#FFFFFF'}} />
            <Typography variant="h6">Call Workboard</Typography>
        </div>
    )
}
