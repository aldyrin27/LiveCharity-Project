import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../components/campaign/CarouselImage';
import './CampaignPage.css';
import CampaignCard from '../components/campaign/CampaignCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { campaignFetch } from '../store/actions/actionsCampaign';
import { useNavigate } from 'react-router-dom';
import CustomLoading from '../components/CustomLoading';

export default function CampaignPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const campaignData = useSelector((state) => {
    console.log(state);
    return state.campaignReducer.campaign;
  });

  useEffect(() => {
    setLoading(true)
    dispatch(campaignFetch()).then(() => {
      console.log('FETCH BERHASIL DARI CAMPAIGN PAGE');
    }).catch((err) => {
      console.log(err);
    }). finally(() => {
      window.scrollTo({
        top: 0
      })
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })
  }, []);

  const handleToList = (e) => {
    e.preventDefault();
    navigate('/listcampaign');
  };

  if(loading) {
    return <CustomLoading />
  }

  return (
    <div className="campaign-container">
      <div className="container">
        <div className="continer mt-5">
          <Carousel data-bs-theme="light">
            <Carousel.Item>
              <CarouselImage
                imageSrc={
                  'https://70867a2ef4c36f4d1885-185a360f54556c7e8b9c7a9b6e422c6e.ssl.cf6.rackcdn.com/file/2023-01-16/e5Er8Mco871r.jpg'
                }
              />
              <Carousel.Caption style={{fontWeight:"bold", background:"rgba(250, 235, 215, 0.2)" }}>
                <h2>Wujudkan harapan #Untuksesama</h2>
                <p>Sebuah gotong royong untuk membantu sesama agar mendapat pengobatan yang optimal</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <CarouselImage
                imageSrc={
                  'https://70867a2ef4c36f4d1885-185a360f54556c7e8b9c7a9b6e422c6e.ssl.cf6.rackcdn.com/file/2023-11-08/A4NDkT9yEgYa.jpg'
                }
              />
              <Carousel.Caption style={{fontWeight:"bold", background:"rgba(250, 235, 215, 0.2)"}}>
                <h2>WE STAND FOR PALESTINIAN!</h2>
                <p>Satukan Solidaritas, Bantu dan #JAGAPALESTINA</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <CarouselImage
                imageSrc={
                  'https://70867a2ef4c36f4d1885-185a360f54556c7e8b9c7a9b6e422c6e.ssl.cf6.rackcdn.com/file/2023-02-14/kZtCJjkEyOrI.jpg'
                }
              />
              <Carousel.Caption style={{fontWeight:"bold", background:"rgba(250, 235, 215, 0.2)"}}>
                <h2>Berbagi Rutin Setiap Bulan</h2>
                <p>Yuk, tunjukkan kepedulian terhadap sesama dengan menjadi #temanSehati</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        {campaignData
          ? campaignData.map((campaign) => {
              return campaign.Livestreams.length !== 0 ? (
                <div className="continer" key={campaign.id}>
                  <div className="card-campaign  mt-5">
                    <div className="d-flex justify-content-between">
                      <span style={{fontWeight:"bold", fontSize:30}}>{campaign.name}</span>
                      <button type="button" className="btn btn-outline-primary" onClick={handleToList}>
                        See More
                      </button>
                    </div>
                    <div className="flex-row d-flex justify-content-center gap-5 mt-3">
                      {campaign.Livestreams.slice(0, 3).map((campaign) => {
                        return <CampaignCard key={campaign.id} campaign={campaign} />;
                      })}
                    </div>
                  </div>
                </div>
              ) : null;
            })
          : null}
        <div className="continer">
          <hr />
          <div className="row">
            <div className="col-6">
              <div className="m-5">
                <p
                  style={{
                    fontSize: '55px',
                    fontFamily: 'sans-serif',
                    color: '#072366',
                    textAlign: 'center',
                  }}
                >
                  We Are In A Mission To Help Helpless
                </p>
                <span style={{ textAlign: 'center', color: '#072366' }}>
                  20% of a population are suffering extreme food shortages. <br />
                  30% of children under the age of 5 are suffering acute malnutrition. <br />
                  The death rate of an area has doubled, or two people (or four children) out of every 10,000 people die
                  each day.
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="about-img d-flex justify-content-center mt-5">
                <img src="https://themewagon.github.io/charityworks/assets/img/gallery/about1.png" alt="Back Image" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-wrap row mt-5">
            <hr />
            <div className="col-md-12 d-flex gap-5 justify-content-between">
              <div style={{ textAlign: 'center' }} className="card-target">
                <i className="bi bi-heart-fill text-danger" style={{ fontSize: '3em' }}></i>
                <h4 style={{ fontWeight: 'bold', color: '#072366' }}>Help</h4>
                <p style={{ color: '#072366' }}>Help Others in Need</p>
              </div>
              <div style={{ textAlign: 'center' }} className="card-target">
                <i className="bi bi-bullseye text-danger" style={{ fontSize: '3em' }}></i>
                <h4 style={{ fontWeight: 'bold', color: '#072366' }}>Target</h4>
                <p style={{ color: '#072366' }}>Targeted Fundraising Program</p>
              </div>
              <div style={{ textAlign: 'center' }} className="card-target">
                <i className="bi bi-search text-danger" style={{ fontSize: '3em' }}></i>
                <h4 style={{ fontWeight: 'bold', color: '#072366' }}>Transparent</h4>
                <p style={{ color: '#072366' }}>
                  The Distribution of Funds <br />
                  is Carried out Transparently
                </p>
              </div>
              <div style={{ textAlign: 'center' }} className="card-target">
                <i className="bi bi-camera-reels-fill text-danger" style={{ fontSize: '3em' }}></i>
                <h4 style={{ fontWeight: 'bold', color: '#072366' }}>LiveStream</h4>
                <p style={{ color: '#072366' }}>Do Live Streaming to Raise Funds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
