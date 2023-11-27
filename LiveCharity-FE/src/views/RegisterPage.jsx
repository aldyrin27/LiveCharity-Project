import { useInputUser } from '../../hooks/useInputUser';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Register.scss';
import { ToastContainer } from 'react-toastify';

export default function RegisterPage() {
  const [_, handleInputChange, handleAuthentication] = useInputUser({
    username: '',
    email: '',
    password: '',
  });

  return (
    <>
    <ToastContainer />
      <section className="register">
        <div className="left-section">
          <img src="/lc.png" alt="Logo" />
        </div>
        <div className="right-section">
          <div className="wrapper">
            <h1>Welcome to Live Charity</h1>
            <h1>Make a World Better, Start with us</h1>
            <h2>Register</h2>
            <Form
              style={{ width: '70%' }}
              className="mx-auto"
              onSubmit={(e) => {
                handleAuthentication(e, 'register');
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter Username" onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter Email" onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="outline-primary" type="submit">
                  Create Accout
                </Button>
              </div>
            </Form>
            <p>
              Already have an account?{' '}
              <span
                onClick={(e) => {
                  handleAuthentication(e, 'toLogin');
                }}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
