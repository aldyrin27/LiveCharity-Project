import axios from 'axios';
import { BASE_URL } from './index';

const headers = { headers: { access_token: localStorage.access_token } };

export const balance = async () => {
  try {
    const { data: balance } = await axios.get(BASE_URL + '/users/balance', headers);
    return balance.message.balance;
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (amount) => {
  try {
    const data = { amount };
    const { data: token } = await axios.post(BASE_URL + '/payment/get-token-midtrans', data, headers);
    return token.midtrans_token;
  } catch (err) {
    console.log(err);
  }
};

export const paymentTopup = async (amount) => {
  const token = await getToken(amount);
  window.snap.pay(token, {
    onSuccess: function (result) {
      /* You may add your own implementation here */
      alert('payment success!');
      console.log(result);
    },
    onPending: function (result) {
      /* You may add your own implementation here */
      alert('wating your payment!');
      console.log(result);
    },
    onError: function (result) {
      /* You may add your own implementation here */
      alert('payment failed!');
      console.log(result);
    },
    onClose: function () {
      /* You may add your own implementation here */
      alert('you closed the popup without finishing the payment');
    },
  });
};

export const donate = async (data) => {
  try {
    const { data: donate } = await axios.post(BASE_URL + '/livestream/donate', data, headers);
    return donate.message;
  } catch (err) {
    throw err.response.data.message;
  }
};
