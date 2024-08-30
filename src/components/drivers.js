import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar/sidebar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
function Drivers() {
  const navigate=useNavigate();
  const [cookies]=useCookies();
  
useEffect(() => {
  if (!cookies.uuid) {
    navigate("/login");
  }
}, [cookies.uuid, navigate]);
  function updateDriver(driverId)
  {
      navigate(`/updatedriver/${driverId}`);
  }
  async function deleteDriver(driverId) {
    try {
      const response = await axios.delete(
        `http://localhost:1995/driver/delete?uuid=${cookies.uuid}&driverId=${driverId}`,
        {
         
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        alert("driver deleted successfully.");
        window.location.reload();
      } else {
        alert(response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    
    }
  }
  
  const columns = [
    {
      name: "Driver Id",
      selector: (row) => row.driverId,
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
    }
    ,
    
    {
      name: "Location",
      selector: (row) => row.currLocation,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.currDriverStatus,
      sortable: true,
    },
    {
      name:"Action",
      cell: (row)=>
      (
        <>
        <button className="btn btn-primary me-2"
        onClick={()=>updateDriver(row.driverId)}
        >Update Driver</button>

        <button className="btn btn-danger"
        onClick={()=>deleteDriver(row.driverId)}
        >Delete Driver</button>
        </>
      )
    }
  ];

  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid=cookies.uuid;
        const response = await fetch(`http://localhost:1995/driver/AllDriver?uuid=${uuid}`);
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
if(cookies.currRole==="Driver"){
 redirect="/driver-dashboard";
}else if(cookies.currRole==="Admin")
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
                    <h2>Drivers</h2>
                </div>
                {/* Breadcrumb Navigation */}
                <div className="col-12">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href={redirect}>Home</a></li>
                        <li className="breadcrumb-item active">Drivers</li>
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

export default Drivers;
