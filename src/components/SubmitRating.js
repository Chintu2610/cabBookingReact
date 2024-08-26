import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
function SubmitRating() {
  const [cookies] = useCookies();
  const [rating, setRating] = useState('');
  const [feedBack, setFeedback] = useState('');
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
        `http://localhost:1995/tripBooking/submitRating?uuid=${uuid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tripBookingId,  
            driverId,      
            rating,
            feedBack,
          }),
        }
      );
      if (response.ok) {
        setAlertMessage('Rating submitted successfully');
        setTimeout(() => navigate('/booking-history-customer'), 2000); // Redirect after success
      } else {
        setAlertMessage('Failed to submit rating. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred while submitting the rating.');
    }
  };
  return (
    <Container>
      <Row className="my-4">
        <Col md={12} className="text-center">
          <h2>Submit Rating</h2>
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
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="feedback" className="mt-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedBack}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit" block>
              Submit Rating
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SubmitRating;
