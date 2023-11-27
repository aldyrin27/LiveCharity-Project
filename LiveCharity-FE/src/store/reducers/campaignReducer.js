import {
  CAMPAIGN_FETCH_SUCCESS,
  CAMPAIGN_DETAIL_FETCH_SUCCESS,
  CAMPAIGN_PAGENATION_FETCH_SUCCESS,
  CAMPAIGN_PAGENATION_USER_FETCH_SUCCESS,
} from '../actions/actionsType';

const defaultValue = {
  campaign: [],
  detailCampaign: [],
  pagenationCampaign: [],
  pagenationUserCampaign: [],
};

export default function campaignReducer(state = defaultValue, action) {
  if (action.type === CAMPAIGN_FETCH_SUCCESS) {
    return {
      ...state,
      campaign: action.payload,
    };
  }

  if (action.type === CAMPAIGN_DETAIL_FETCH_SUCCESS) {
    return {
      ...state,
      detailCampaign: action.payload,
    };
  }

  if (action.type === CAMPAIGN_PAGENATION_FETCH_SUCCESS) {
    return {
      ...state,
      pagenationCampaign: action.payload,
    };
  }

  if (action.type === CAMPAIGN_PAGENATION_USER_FETCH_SUCCESS) {
    return {
      ...state,
      pagenationUserCampaign: action.payload,
    };
  }
  return state;
}
