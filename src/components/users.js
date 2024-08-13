import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar/sidebar";
import styled from "styled-components";
import { useCookies } from "react-cookie";

function Users() {
  const [cookie,removeCookie,setCookie]=useCookies();
  const columns = [
    
    {
      name: "customerId",
      selector: (row) => row.customerId,
      sortable: true,
    },
    {
      name: "userName",
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "mobileNumber",
      selector: (row) => row.mobileNumber,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    }
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
  return (
    <>
   <SidebarWrapper>
          <Sidebar />
          </SidebarWrapper>
    <div className="content-wrapper">
      <div className="container" style={{marginTop:"100px"}}>
        <div className="row mb-3">
          <div className="col-12 text-end">
            <input 
              type="text" 
              onChange={handleFilter} 
              className="form-control" 
              placeholder="Filter by userName" 
              style={{ maxWidth: "300px", display: "inline-block" }} 
            />
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
