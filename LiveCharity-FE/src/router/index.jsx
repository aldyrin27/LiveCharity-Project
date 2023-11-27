import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import LivestreamPage from '../views/LivestreamPage';
import LayoutHome from '../components/layoutHome/LayoutHome';
import CampaignPage from '../views/CampaignPage';
import CampaignDetailPage from '../views/CampaignDetailPage';
import TopUpModal from '../components/modal/TopUpModal';
import CampaignList from '../views/CampaignList';
import Donation from '../components/formInput/Donation';
import FormCampaign from '../components/formInput/FormCampaign';
import { redirect } from 'react-router-dom';
import MyCampaign from '../views/MyCampaign';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutHome />,
    loader: () => {
      localStorage.removeItem('isOwner')
      return !localStorage.getItem('access_token') ? redirect('/') : null;
    },
    children: [
      {
        path: '/',
        index: true,
        element: <CampaignPage />,
      },

      {
        path: '/listcampaign',
        element: <CampaignList />,
      },

      {
        path: '/payment/topup',
        element: <Donation />,
      },

      {
        path: '/donate/:livestreamId',
        element: <Donation />,
      },
      {
        path: '/addcampaign',
        element: <FormCampaign />,
      },
      {
        path: '/detail/:id',
        element: <CampaignDetailPage />,
      },
      {
        path: '/mycampaign',
        element: <MyCampaign />,
      },

    ],
  },
  
  {
    path: '/livestream/:livestreamId/:roomId',
    element: <LivestreamPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export default router;
