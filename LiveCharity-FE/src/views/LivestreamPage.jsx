import './livestreamPage.css';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client"
import { BASE_URL } from '../api';
import DonationInRoom from '../components/formInput/DonationInRoom';
import NavbarCustom from '../components/NavbarCustom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { notifySucces } from '../../helpers/notification';
import { ToastContainer } from 'react-toastify';
const MySwal = withReactContent(Swal)

const LivestreamPage = () => {
  const { livestreamId } = useParams();
  const [showDonate, setShowDonate] = useState(false);
  const [user, setUser] = useState('')
  const [currentFunds, setCurrentFunds] = useState(0);
  const [targetFunds, setTargetFunds] = useState(0);
  const [donateMessage, setDonateMessage] = useState({})
  const [top, setTop] = useState('90px')
  const [right, setRight] = useState('120px')
  const [showInfo, setShowInfo] = useState(false);
  const appID = 557011077;
  const serverSecret = "e22904e3796a1266d54229d722ac631d";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, livestreamId,  uuidv4(),  localStorage.getItem('username'));

  const myMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: localStorage.getItem('id') === localStorage.getItem('currentLiveOwnerId') ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience,
        },
      },
      onLeaveRoom: () => {
        window.location.href = 'http://localhost:5173/detail/' + livestreamId;
        setShowInfo(false);
      },
      onJoinRoom: () => {
        handleSocketConn();
        setShowInfo(true);
      },
      onLiveStart: () => {
        setTop('90px');
        setRight('170px');
      },
      onLiveEnd: () => {
        setTop('900px');
        setRight('120px');
      }
    });
  };

  const handleSocketConn = async () => {
    const socket = io(BASE_URL)

    socket.on('message', messagesEmit => {
      setMessages(messagesEmit)
    })
    socket.on('donate', donateMessage => {
      // console.log(donateMessage);
      setDonateMessage(donateMessage);
      setCurrentFunds(donateMessage.currentFunds);
      setTargetFunds(donateMessage.targetFunds);
      // MySwal.fire({
      //   icon: 'success',
      //   title: 'Saweria',
      //   text: `${donateMessage.user} telah melakukan donasi sebesar ${donateMessage.nominal}`
      // })
      notifySucces(`${donateMessage.user} telah melakukan donasi sebesar ${donateMessage.nominal}`)
    })
  }

  const handleFetchUser = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/users/decodeJwt`,
        method: 'POST',
        data: {
          token: localStorage.getItem('access_token'),
          livestreamId: livestreamId
        } 
      })
      setUser(data.data)
    } catch (err) {
      console.log(err?.response?.data || err)
    }
  }

  useEffect(() => {
    const fetchCurrentLive = async() => {
      const { data: currentLive } = await axios({
        url: BASE_URL + '/campaign/' + livestreamId,
        method: 'GET'
      });
      localStorage.setItem('currentLiveOwnerId', currentLive.UserId);
      setCurrentFunds(currentLive.currentFunds);
      setTargetFunds(currentLive.targetFunds);
    }
    fetchCurrentLive();
    handleFetchUser();
  }, [])

  return (
    <div>
      <ToastContainer />
      <div>
        <NavbarCustom />
        {
          showInfo &&
          <div style={localStorage.getItem('currentLiveOwnerId') === localStorage.getItem('id') ? { top, right } : {}} className={localStorage.getItem('currentLiveOwnerId') === localStorage.getItem('id') ? 'funds-owner' : 'funds-viewer'}>
            <p>Rp.{currentFunds} / Rp.{targetFunds}</p>
          </div>
        } 
        {
          localStorage.getItem('id') !== localStorage.getItem('currentLiveOwnerId') && showInfo &&
          <div className="gift-button">
            <i className="bi bi-gift-fill" style={{fontSize: '30px'}} onClick={() => setShowDonate(true)}></i>
          </div>
        }
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{ width: '100vw', height: '91.5vh' }}
        >
        </div>
      </div>
      {
        showDonate && (
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '0', right: '0', bottom: '0', top: '0', backgroundColor: 'rgba(0, 0, 0, .5)' }}
          >
            <DonationInRoom
              setShowDonation={setShowDonate}
              user={user}
            />
          </div>
        )
      }
    </div>
  );
}

export default LivestreamPage;