import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar/sidebar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../config'; // Adjust path based on file location
function Reports() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
useEffect(() => {
  if (!cookies.uuid) {
    navigate("/login");
  }
}, [cookies.uuid, navigate]);
  const columns = [
    {
      name: "Trip Booking Id",
      selector: (row) => row.tripBookingId,
      sortable: true,
    },
    {
      name: "Driver User Name",
      selector: (row) => row.driverUserName,
      sortable: true,
    },
    {
      name: "complaint By",
      selector: (row) => row.complaint_by,
      sortable: true,
    },
    {
      name: "subject",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
       
          return (
            <button
              className="btn btn-primary"
              onClick={() => EditReport(row.reportId)}
              //disabled={row.status.toLowerCase() === "completed"}
            >
              Edit
            </button>
          );
        }
      
    }
  ];
  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid = cookies.uuid;
        var URL=`${BASE_URL}/tripBooking/getAllReport?uuid=${uuid}`;
        const response = await fetch(URL);
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
  }, [cookies.uuid]);
  function handleFilter(e) {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === '') {
      setFilteredRecords(originalRecords);
    } else {
      const newData = originalRecords.filter((row) =>
        row.driverUserName.toLowerCase().includes(searchValue)
      );
      setFilteredRecords(newData);
    }
  }
  async function EditReport(reportId) {
   
   navigate(`/update-report/${reportId}`);
  }
  var redirect="";
  if(cookies.currRole==="Driver"){
   redirect="/urbanwheels/#/driver-dashboard";
  }else if(cookies.currRole==="Admin")
  {
    redirect="/urbanwheels/#/admin-dashboard";
  }else{
    redirect="/urbanwheels/#/vendor-dashboard";
  }
  return (
    <>
      {cookies.currRole !== "Customer" && <Sidebar />}
      <div className={cookies.currRole !== "Customer" ? "content-wrapper" : ""}>
        <div className="container" style={{ marginTop: "100px" }}>
        <div className="container">
            <div className="row">
                {/* Centered Booking History */}
                <div className="col-12 text-center">
                    <h2>Reports /Complains</h2>
                </div>
                {/* Breadcrumb Navigation */}
                <div className="col-12">
                    <ol className="breadcrumb float-sm-right">
                      
                        <li className="breadcrumb-item"><a href={redirect}>Home</a></li>
                        <li className="breadcrumb-item active">Reports</li>
                    </ol>
                </div>
                <div className="col-12 text-end">
              <input
                type="text"
                onChange={handleFilter}
                className="form-control"
                placeholder="Filter By Driver User Name"
                style={{ maxWidth: "300px", display: "inline-block" }}
              />
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
export default Reports;
