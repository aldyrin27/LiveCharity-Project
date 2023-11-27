import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { campaignDetailFetch } from '../../store/actions/actionsCampaign';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './CampaignCard.css';

function CampaignCard({ campaign }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDetailCampaign = (e) => {
    e.preventDefault();
    const id = campaign.id;
    navigate(`/detail/${id}`);
    dispatch(campaignDetailFetch(id));
  };

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const calculateProgress = () => {
    return Math.min((campaign.currentFunds / campaign.targetFunds) * 100, 100);
  };

  return (
    <Card className="Card" style={{ width: '23rem' }}>
      <Card.Img variant="top" src={campaign?.thumbnail} style={{ height: '20em' }} />
      <Card.Body>
        <Card.Title style={{fontWeight:"bold"}}>{campaign?.title}</Card.Title>
        <Card.Text style={{ fontSize: 13, color:"#808080" }}>Creator LiveCharity</Card.Text>
        <Card.Text style={{ fontSize: 13 }}>
        Funds collected {formatCurrency(campaign?.currentFunds)} from total funds {formatCurrency(campaign?.targetFunds)}
        </Card.Text>
        <ProgressBar animated striped variant="danger" now={calculateProgress()} />
        <Button onClick={handleDetailCampaign} variant="primary" className="w-100 mt-2">
          See Campaign
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CampaignCard;
