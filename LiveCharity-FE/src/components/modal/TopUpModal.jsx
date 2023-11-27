import axios from 'axios';

export default function TopUpModal() {
  const getToken = async () => {
    try {
      const { data: token } = await axios.get('http://localhost:80/payment/get-token-midtrans', {
        headers: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwMjU3MjQyfQ.gLac_exIBPC40Un4MM01rKplYAylhH1NRXIDcfzNyLk',
        },
      });
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  const payment = async () => {
    const token = await getToken();
    window.snap.pay(token.midtrans_token, {
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

  return (
    <>
      <div>Modal topup</div>
      <button
        onClick={() => {
          payment();
          // getToken();
        }}
      >
        pay
      </button>
    </>
  );
}
