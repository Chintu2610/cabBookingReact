import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Sidebar from '../Sidebar/sidebar';
import AdminDashboard from './Dashboard';
import styled from "styled-components";
const Dashboard = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [admin,setAdmin]= useState(false);
  useEffect(() => {
    setRole(sessionStorage.getItem('currRole'));
    setEmail(sessionStorage.getItem('email'));
    setAdmin(true);
     
  }, []);

  

  return (
    <div className="d-flex flex-column bg-dark text-light">
      <Wrapper>
        
      <SidebarWrapper>
          <Sidebar />
          </SidebarWrapper>
        
      {/* Sidebar and Page Content */}
      <Col xs={12} className="min-vh-100 p-4">
      <AdminDashboard/>
      </Col>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.section`
  padding: 10rem 0;
`;
const SidebarWrapper = styled.div`
 
  top: 10rem;
  left: 0;
  width: 20%;
  height: calc(100% - 10rem);
  background-color: #6c757d;
  overflow-x: auto;
  overflow-y: hidden;
`;

export default Dashboard;
