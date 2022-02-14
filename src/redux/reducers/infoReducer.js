import {GET_CALL_DURATION,UNIQUE_ID, UPDATE_COMMUNICATION,GET_COM_ID,CREATE_COMMUNICATION,GET_CALL_STATUS,GET_CONTACT_DATA, GET_CONTACT_REQUEST, GET_UPCOMING_REQUEST,GET_INFO_SUCCESS, GET_INFO_FAILURE, SHOW_FREEDA,GET_UPCOMING_DATA} from '../types/infoTypes'
import {CHANGE_IND,SET_VALUE, GET_INFO_REQUEST } from '../types/infoTypes';

const initialState = {
    loading: true,
    info:{
      completedCallingMinutes: 8,
      expectedCallingMinutes: 22,
      processedCustomerCount: 2,
      totalCustomerCount: 9,
      totalPastDueAmount: 109000,
      totalPastDueProcessed: 25800,
      },

      cardData :[
        {
       totalBrokenPromises: 1,
       totalCurrentOpenAmount: 2504,
       bucketNames:["1-30", "31-60", "61-90", "91-180", "181-360", ">361"],
       pastDueBucketDocumentAmount: [210, 261, 0, 1673, 0, 0],
       customerName: "Its Dummy Data",
       customerNumber: "12345678"
       },
        {
       totalBrokenPromises: 0,
       totalCurrentOpenAmount: 2504,
       bucketNames:["1-30", "31-60", "61-90", "91-180", "181-360", ">361"],
       pastDueBucketDocumentAmount: [210, 261, 0, 1673, 0, 0],
       customerName: "Its Dummy Data",
       customerNumber: "12345678"
       },
        {
       totalBrokenPromises: 2,
       totalCurrentOpenAmount: 2504,
       bucketNames:["1-30", "31-60", "61-90", "91-180", "181-360", ">361"],
       pastDueBucketDocumentAmount: [210, 261, 0, 1673, 0, 0],
       customerName: "Its Dummy Data",
       customerNumber: "12345678"
       },
        {
       totalBrokenPromises: 5,
       totalCurrentOpenAmount: 2504,
       bucketNames:["1-30", "31-60", "61-90", "91-180", "181-360", ">361"],
       pastDueBucketDocumentAmount: [210, 261, 0, 1673, 0, 0],
       customerName: "Its Dummy Data",
       customerNumber: "12345678"
       },
        {
       totalBrokenPromises: 0,
       totalCurrentOpenAmount: 2504,
       bucketNames:["1-30", "31-60", "61-90", "91-180", "181-360", ">361"],
       pastDueBucketDocumentAmount: [210, 261, 0, 1673, 0, 0],
       customerName: "Its Dummy Data",
       customerNumber: "12345678"
       }
      ],
     
    upcomingData:{upcomingOpenAmount:10000, 
      upcomingPastDueBucketDocumentAmount:[22000,75000,12000,56000,0]
    },
    error: '',
    showFreeda: false,
    width: 100,
    highChartsHeight:62,
    value:-1,
    contact:[{firstName:'Select a card to call',phoneNumber:'+9779827652779', mobileNumber:'+9779827652779'}],
    status:'',
    ind:0,
    noOfCards:-4,
    commId : 0,
    uniqueId:'',
    duration: 0
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_INFO_REQUEST: {
        return{
          ...state, loading: true, noOfCards:(state.noOfCards+5)%20, ind:0, value:action.payload,  contact:[{firstName:'Select a card to call',phoneNumber:'+9779827652779', mobileNumber:'+9779827652779'}]
        }
      }

      case GET_UPCOMING_REQUEST: {
        return{
          ...state, loading: true
        }
      }

      case CHANGE_IND: {
        return{
          ...state, ind:action.payload
        }
      }

      case GET_CONTACT_REQUEST: {
        return{
          ...state, loading: true,
        }
      }
      
      case GET_INFO_SUCCESS: {
        return{
          ...state, loading: false, info: action.payload.overview[0], cardData:action.payload.workbookItems, error:''
        }
      }

      case GET_INFO_FAILURE: {
        return{
          ...state, loading: true, error:action.payload
        }
      }

     
      case GET_UPCOMING_DATA: {
        return{
          ...state, loading:false, upcomingData:action.payload
        }
      }

      case GET_CONTACT_DATA: {
       
          if(action.payload.length === 0){
              return{...state, contact:[{firstName:'No contacts',phoneNumber:'+9779827652779', mobileNumber:'+9779827652779'}]}
 
        }else{
          return {...state, contact:action.payload}
        }
      }

      case SHOW_FREEDA:{
          if(state.showFreeda){
            return{
              ...state, showFreeda:false, width:100, highChartsHeight:62
            }
          } else{
            return{
              ...state, showFreeda:true, width:80, highChartsHeight:80
            }
          }
      }

      case SET_VALUE:{
        return{
          ...state, value:action.payload
        }
      }

      case GET_CALL_STATUS: {
        return{
          ...state,status:action.payload
        }
      }

      case CREATE_COMMUNICATION:{
        return {...state, loading: true}
    }

    case GET_COM_ID:{
      return {...state, commId:action.payload}
    }

    case UNIQUE_ID:{
      return {...state, uniqueId: action.payload}
    }

    case GET_CALL_DURATION:{
      return {...state, duration: action.payload}
    }

      default:
        return state;
    }

   
   
  };
  
  export default newsReducer;