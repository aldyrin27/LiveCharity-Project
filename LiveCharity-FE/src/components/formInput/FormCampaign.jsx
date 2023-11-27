import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './FormCampaign.css';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { useDispatch } from 'react-redux';
import { addCampaign } from '../../store/actions/actionsCampaign';
import { notifyError, notifySucces } from '../../../helpers/notification';
import { Link, useNavigate } from 'react-router-dom';
import CustomLoading from '../CustomLoading';

function FormCampaign() {
  const [isImage, setIsImage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleFile = (e) => {
    setCampaignForm((prev) => {
      return {
        ...prev,
        thumbnail: e.target.files[0]
      }
    })
    setIsImage(URL.createObjectURL(e.target.files[0]));
  };
  

  const [campaignForm, setCampaignForm] = useState({
    title: '',
    targetFunds: 0,
    expireDate: '',
    thumbnail: '',
    categoryId: 1,
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    console.log(e.target.files);
    setCampaignForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', campaignForm.title);
    formData.append('targetFunds', campaignForm.targetFunds);
    formData.append('expireDate', campaignForm.expireDate);
    formData.append('image', campaignForm.thumbnail);
    formData.append('categoryId', campaignForm.categoryId);
    formData.append('description', campaignForm.description);

    setLoading(true);
    dispatch(addCampaign(formData))
    .then(() => {
      notifySucces('Success add campaign');
      setTimeout(() => {
        navigation('/');
      }, 1000);
    })
    .catch((err) => {
      notifyError(err.response.data.message);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  if(loading) {
    return <CustomLoading />
  }

  return (
    <div className="container" onSubmit={handleSubmit}>
      <Form className="w-50 mx-auto mt-5 form-campaign">
        <h2 style={{ textAlign: 'center' }}>Add New Campaign</h2>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={campaignForm.title} onChange={handleInputChange} placeholder="Enter Title" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Target Funds</Form.Label>
          <Form.Control type="number" name="targetFunds" value={campaignForm.targetFunds} onChange={handleInputChange} placeholder="Target Funds" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Expired Date</Form.Label>
          <Form.Control type="date"  name="expireDate" value={campaignForm.expireDate} onChange={handleInputChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFile} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Image src={isImage} rounded style={{width: '100%'}} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <FloatingLabel controlId="floatingSelect" label="Choose Category">
            <Form.Select aria-label="Floating label select example" name="categoryId" value={campaignForm.categoryId} onChange={handleInputChange}>
              <option value={1}>Disaster</option>
              <option value={2}>Social</option>
              <option value={3}>Education</option>
              <option value={4}>Health</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control as="textarea" name="description" value={campaignForm.description} onChange={handleInputChange} placeholder="Leave a comment here" style={{ height: '100px' }} />
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex justify-content-end gap-4">
          <Button variant="primary" type="submit">
            Start Campaign
          </Button>
          <Button variant="danger" type="submit">
            <Link to={'/'} style={{textDecoration: 'none', color: '#fff'}}>Cancel</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormCampaign;
