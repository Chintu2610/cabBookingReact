import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';


const Dashboard = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [admin,setAdmin]= useState(false);
  useEffect(() => {
    setRole(localStorage.getItem('currRole'));
    setEmail(localStorage.getItem('email'));
    setAdmin(true);
  }, []);

  

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      
      
      {/* Sidebar and Page Content */}
      <Container fluid className="flex-grow-1">
        <Row className="flex-nowrap">
         
          <Col xs={10} className="p-4">
            {/* Page Content */}
            <div className="text-center mb-4">
              <h2>Welcome, {role}</h2>
            </div>
            <Row>
              <Col md={6} lg={3} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>Trip</Card.Title>
                      <Card.Text>
                        <a href="BookingHistoryAdmin.html" className="stretched-link">View Booking History</a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>Driver</Card.Title>
                      <Card.Text>
                        <a href="Drivercontroller.html" className="stretched-link">Manage Drivers</a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.7 }}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>Cab</Card.Title>
                      <Card.Text>
                        <a href="CabController.html" className="stretched-link">Manage Cabs</a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              <Col md={6} lg={3} className="mb-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.8 }}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>Customer</Card.Title>
                      <Card.Text>
                        <a href="customers.html" className="stretched-link">View Customers</a>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
              {admin && (
                <>
                  <Col md={6} lg={3} className="mb-4">
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ duration: 0.9 }}
                    >
                      <Card>
                        <Card.Body>
                          <Card.Title>Register Admin</Card.Title>
                          <Card.Text>
                            <a href="admin_register.html" className="stretched-link">Register New Admin</a>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                  <Col md={6} lg={3} className="mb-4">
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ duration: 1 }}
                    >
                      <Card>
                        <Card.Body>
                          <Card.Title>View All Admin</Card.Title>
                          <Card.Text>
                            <a href="ViewAllAdmin.html" className="stretched-link">View All Admins</a>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
