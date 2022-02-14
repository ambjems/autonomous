import React, {useEffect} from 'react';
import { useSelector, useDispatch} from "react-redux";
import HighCharts from 'highcharts'
import Card from '@material-ui/core/Card'
import { Typography } from '@material-ui/core';
import NoBroken from '../../../assets/no-broken.svg'
import Broken from '../../../assets/broken.svg'
import Check from './Check';
import { setValue, getContactRequest, changeInd } from './../../../redux/actions/infoActions';
const highChartRender = (highChartsHeight,id,cardData) =>{

      const chart = HighCharts.chart(`${'charts'+id}`,
    {
      chart:{
        type:'column',
        height: highChartsHeight + '%',
        backgroundColor:'#2D414F'
      },
    credits: {
      enabled: false
    },
    title: {
        text: null
    },
      series:[
        {
          data:[cardData[id].totalCurrentOpenAmount, 
                cardData[id].pastDueBucketDocumentAmount[0],
                cardData[id].pastDueBucketDocumentAmount[1],
                cardData[id].pastDueBucketDocumentAmount[2],
                cardData[id].pastDueBucketDocumentAmount[3],
                cardData[id].pastDueBucketDocumentAmount[4]        
        ],
          color:'#5DAAE0',
          showInLegend: false,
          enableMouseTracking:false
        }
      ],
      xAxis:{
        categories:cardData[0].bucketNames,
        tickLength: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        lineColor: '#3E515D',
        lineWidth: 0.5,
        labels: {
            style: {
                color: '#a4a8aa',
                fontSize:(highChartsHeight===80)?'5px':'8px',
            }
        }
        },
      yAxis: {
        title: {
            text: null
        },labels: {
            enabled: false
        },
        gridLineWidth: 0
    },
    plotOptions:{
      column:{
        dataLabels:{
          enabled:true,
          style:{
            borderWidth:'0',
            color:'#C9CFD2',
            fontSize:'10px',
            fontWeight:'normal',
            textOutline:'0 contrast',
          },
          formatter(){
            if(this.point.y >= 1000){
              return `$${(this.point.y/1000).toFixed(1)}K`
            }
            return `$${this.point.y.toFixed(0)}`
          }
        },
        series: {
            groupPadding: 0
        },
      },
      series: {
        borderWidth: 0,
        pointWidth: (highChartsHeight===80)?highChartsHeight*0.2:highChartsHeight*0.3,
        pointPadding: 0,
    }
    }

    });
    return chart;
};

export default function RestCard(props) {

  

    const highChartsHeight = useSelector((state) => state.info.highChartsHeight);
    const cardData = useSelector((state) => state.info.cardData);
    const value = useSelector((state) => state.info.value);

    const dispatch = useDispatch();
    const handleCheck=() =>{
        dispatch(setValue(props.id))    
        dispatch(getContactRequest(cardData[props.id].id))    
        dispatch(changeInd(0))   
    }
   

    useEffect(()=>{
        highChartRender(highChartsHeight,(props.id), cardData);
       // dispatch(getContactRequest(cardData[0].id)) 
    });

    function capitalize(input) {  
      var words = input.split(' ');  
      var CapitalizedWords = [];  
      words.forEach(element => {  
        if(element === 'usa' || element === 'bsd' || element === 'u.s.' || element === 'llc') CapitalizedWords.push(element.toUpperCase());
        else
          CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
      });  
      return CapitalizedWords.join(' ');  
  }  



    return (
        <Card 
        style={{ height: 'inherit'}}> 
                <div 
                    style={{backgroundColor:'#2D414F', 
                    height:'100%', 
                    width:'100%',
                    display:'flex',
                    flexDirection:'column'}}>

                    <div 
                    style={{ 
                    color:'#939EA4',
                    width:'100%', 
                    height:'13%',
                    paddingLeft:'5px',
                    paddingRight:'5px',
                    boxSizing:'border-box',
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'}}>

                        <Typography variant='subtitle1'
                        style={{fontWeight:'bold', overflow:'hidden'}}>{capitalize(cardData[props.id].customerName.toLowerCase())}
                        
                        </Typography>
                        
                        <div style={{display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'}}>
                        <Check
                            id={props.id}
                            value={value}
                            handleCheck={handleCheck}/>

                        <Typography variant='caption'>{cardData[props.id].customerNumber}</Typography>
                        </div>

                    </div>

                    <div 
                    style={{ 
                    width:'100%', 
                    height:'87%',
                    display:'flex',
                    flexDirection:'row'}}>

                            <div id={'charts'+props.id}
                            style={{width:'82%', height:'110%'}}>
                            </div>

                           {
                            (cardData[props.id].totalBrokenPromises>0)?
                            <div 
                            style={{ color:'#939EA4',
                            width:'18%', 
                            height:'100%',
                            padding:'30px 5px',
                            boxSizing:'border-box',
                            borderLeft:'0.5px solid #3B4E5A',
                            lineHeight: '10px',
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center'}}>
                                <Typography variant='h6'
                                            style={{color:'white'}}>{cardData[props.id].totalBrokenPromises}</Typography>     
                                  <img src={Broken} alt ='broken' style={{width:'100%'}}/>
                                <Typography variant='caption'
                                            style={{textAlign:'center'}}>Broken<br/>Promises</Typography> 
                            </div>:
                            <div 
                            style={{ color:'#939EA4',
                            width:'18%', 
                            height:'100%',
                            padding:'50px 5px',
                            boxSizing:'border-box',
                            borderLeft:'0.5px solid #3B4E5A',
                            lineHeight: '10px',
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center'}}>
                             <Typography variant='h6'
                                            style={{color:'white'}}>{}</Typography>
                               <img src={NoBroken} alt ='broken' style={{width:'100%'}}/>
                                      <Typography variant='caption'
                                            style={{textAlign:'center'}}>No Broken<br/>Promises</Typography>  
                            </div>
                           }

                           
                        
                    </div>


                 </div>
       
        </Card>
    );
}

