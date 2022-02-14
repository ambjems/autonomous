import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch} from "react-redux";
import { getInfoRequest, getUpcomingRequest } from "../redux/actions/infoActions";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Freeda from './Freeda';
import HomePage from '../flexgridcards/views/HomePage'
import SummaryInfo from './SummaryInfo';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const show = useSelector((state) => state.info.showFreeda);
  const width = useSelector((state) => state.info.width);
  const showF = useSelector((state) => state.info.showFreeda);
  const loading = useSelector((state) => state.info.loading);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createMuiTheme({
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: '#B5BBC3'
        },
        root: {
          backgroundColor: '#405065',
          color: '#599FD2'
        }
      }
    }
  });

  const dispatch = useDispatch();

  const nextPage = () =>{
    dispatch(getInfoRequest(-1))
    dispatch(getUpcomingRequest())
  }



  return (
    <MuiThemeProvider theme={theme}>
        <div className={classes.root} style={{display:'flex', flexDirection:'row', width:'100%'}}>
            <div style={{display:'flex', flexDirection:'column', width:`${width}%`}}>
                <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                      <div style={{width:'50%'}}>
                          <AppBar position="static" elevation='0'>
                              <Tabs
                                  value={value} 
                                  onChange={handleChange} 
                                  aria-label="simple tabs example">
                                  <Tab label="TO CALL LIST (15)" {...a11yProps(0)} 
                                       style={{display:'flex', alignItems:'flex-end',fontSize:'12px', fontWeight:'bold'}}
                                  />
                                  <Tab label="FINISHED CALL LIST" {...a11yProps(1)} disabled
                                       style={{display:'flex', alignItems:'flex-end',fontSize:'12px', fontWeight:'bold'}}
                                  />
                                  <Tab label="SEARCH RESULTS" {...a11yProps(2)} disabled
                                       style={{display:'flex', alignItems:'flex-end',fontSize:'12px', fontWeight:'bold'}}
                                  />
                              </Tabs>
                            </AppBar>
                        </div>

                      <SummaryInfo/>

                      <Fab onClick={nextPage} size="small"
                            style={{backgroundColor:'#14AFF1',position:'fixed', color:'#FFFFFF', 
                                    top:'52%', right:(showF)?'21%':'3%'}}>
                      <ArrowForwardIosIcon/>
                      </Fab>
                       
                       {/* {
                         (loading)?<div></div>:(
                          <div style={{ 
                        height:'20px',
                        width:'20px',
                        backgroundColor:'#5DAAE0', 
                        position:'fixed', 
                        top:'55%',
                        textAlign:'center',
                        right:(showF)?'280px':'40px',
                        borderRadius:'50%',
                        cursor:'pointer',}}
                        onClick={nextPage}>

                       <ArrowForwardIosIcon style={{ 
                        color:'#FFFFFF', 
                        paddingBottom:'3px',
                        paddingLeft:'2px',
                        fontSize:'12px'}}
                        />

                        </div>
                         )
                       } */}

                </div>

                <div 
                    style={{backgroundColor:'#405065', 
                            height:'100%', 
                            width:'100%', 
                            padding:'0'}}>
                    <TabPanel value={value} index={0} style={{padding:'0px'}}>
                            <HomePage/>
                            
                    </TabPanel>
                   
                </div>
            </div>
            {
                (show)? <Freeda/>:<div></div>
            }
        </div>
    </MuiThemeProvider>
  );
}