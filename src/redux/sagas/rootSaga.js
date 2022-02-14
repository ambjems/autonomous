import { takeLatest } from "redux-saga/effects";
import {handleUpdateCommunication,handleCreateCommunication, handleGetInfo, handleUpcomingData, handleContactDetails } from "./handlers/infoHandler";
import {UPDATE_COMMUNICATION, CREATE_COMMUNICATION,GET_INFO_REQUEST,GET_UPCOMING_REQUEST,GET_CONTACT_REQUEST} from '../types/infoTypes'

export function* watcherSaga() {
  yield takeLatest(GET_INFO_REQUEST,handleGetInfo)
    
}
export function* watcherSaga2() {
  yield takeLatest(GET_UPCOMING_REQUEST,handleUpcomingData)
}

export function* watcherSaga3() {
  yield takeLatest(GET_CONTACT_REQUEST, handleContactDetails)
}

export function* watcherSaga4() {
  yield takeLatest(CREATE_COMMUNICATION, handleCreateCommunication)
}

export function* watcherSaga5() {
  yield takeLatest(UPDATE_COMMUNICATION, handleUpdateCommunication)
}


