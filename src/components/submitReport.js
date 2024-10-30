import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { BASE_URL } from '../config'; // Adjust path based on file location

function SubmitReport() {
  const [cookies] = useCookies();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const tripBookingId = location.state.tripBookingId;
    const driverId=location.state.driverId;
  useEffect(()=>{
      if(cookies.uuid===null || cookies.uuid===undefined)
      {
        navigate('/login');
      }
  }
  ,[]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `${BASE_URL}/tripBooking/submitReport?uuid=${uuid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tripBookingId,  
            driverId,      
            subject,
            description,
          }),
        }
      );
      if (response.ok) {
        setAlertMessage('Report submitted successfully');
        setTimeout(() => navigate('/booking-history-customer'), 2000); // Redirect after success
      } else {
        setAlertMessage('Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred while submitting the report.');
    }
  };
  return (
    <Container>
      <Row className="my-4">
        <Col md={12} className="text-center">
          <h2>Submit Your Report</h2>
        </Col>
      </Row>
      {alertMessage && (
        <Row className="my-3">
          <Col md={12}>
            <Alert variant={alertMessage.startsWith('Failed') ? 'danger' : 'success'}>
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={{ span: 5, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="rating">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
               
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SubmitReport;
