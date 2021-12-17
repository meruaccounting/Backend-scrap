import axios from 'axios';

import {
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  ADD_CLIENT_RESET,
} from '../../constants/ClientConstants';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage['Bearer Token']}`,
  },
};

export const getClient = async (dispatch) => {
  try {
    dispatch({
      type: GET_CLIENT_REQUEST,
    });

    const { data } = await axios.get(`/client/getClient`, config);

    dispatch({
      type: GET_CLIENT_SUCCESS,
      payload: data,
    });
    console.log(`Client details ${JSON.stringify(data)}`);
    localStorage.setItem('clientdata', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addClient = async (incomingData, dispatch) => {
  try {
    dispatch({
      type: ADD_CLIENT_REQUEST,
    });

    const { data } = await axios.post(`/client`, incomingData, config);

    dispatch({
      type: ADD_CLIENT_SUCCESS,
      payload: data,
    });

    console.log(`Client details ${data}`);

    dispatch({
      type: ADD_CLIENT_RESET,
    });
  } catch (error) {
    dispatch({
      type: ADD_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
