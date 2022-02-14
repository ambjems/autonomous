import { call, put } from "redux-saga/effects";
import { updateCommunication,getComId,getInfoSuccess, getInfoFailure, getUpcomingData, getContactData } from "../../actions/infoActions";
import { requestGetInfo, requestUpcomingData,requestContactDetails } from "../requests/infoRequest";
import axios from "axios";
export function* handleGetInfo() {
  try {
    const response = yield call(requestGetInfo);
    const data = response.data;
    console.log(data[0])
    yield put(getInfoSuccess(data[0]));
  } catch (error) {
    yield put(getInfoFailure(error));
  }
}

export function* handleUpcomingData() {
  try {
    const response = yield call(requestUpcomingData);
    const data = response.data;
    yield put(getUpcomingData(data[0]));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export function* handleContactDetails(action) {
  if(action.payload){

    try {
      const response = yield call(axios.post,
        `http://localhost:8085/AutonomousBackend/cls/tovo/v1/customerContactDetailsAction?customerId=${action.payload}`
       // `http://localhost:4000/getCustomerContactDetails.do?customerId=${action.payload}`
      );
      const data = response.data;
      console.log(data);
      yield put(getContactData(data[0].contacts));
    } catch (error) {
      console.log(error);
    }

  }
 
}

export function* handleCreateCommunication(action) {
  if(action.payload){
    console.log('unique id:' + action.payload.uniqueId)
    console.log('date' +action.payload.dateTime)
    try {
      const response = yield call(axios.post,
        `http://localhost:8085/AutonomousBackend/cls/tovo/v1/createCommunicationAction.action?communicationTime=2021-7-6&customerMapId=${action.payload.customerMapId}&totalOpenAmount=${action.payload.totalOpenAmount}&totalPastDueAmount=${action.payload.totalPastDueAmount}&fkAccountId=21505&dialedNumber=${action.payload.dialedNumber}&dialedFrom=9827652779&callUniqueid=${action.payload.uniqueId}&fkuserId=15011`
      );
      const data = response.data;
      console.log(data);
      yield put(getComId(data[0].comId));
    } catch (error) {
      console.log(error);
    }

  }
 
}

export function* handleUpdateCommunication(action) {
  if(action.payload){
    console.log(action.payload.callDuration)
    try {
      const response = yield call(axios.post,
        `http://localhost:8085/AutonomousBackend/cls/tovo/v1/updateCommunicationAction.action?communicationId=${action.payload.communicationId}&callStatus=${action.payload.callStatus}&callDuration=${action.payload.callDuration}`
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }
 
}