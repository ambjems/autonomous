import React, {useEffect} from 'react';
import { useSelector} from "react-redux";
import Card from '@material-ui/core/Card'
import HighCharts from 'highcharts'
import { Typography } from '@material-ui/core';

const highChartRender = (highChartsHeight,id,upcomingData) =>{

    const chart = HighCharts.chart(`${'charts'+id}`,
  {
    chart:{
      type:'column',
      height: highChartsHeight-14 + '%',
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
        data:[upcomingData.upcomingPastDueBucketDocumentAmount[0], 
        upcomingData.upcomingPastDueBucketDocumentAmount[1],
        upcomingData.upcomingPastDueBucketDocumentAmount[2],
        upcomingData.upcomingPastDueBucketDocumentAmount[3],
        upcomingData.upcomingPastDueBucketDocumentAmount[4],
        upcomingData.upcomingPastDueBucketDocumentAmount[5]        
        ],
        color:'#5DAAE0',
        showInLegend: false,
        enableMouseTracking:false
      }
    ],
    xAxis:{
      categories:["1-30","31-60","61-90","91-180","181-360",">361"],
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
          return `$${this.point.y}`
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

export default function LastCard (props){

    const highChartsHeight = useSelector((state) => state.info.highChartsHeight);
    const upcomingData = useSelector((state) => state.info.upcomingData);
   
    useEffect(()=>{
      highChartRender(highChartsHeight,props.id,upcomingData)
    })

    return(
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
                        style={{fontWeight:'bold'}}>Remaining Balance Summary</Typography>  
                   
                    </div>

                      <div  id={'charts'+props.id}
                            style={{
                            width:'100%', 
                            height:'87%',
                            display:'flex',
                            flexDirection:'row'}}>      
                    </div>  
                 
                 </div>
       
        </Card>
    );
}