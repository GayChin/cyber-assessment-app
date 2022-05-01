import moment from "moment-timezone";

export const getInboxItemDateTime = (timestamp) => {
  const currentTimestamp = Date.now() / 1000;
  //if more than one week
  if (currentTimestamp - timestamp >= 604800) {
    return moment.unix(timestamp).format("DD/MM/YYYY");
  } else if (currentTimestamp - timestamp >= 86400) {
    return moment.unix(timestamp).format("ddd MM/DD");
  } else {
    return moment.unix(timestamp).format("h:mm a");
  }
};

export const displayCompleteDateTime = (timestamp) =>{
  return moment.unix(timestamp).format("ddd DD/MM/YYYY h:mm a")
}
