import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './CampaignListCard.css';
import { Link } from 'react-router-dom';

function CampaignListCard({ campaign }) {
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
    <Card className="Card" style={{ width: '20rem' }}>
      <Card.Img variant="top" src={campaign?.thumbnail} style={{ height: '15em' }} />
      <Card.Body>
        <div className="row">
          <div className="col-8">
            <Card.Title style={{ fontWeight: 'bold' }}>{campaign?.title}</Card.Title>
          </div>
          <div className="col-4">
            <Card.Text className="badge bg-secondary" style={{ fontSize: 13 }}>
              {campaign?.Category?.name}
            </Card.Text>
          </div>
        </div>
        <Card.Text style={{ fontSize: 13 }}>
          Funds collected {formatCurrency(campaign?.currentFunds)} from total funds
          {formatCurrency(campaign?.targetFunds)}
        </Card.Text>
        <ProgressBar animated striped variant="danger" now={calculateProgress()} />
        <Card.Text style={{ fontSize: 13, color: '#808080', marginTop: '5px' }}>Creator LiveCharity</Card.Text>
        <Button variant="primary" className="w-100">
          <Link to={`/detail/${campaign.id}`} style={{textDecoration: 'none', color: '#fff'}}>See Campaign</Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CampaignListCard;
