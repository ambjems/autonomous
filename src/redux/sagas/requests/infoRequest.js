import axios from "axios";
import store from '../../configureStore'

let i = 0;
let j = 0;



export function requestGetInfo() {
  return axios.request({
    method: "post",
    url: `http://localhost:8085/AutonomousBackend/cls/tovo/v1/UserCallWorkBookAction.action?pageNumber=${(i++)%4}&pageSize=5`
  });
}

export function requestUpcomingData() {
  return axios.request({
    method: "post",
    url: `http://localhost:8085/AutonomousBackend/cls/tovo/v1/UpcomingSummaryAction.action?pageNumber=${(j++)%4}&pageSize=5`
  });
}



