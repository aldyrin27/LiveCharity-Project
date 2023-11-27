import "./CampaignDetailCard.css";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';

export default function CampaignDetailCard({donation}) {
  // console.log(donations, "card donation")
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const formatDateDistance = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: enUS });
  };

  return (
    <>
      <div className="donator-card d-flex flex-column mt-3">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt=""
          />
          &nbsp;
          <span>{donation?.User?.username}</span>
        </div>
        <span style={{fontSize:13}}>{formatDateDistance(donation?.createdAt)}</span>
        <span>Donation {formatCurrency(donation?.amount)}</span>
        <span style={{fontSize:13}}>{donation?.comment}</span>
        <br />
      </div>
    </>
  );
}
