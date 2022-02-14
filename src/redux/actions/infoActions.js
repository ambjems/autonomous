import {GET_CALL_DURATION,UNIQUE_ID,UPDATE_COMMUNICATION,GET_COM_ID,CREATE_COMMUNICATION,CHANGE_IND,GET_CALL_STATUS,GET_CONTACT_DATA, GET_CONTACT_REQUEST, SET_VALUE,GET_INFO_REQUEST,GET_UPCOMING_REQUEST, GET_INFO_SUCCESS, GET_INFO_FAILURE, SHOW_FREEDA, GET_UPCOMING_DATA} from '../types/infoTypes'


export const getInfoRequest = (ind) => ({
  type: GET_INFO_REQUEST,
  payload:ind
});

export const changeInd = (index) => ({
  type: CHANGE_IND,
  payload:index
});

export const getUpcomingRequest = () => ({
  type: GET_UPCOMING_REQUEST
});

export const getContactRequest = (id) => ({
  type: GET_CONTACT_REQUEST,
  payload:id
});

export const getInfoSuccess = (news) => ({
  type: GET_INFO_SUCCESS,
  payload:news
});

export const getInfoFailure = (error) => ({
  type: GET_INFO_FAILURE,
  payload:error
});

export const showFreeda = () => ({
  type: SHOW_FREEDA
});

export const getUpcomingData = (data) => ({
  type: GET_UPCOMING_DATA,
  payload:data
});

export const getContactData = (data) => ({
  type: GET_CONTACT_DATA,
  payload:data
});

export const setValue = (value) => ({
  type: SET_VALUE,
  payload:value
});

export const getCallStatus = (status) => ({
  type: GET_CALL_STATUS,
  payload:status
});

export const createCommunication = (toBeSent) => ({
  type: CREATE_COMMUNICATION,
  payload:{
    customerMapId:toBeSent.customerMapId,
    totalOpenAmount:toBeSent.totalOpenAmount,
    totalPastDueAmount:toBeSent.totalPastDueAmount,
    dialedNumber:toBeSent.dialedNumber
  }
});

export const getComId = (comId) => ({
  type: GET_COM_ID,
  payload:comId
});

export const updateCommunication = (send) => ({
  type: UPDATE_COMMUNICATION,
  payload:{
    communicationId:send.comId,
    callStatus:send.callStatus
  }
});

export const getUniqueId = (unique)=>({
  type: UNIQUE_ID,
  payload: unique
});

export const getCallDuration = (duration)=>({
  type: GET_CALL_DURATION,
  payload: duration
});


