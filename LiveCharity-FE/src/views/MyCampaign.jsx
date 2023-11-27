import CampaignListCard from '../components/campaign/CampaignListCard';
import './CampaignList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { campaignPagenationUserFetch } from '../store/actions/actionsCampaign';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomLoading from '../components/CustomLoading';

export default function MyCampaign() {
  const dispatch = useDispatch();

  const [isCategory, setIsCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPage, setIsPage] = useState(0);
  const [count, setCount] = useState(1);

  const campaignPagenation = useSelector((state) => {
    return state.campaignReducer.pagenationUserCampaign;
  });

  useEffect(() => {
    setLoading(true);
    dispatch(campaignPagenationUserFetch())
      .then(() => {
        console.log('Success fetch my campaign')
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setIsCategory([...isCategory, e.target.value]);
    } else {
      setIsCategory((prevItems) => prevItems.filter((item) => item !== value));
    }
  };

  const handlePagenation = () => {
    dispatch(campaignPagenationUserFetch(isCategory.join(',')));
    setIsPage(0);
  };

  const pageCamapignNext = () => {
    if (count !== isPage) {
      setCount(count + 1);
    }
  };

  const pageCamapignPrevious = () => {
    if (count !== 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    console.log(isPage, count, 'perjanan count');
    if (isPage >= count) {
      dispatch(campaignPagenationUserFetch(isCategory.join(','), count));
      console.log('count perjalanan next');
    }
  }, [count, isPage]);

  useEffect(() => {
    if (!Array.isArray(campaignPagenation) && isPage == 0) {
      setIsPage(Math.ceil(campaignPagenation.count / 9));
    }
  }, [campaignPagenation]);

  // console.log(count, '@@@@@@@@@@IS count', isPage, '@@@@@@@@@@@@@@@@@ is page');
  // console.log(campaignPagenation, Math.ceil(campaignPagenation.count / 9));
  // console.log(isCategory, '@@@@@category');
  // console.log(campaignPagenation);

  if(loading) {
    return <CustomLoading />
  }

  return (
    <>
      <div className="container">
        <div style={{ textAlign: 'center', color: '#072366' }} className="mt-5">
          <span style={{ fontWeight: 800, fontSize: '40px' }}>My Campaign</span>
        </div>
        <div className="row">
          <div className="col-md-2 mt-5">
            <div className="d-flex justify-content-center mb-3">
              <span style={{ textAlign: 'center', fontSize: 20, color: '#072366' }}>Filter by Category</span>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="light" className="w-100">
                Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <nav className="menubar" style={{ padding: 10 }}>
                  <ul>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>Category</span>
                    </li>
                    <ul className="sub-menu">
                      <li>
                        <input type="checkbox" name="disaster" value="1" onChange={handleInputChange} />
                        <span>Disaster</span>
                      </li>
                      <li>
                        <input type="checkbox" name="social" value="2" onChange={handleInputChange} />
                        <span>Social</span>
                      </li>
                      <li>
                        <input type="checkbox" name="education" value="3" onChange={handleInputChange} />
                        <span>Education</span>
                      </li>
                      <li>
                        <input type="checkbox" name="health" value="4" onChange={handleInputChange} />
                        <span>Health</span>
                      </li>
                    </ul>
                  </ul>
                </nav>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => handlePagenation()}
                    type="button"
                    className="btn btn-outline-primary btn-block w-85"
                  >
                    Apply
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            {/* <nav className="menubar">
              <ul>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Category</span>
                </li>
                <ul className="sub-menu">
                  <li>
                    <input type="checkbox" name="disaster" value="1" onChange={handleInputChange} />
                    <span>Disaster</span>
                  </li>
                  <li>
                    <input type="checkbox" name="social" value="2" onChange={handleInputChange} />
                    <span>Social</span>
                  </li>
                  <li>
                    <input type="checkbox" name="education" value="3" onChange={handleInputChange} />
                    <span>Education</span>
                  </li>
                  <li>
                    <input type="checkbox" name="health" value="4" onChange={handleInputChange} />
                    <span>Health</span>
                  </li>
                </ul>
              </ul>
            </nav>
            <div>
              <button
                onClick={() => handlePagenation()}
                type="button"
                className="btn btn-outline-primary btn-block w-100"
              >
                Apply
              </button>
            </div> */}
          </div>
          <div className="col-md-10">
            {/* <div className="d-flex flex-wrap gap-3 justify-content-center mt-5">
              {campaignPagenation.length !== 0
                ? campaignPagenation.rows.map((campaign) => {
                    {
                      campaign ? console.log('true') : console.log('false');
                    }

                    return <CampaignListCard campaign={campaign} key={campaign.id} />;
                  })
                : null}
            </div> */}
            <div className="d-flex flex-wrap gap-3 justify-content-center mt-5">
              {campaignPagenation.length !== 0 ? (
                campaignPagenation.rows.length === 0 ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <img
                        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/ad42057889c385dd8f84b8330f69269b.gif"
                        alt=""
                        style={{
                          width: '40em',
                          borderRadius: '40px',
                          marginBottom: '10px',
                        }}
                      />
                      <p className="fs-3">
                        <span className="text-danger">Opps!</span> My List is Empty.
                      </p>
                      <p className="lead">Unfortunately, your list is still empty. Please add campaign first.</p>
                      <a href="index.html" className="btn btn-primary">
                        Fundraiser
                      </a>
                    </div>
                  </div>
                ) : (
                  campaignPagenation.rows.map((campaign) => {
                    return <CampaignListCard campaign={campaign} key={campaign.id} />;
                  })
                )
              ) : null}
            </div>
            <div className="container mt-5">
              <Pagination className="d-flex ms-4">
                <Pagination.First onClick={() => {
                  pageCamapignPrevious();
                  window.scrollTo({
                    top: 0
                  })
                }}>
                  <i className="bi bi-caret-left" style={{ fontSize: '12px' }}></i>
                  Previous
                </Pagination.First>
                <Pagination.Last onClick={() => {
                  pageCamapignNext();
                  window.scrollTo({
                    top: 0
                  })
                }}>
                  Next
                  <i className="bi bi-caret-right" style={{ fontSize: '12px' }}></i>
                </Pagination.Last>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
