import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
import { BASE_URL } from '../config'; // Adjust path based on file location

function SubmitRating() {
  const [cookies] = useCookies();
  const [rating, setRating] = useState(0); // Set default rating to 0
  const [hoverRating, setHoverRating] = useState(0); // State to track hover rating
  const [feedBack, setFeedback] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const tripBookingId = location.state.tripBookingId;
  const driverId = location.state.driverId;

  useEffect(() => {
    if (cookies.uuid === null || cookies.uuid === undefined) {
      navigate('/login');
    }
  }, [cookies.uuid, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `${BASE_URL}/tripBooking/submitRating?uuid=${uuid}`,
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
            <Alert
              variant={alertMessage.startsWith('Failed') ? 'danger' : 'success'}
            >
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
              <div className="d-flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)} // Set rating on click
                    onMouseEnter={() => setHoverRating(star)} // Show filled stars on hover
                    onMouseLeave={() => setHoverRating(0)} // Reset hover state when not hovering
                    style={{ cursor: 'pointer', fontSize: '2rem', color: '#FFD700' }}
                  >
                    {star <= (hoverRating || rating) ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
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
