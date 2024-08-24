import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar/sidebar";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ratings() {
 const navigate=useNavigate();
  async function deleteCustomer(customerId) {
    try {
      const response = await axios.delete(
        `http://localhost:1995/customer/delete?uuid=${cookie.uuid}&customerId=${customerId}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        alert("customer deleted successfully.");
        window.location.reload();
        
       
      } else {
        alert(response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    
    }
  }
 
  //id, feed_back, rating, trip_booking_id, driver_id
  const [cookie,removeCookie,setCookie]=useCookies();
  const columns = [
    
    {
      name: "Trip Booking Id",
      selector: (row) => row.tripBookingId,
      sortable: true,
    },
    {
      name: "Driver user Name",
      selector: (row) => row.driver.userName,
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: "Feed Back",
      selector: (row) => row.feedBack,
      sortable: true,
    }
  ];
  

  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid=cookie.uuid;
        const driveId=cookie.currUserId;
        const response = await axios.get(`http://localhost:1995/tripBooking/viewRatingDriverWise?driverId=${driveId}&uuid=${uuid}`);
        if (response.status===200) {
          const data = response.data;
          setOriginalRecords(data);
          setFilteredRecords(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  function handleFilter(e) {
    const searchValue = e.target.value.toLowerCase();
  
    if (searchValue === '') {
      setFilteredRecords(originalRecords);
    } else {
      const newData = originalRecords.filter((row) => {
        // Ensure that the rating is treated as a string
        return row.rating.toString().toLowerCase().includes(searchValue);
      });
      setFilteredRecords(newData);
    }
  }
  
  const SidebarWrapper = styled.div`
 
  top: 10rem;
  left: 0;
  width: 20%;
  height: calc(100% - 10rem);
  background-color: #6c757d;
  overflow-x: auto;
  overflow-y: hidden;
`;
var redirect="";
if(cookie.currRole==="Driver"){
 redirect="/driver-dashboard";
}else if(cookie.currRole==="Admin")
{
  redirect="/admin-dashboard";
}else{
  redirect="/vendor-dashboard";
}
  return (
    <>
   <SidebarWrapper>
          <Sidebar />
          </SidebarWrapper>
    <div className="content-wrapper">
      <div className="container" >
        <div className="row mb-3">
        <div className="container">
            <div className="row">
                {/* Centered Booking History */}
                <div className="col-12 text-center">
                    <h2>Ratings</h2>
                </div>
                {/* Breadcrumb Navigation */}
                <div className="col-12">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href={redirect}>Home</a></li>
                        <li className="breadcrumb-item active">Users</li>
                    </ol>
                </div>
                <div className="col-12 text-end">
              <input
                type="text"
                onChange={handleFilter}
                className="form-control"
                placeholder="Filter by rating"
                style={{ maxWidth: "300px", display: "inline-block" }}
              />
            </div>

            </div>
        </div>
        </div>
        <div className="row">
          <div className="col-12">
            <DataTable 
              columns={columns} 
              data={filteredRecords} 
              fixedHeader 
              pagination 
              className="table table-striped table-bordered"
            />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Ratings;
