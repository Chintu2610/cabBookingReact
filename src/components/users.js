import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar/sidebar";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
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
 
  
  const [cookie,removeCookie,setCookie]=useCookies();
  const columns = [
    
    {
      name: "Customer Id",
      selector: (row) => row.customerId,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    
    ...(cookie.currRole === 'Admin'
      ? [{
          name: "Action",
          cell: (row) => (
            <button
              className="btn btn-danger"
              onClick={() => deleteCustomer(row.customerId)}
            >
              Delete Customer
            </button>
          )
        }]
      : [])
  ];
  

  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid=cookie.uuid;
        const response = await fetch(`http://localhost:1995/customer/viewAllCustomer?uuid=${uuid}`);
        if (response.ok) {
          const data = await response.json();
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
    const searchValue=e.target.value.toLowerCase();
    if(searchValue==='')
    {
        setFilteredRecords(originalRecords);
    }else{
        const newData = originalRecords.filter((row) => {
            return row.userName.toLowerCase().includes(e.target.value.toLowerCase());
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
                    <h2>Users</h2>
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
                placeholder="Filter by pickup location"
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

export default Users;
