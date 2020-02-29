import axios from "axios";

const csrfVal = "FasSURCaozAKo7OHtkIhiTtOag7hVBBt";
const tokenVal = "91a844e62e86b6e336b8fb440340cbeaabf601fe";

const baseURL = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/";

const setDefault = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common["X-CSRFTOKEN"] = csrfVal;
  axios.defaults.headers.common.Authorization = tokenVal;
};

export default setDefault;
