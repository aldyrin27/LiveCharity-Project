import { useState, useEffect } from 'react';
import './CampaignDetailPage.css';
import CampaignDetailCard from '../components/campaign/CampaignDetailCard';
import { useSelector, useDispatch } from 'react-redux';
import { campaignDetailFetch } from '../store/actions/actionsCampaign';
import { useParams } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import CustomLoading from '../components/CustomLoading';

export default function CampaignDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const calculateProgress = () => {
    return Math.min((campaign.currentFunds / campaign.targetFunds) * 100, 100);
  };

  const campaign = useSelector((state) => {
    // console.log(state, 'INI DETAIL DARI DETAIL');
    return state.campaignReducer.detailCampaign;
  });

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const localStorageUserId = localStorage.getItem('id');

  const isUserCampaignOwner = campaign.UserId === parseInt(localStorageUserId, 10);

  const initialCardCount = 6; // Number of cards to display initially
  const [visibleCardCount, setVisibleCardCount] = useState(initialCardCount);
  // const totalCardCount = 20; // Total number of cards

  const totalCardCount = campaign?.Donations?.length;

  const handleSeeMore = () => {
    // Increase the visible card count by a certain number when "See More" is clicked
    const incrementBy = 6; // You can adjust this value based on your preference
    setVisibleCardCount((prevCount) => prevCount + incrementBy);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(campaignDetailFetch(id))
      .then(() => {
        console.log('success fetch detail');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        window.scrollTo({
          top: 0
        })
      })
  }, []);

  if(loading) {
    return <CustomLoading />
  }

  return (
    <>
      <div className="campaign-container">
        <div className="container mt-5">
          <div className="container row">
            <div className="col-md-12 my-2">
              <h5>{campaign?.title}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="image-campaign mx-auto">
                <img src={campaign?.thumbnail} alt="" />
              </div>
              <div className="description-campaign mt-5 p-3">
                <h5 style={{ textAlign: 'center' }}>Description</h5>
                <hr />
                <p style={{ textAlign: 'justify' }}>{campaign?.description}</p>
              </div>
              {campaign?.Donations?.length ? (
                <>
                  <div className="donator-campaign mt-5 p-3">
                    <h5 style={{ textAlign: 'center' }}>Thanks for Charity</h5>
                    <hr />
                    <div className="d-flex justify-content-center gap-4 flex-wrap">
                      {campaign.Donations.map((donation) => (
                        <CampaignDetailCard key={donation.id} donation={donation} />
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <div className="col-md-4 detail-right p-3">
              <b>Funds collected</b>
              <h3 className="text-primary">{formatCurrency(campaign.currentFunds)}</h3>
              <h5 style={{ fontSize: 13 }}>Fundraising target {formatCurrency(campaign.targetFunds)}</h5>
              <ProgressBar animated striped variant="danger" now={calculateProgress()} />
              <div className="d-flex flex-column mb-3 gap-3">
                <h5 style={{ fontSize: 15, textAlign: 'center' }}>Be a good person, do what you want!</h5>
                {/* TWILIO */}
                {/* {isUserCampaignOwner && (
                  <Link to={`/twiliostream/${campaign.id}`} className="btn btn-outline-success mx-1">
                    Start Live
                  </Link>
                )} */}
                {/* ZEGO */}
                {isUserCampaignOwner && (
                  <Link to={`/livestream/${campaign.id}/${campaign.roomId}`} className="btn btn-outline-success mx-1">
                    Start Live
                  </Link>
                )}
                {/* TWILIO */}
                {/* {!isUserCampaignOwner && (
                  // <button type="button" className="btn btn-outline-warning mx-1" disabled={!campaign.status}>
                  //   Join Room
                  // </button>
                  <Link to={`/twiliostream/${campaign.id}`} className="btn btn-outline-success mx-1">
                    Join
                  </Link>
                )}
                <Link to={`/donate/${campaign.id}`} className="btn btn-outline-success mx-1">
                  Donate
                </Link> */}

                {/* ZEGO CLOUD */}
                {!isUserCampaignOwner && (
                  // <button type="button" className="btn btn-outline-warning mx-1" disabled={!campaign.status}>
                  //   Join Room
                  // </button>
                  <Link to={`/livestream/${campaign.id}/${campaign.roomId}`} className="btn btn-outline-success mx-1">
                    Join
                  </Link>
                )}
                <Link to={`/donate/${campaign.id}`} className="btn btn-outline-success mx-1">
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
