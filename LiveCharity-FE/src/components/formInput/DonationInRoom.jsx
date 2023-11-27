import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useState } from 'react';
import { useRouterCustom } from '../../../hooks/useNavigate';

import { amounts } from '../../../data';
import { paymentTopup, donate } from '../../api/walletAPI';

import './Donation.css';
import { BASE_URL } from '../../api';
import axios from 'axios';
import { notifyError } from '../../../helpers/notification';

function DonationInRoom({ setShowDonation, user }) {
  const [navigateToRoute, params, pathname] = useRouterCustom();
  const { livestreamId } = params;

  const [isInputUser, setIsInputUser] = useState({
    message: '',
    amount: 0,
  });

  const handleDonate = (amount) => {
    setIsInputUser({
      amount: Number(amount.split('Rp.').join('').split('.').join('')),
    });
  };

  const handlerInputUser = (e) => {
    const { name, value } = e.target;
    setIsInputUser({
      ...isInputUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathname === '/payment/topup') {
      paymentTopup(Number(isInputUser.amount));
    } else {
      const data = {
        amount: isInputUser.amount,
        comment: isInputUser.message,
        livestreamId,
        user
      };
      axios({
        url: `${BASE_URL}/livestream/donateInRoom`,
        method: 'POST',
        data
      })
        .then(() => {
          setShowDonation(false)
        })
        .catch(err => {
          setShowDonation(false);
          notifyError(err.response.data.message);
          console.log(err?.response?.data || err)
        })
    }
  };

  return (
    <Form style={{ width: '40%' }} className="mx-auto mt-5 form-donate" onSubmit={handleSubmit}>
      <div style={{ textAlign: 'center' }}>
        <h6 style={{ fontWeight: 'bold' }}>{pathname === '/payment/topup' ? 'Choose to topup' : 'Choose to Donate'}</h6>
      </div>
      <div className="form-group">
        <ul className="d-flex justify-content-center flex-wrap gap-3">
          {amounts.map((item, index) => {
            return (
              <li key={index}>
                <div
                  onClick={() => {
                    handleDonate(item.amount);
                  }}
                  className="d-flex justify-content-center align-items-center gap-3"
                >
                  <i className={item.icon} style={{ fontSize: '2rem' }}></i>
                  <span>{item.amount}</span>
                  <i className="bi bi-caret-right-fill" style={{ fontSize: '1rem' }}></i>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 'bold' }}>Other Nominal</Form.Label>
        <div className="d-flex gap-2">
          <span className="my-auto" style={{ fontWeight: 'bold' }}>
            Rp
          </span>
          <Form.Control
            type="text"
            placeholder="Enter number"
            pattern="[0-9]*"
            name="amount"
            value={isInputUser.amount}
            onChange={handlerInputUser}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value) || 0)
                .toString()
                .slice(0, 10);
            }}
            style={{ background: '#eee' }}
          />
        </div>
      </Form.Group>
      {pathname !== '/payment/topup' ? (
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="your message">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="message"
              onChange={handlerInputUser}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </Form.Group>
      ) : (
        ''
      )}

      <div className="d-flex justify-content-end gap-4">
        <Button variant="success" type="submit">
          {pathname === '/payment/topup' ? 'Topup' : 'Donate'}
        </Button>
        <div>
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => setShowDonation(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
}

export default DonationInRoom;
