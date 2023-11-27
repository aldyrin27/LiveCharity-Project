import './Navbar.css';
import { Link } from 'react-router-dom';
import { useActionUser } from '../../hooks/useActionUser';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { balance } from '../api/walletAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavbarCustom() {
  const [state, handleRedirect] = useActionUser();
  const navigation = useNavigate();
  const [isBalance, setIsBalance] = useState(null);
  useEffect(() => {
    balance().then((result) => {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      });
      setIsBalance(formatter.format(result));
    });
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{boxSizing: 'border-box', height: '70px'}}>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src="https://i.imgur.com/BzlZfzc.png"
              alt="Logo"
              style={{ height: '50px' }}
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to={'/addCampaign'}>Fundraiser</Link>
            <Link className='nav-link' to={'/mycampaign'}>My Campaign</Link>
            <NavDropdown title="Balance" className={!localStorage.access_token ? 'd-none' : ''}>
              <NavDropdown.Item>Balance {state}</NavDropdown.Item>
              <NavDropdown.Item>
                <button className="btn btn-outline-primary" onClick={() => handleRedirect('/payment/topup')}>
                  TOP UP
                </button>
              </NavDropdown.Item>
            </NavDropdown>
            <button type="button" className="btn btn-outline-primary" onClick={() => handleRedirect()}>
              {localStorage.access_token ? 'Logout' : 'Login'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;
