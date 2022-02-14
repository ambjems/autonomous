import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListItem, AppBar, Avatar, Typography, ListItemIcon} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '../assets/menu.svg'
import {ReactComponent as MenuIcon} from '../assets/menu.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '4vw',
    height: '100vh',
    backgroundColor: '#5DAAE0',
    float : 'left',
    boxSizing : 'border-box',
    position:"fixed",
    left: '0'
  },
  orange: {
    position: 'fixed',
    left : '4px',
    bottom : '5px',
  },
  paper: {
    background: "#5DAAE0",
    width:'30vw'
  }
}));
export default function Drawers() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        <AppBar className={classes.root}>

              <img src={Menu} alt='Menu'
              style={{cursor: 'pointer',height:'35', width:'35', padding:'8px'}}
              onClick={() => setIsOpen(true)}
              />
              
              <Divider 
                  style={{backgroundColor:'#FFFFFF', height:'0.5px'}}/>
              <Avatar
                   style={{backgroundColor:'green', 
                           position:'fixed', 
                           left:'5px', 
                           bottom:'0.8rem'}}/>
        </AppBar>

        <Drawer 
              transitionDuration = '0'
              classes={{ paper: classes.paper }} 
              anchor = "left" 
              open={isOpen}>
              <div 
                  style={{display:'flex', 
                          justifyContent: 'flex-start', 
                          padding:'0.5rem'}}>

              
                <MenuIcon style={{cursor: 'pointer',height:'35', width:'35'}}
                  onClick={() => setIsOpen(false)}/>

             
              <Typography 
                  variant='h6' 
                  style={{color:'#FFFFFF', paddingTop:'4px', paddingLeft:'10px'}}>MENU
              </Typography>

              </div>
                  
                      <List 
                            style={{color:'#FFFFFF', padding:'0px'}} 
                            onClick={() => setIsOpen(false)}>
                        <ListItem button>
                            <ListItemIcon>
                                  <ArrowBackIcon style={{color:'white'}}/>
                            </ListItemIcon>
                            <ListItemText primary = 'Switch Back to Enterprise UI' />
                         </ListItem>
                      </List>

                  <div 
                      style={{position:'fixed', 
                              bottom:'0.5rem', 
                              display:'flex', 
                              justifyContent:'flex-start', 
                              alignItems:'center'}}>

                      <Avatar alt="Profile Pic" 
                              style={{backgroundColor:'green', margin:'5px'}}/>
                      <Typography 
                              style={{
                                  color:'#FFFFFF',
                                  paddingLeft:'10px'}}>Amb Jems
                        </Typography>

                    <button 
                            style={{
                              cursor: 'pointer',
                              backgroundColor:'#39495E',
                              color:'white',
                              marginLeft:'10vw', 
                              padding:'7px 15px', 
                              borderRadius:'2rem', 
                              border:'0px solid black'}}>LOGOUT
                    </button>
                  </div>
        </Drawer>
    </div>
  );
}
