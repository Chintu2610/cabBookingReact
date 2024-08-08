import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar/sidebar";


function BookingHistory() {
  const columns = [
    {
      name: "Pickup Location",
      selector: (row) => row.pickupLocation,
      sortable: true,
    },
    {
      name: "From DateTime",
      selector: (row) => row.fromDateTime,
      sortable: true,
    },
    {
      name: "Drop Location",
      selector: (row) => row.dropLocation,
      sortable: true,
    },
    {
      name: "To DateTime",
      selector: (row) => row.toDateTime,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Distance (Km)",
      selector: (row) => row.distanceInKm,
      sortable: true,
    },
    {
      name: "Current Status",
      selector: (row) => row.currStatus,
      sortable: true,
    },
  ];


  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid=sessionStorage.getItem("uuid");
        const response = await fetch(`http://localhost:1995/admin/getAllTrips?uuid=${uuid}`);
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
    const searchValue = e.target.value.toLowerCase();
    if(searchValue==='')
    {
        setFilteredRecords(originalRecords);
    }else{
        const newData = originalRecords.filter((row) => {
            return row.pickupLocation.toLowerCase().includes(e.target.value.toLowerCase());
          });
          setFilteredRecords(newData);
    }
    
    
  }

  return (
    <>
   <Sidebar/>
    <div className="content-wrapper">
      <div className="container" style={{marginTop:"100px"}}>
        <div className="row mb-3">
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

export default BookingHistory;
