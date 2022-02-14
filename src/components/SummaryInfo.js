import React from 'react'
import {useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
export default function SummaryInfo() {

    const news = useSelector((state) => state.info.info);

    const num1 = (news.totalPastDueAmount/1000).toFixed(1);
    const num2 = (news.totalPastDueProcessed/1000).toFixed(1);
    

    return (
        <div style={{width:'50%', display:'flex', backgroundColor:'#405065', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
         <div style={{display:'flex', flexDirection:'column'}}>
         <div style={{ color:'#FFFFFF',display:'flex', flexDirection:'row', alignItems:'center'}}>
         <Typography variant="subtitle1" style={{fontWeight:'bold'}}>{news.processedCustomerCount}
         
         /</Typography>
         <Typography variant="caption">{news.totalCustomerCount}</Typography>
         </div>
         <Typography variant="caption" style={{margin:'0px', color:'#5DAAE0'}}>Total Customers Called</Typography>
         </div>
         <Divider orientation="vertical" style={{backgroundColor:'#5DAAE033',width:'0.1%'}} flexItem />

         <div style={{display:'flex', flexDirection:'column'}}>
         <div style={{ color:'#FFFFFF',display:'flex', flexDirection:'row', alignItems:'center'}}>
         <Typography variant="subtitle1" style={{fontWeight:'bold'}}>{news.completedCallingMinutes}</Typography>
         <Typography variant="caption">min</Typography>
         <Typography variant="subtitle1">/</Typography>
         <Typography variant="caption">{news.expectedCallingMinutes}min</Typography>
         </div>
         <Typography variant="caption" style={{margin:'0px', color:'#5DAAE0'}}>Total Time Spent on Call</Typography>
         </div>
         <Divider orientation="vertical" style={{backgroundColor:'#5DAAE033',width:'0.1%'}} flexItem/>
         <div style={{display:'flex', flexDirection:'column'}}>
         <div style={{ color:'#FFFFFF',display:'flex', flexDirection:'row', alignItems:'center'}}>
         <Typography variant="subtitle1" style={{fontWeight:'bold'}}>${num2}K/</Typography>
         <Typography variant="caption">${num1}K</Typography>
         </div>
         <Typography variant="caption" style={{margin:'0px', color:'#5DAAE0'}}>Total Past Due Touched</Typography>
         </div>
         

        </div>
    )
}
