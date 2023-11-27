import {
  CAMPAIGN_FETCH_SUCCESS,
  CAMPAIGN_DETAIL_FETCH_SUCCESS,
  CAMPAIGN_PAGENATION_FETCH_SUCCESS,
  CAMPAIGN_PAGENATION_USER_FETCH_SUCCESS,
  CAMPAIGN_ADD_SUCCESS
} from './actionsType';
import { BASE_URL } from '../../api';
import axios from 'axios';

export function campaignFetchSuccess(payload) {
  return {
    type: CAMPAIGN_FETCH_SUCCESS,
    payload,
  };
}

export function campaignPagenationFetchSuccess(payload) {
  return {
    type: CAMPAIGN_PAGENATION_FETCH_SUCCESS,
    payload,
  };
}

export function campaignPagenationUserFetchSuccess(payload) {
  return {
    type: CAMPAIGN_PAGENATION_USER_FETCH_SUCCESS,
    payload,
  };
}

export function campaignDetailFetchSuccess(payload) {
  return {
    type: CAMPAIGN_DETAIL_FETCH_SUCCESS,
    payload,
  };
}

export function campaignAddSuccess(payload) {
  return {
    type: CAMPAIGN_ADD_SUCCESS,
    payload,
  };
}

export const campaignFetch = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + '/campaign');
      if (!response.ok) throw new Error('Something wrong');
      const data = await response.json();
      const action = campaignFetchSuccess(data);
      dispatch(action);
      return action;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const campaignPagenationFetch = (category, page) => {
  return async (dispatch) => {
    try {
      let url = '/campaign/pagenation';

      page ? (url += `?page=${page}`) : (url += `?page=1`);
      if (category) {
        url += `&search=${category}`;
      }
      const pages = '/campaign/pagenation?page=1&search=1';
      const response = await fetch(BASE_URL + url);
      if (!response.ok) throw new Error('Something wrong');
      const data = await response.json();
      const action = campaignPagenationFetchSuccess(data);
      dispatch(action);
      return action;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const campaignPagenationUserFetch = (category, page) => {
  return async (dispatch) => {
    try {
      let url = '/campaign/pagenation/users';

      page ? (url += `?page=${page}`) : (url += `?page=1`);
      if (category) {
        url += `&search=${category}`;
      }
      const pages = '/campaign/pagenation?page=1&search=1';
      const response = await fetch(BASE_URL + url, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      // console.log(response, '@@@@@@@@@@@@@@@@@@@@@@@');
      if (!response.ok) throw new Error('Something wrong');
      const data = await response.json();
      const action = campaignPagenationUserFetchSuccess(data);
      dispatch(action);
      return action;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const campaignDetailFetch = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + '/campaign/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Something wrong');
      const data = await response.json();
      const action = campaignDetailFetchSuccess(data);
      dispatch(action);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addCampaign = (form) => {
  return async() => {
    console.log(form);
    try {
      const { data } = await axios({
        url: BASE_URL + '/campaign',
        method: 'POST',
        headers: {
          'access_token': localStorage.getItem('access_token'),
          'Content-Type': 'multipart/form-data'
        },
        data: form
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
