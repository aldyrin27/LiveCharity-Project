import { useInputUser } from '../../hooks/useInputUser';
import { ToastContainer } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Login.scss';

export default function LoginPage() {
  const [_, handleInputChange, handleAuthentication] = useInputUser({
    email: '',
    password: '',
  });

  const handlerUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleToRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginAPI(userInput);
    navigate('/');
  };

  return (
    <>
      <section className="login">
        <ToastContainer />
        <div className="left-section">
          <img src="/lc.png" alt="Logo" />
        </div>
        <div className="right-section">
          <div className="wrapper">
            <h1>Welcome to Live Charity</h1>
            <h1>Make a World Better, Start with us</h1>
            <h2>Login</h2>
            <Form
              style={{ width: '70%' }}
              className="mx-auto"
              onSubmit={(e) => {
                handleAuthentication(e, 'login');
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="text" placeholder="Enter Email" onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted">Don't have an account? Register first</Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="outline-primary" type="submit">
                  Login
                </Button>
                <Button
                  onClick={(e) => {
                    handleAuthentication(e, 'toRegister');
                  }}
                  variant="outline-primary"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </Form>
            <p>
              Don't have an account?
              <span
                onClick={(e) => {
                  handleAuthentication(e, 'toRegister');
                }}
                style={{marginLeft: '4px'}}
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
