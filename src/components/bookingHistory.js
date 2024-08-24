import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Sidebar/sidebar";
import { useCookies } from "react-cookie";

function BookingHistory() {
  const [cookies] = useCookies();
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
      name: "Driver mobile No.",
      selector: (row) => row.driver.mobileNumber,
      sortable: true,
    },
    {
      name: "Current Status",
      selector: (row) => row.currStatus,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        if (cookies.currRole === 'Driver') {
          if (row.currStatus === 'Accepted' ) {
            return (
              <button
                className="btn btn-primary"
                onClick={() => handleCompleteTrip(row.tripBookingId)}
                disabled={row.currStatus === "completed"}
              >
                {row.currStatus === "completed" ? "Completed" : "Complete Trip"}
              </button>
            );
          } else if (row.currStatus === 'Declined' ) {
            return (
              <>
              <button
                className="btn btn-success me-2"
                onClick={() => handleAcceptDeclineTrip(row.tripBookingId,"Accepted")}
                disabled={row.currStatus === "Declined"}
              >
                Accept
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleAcceptDeclineTrip(row.tripBookingId,"Declined")}
                disabled={row.currStatus === "Declined"}
              >
                Decline
              </button>
            </>
            );
          }else {
          return (
            <>
              <button
                className="btn btn-success me-2"
                onClick={() => handleAcceptDeclineTrip(row.tripBookingId,"Accepted")}
                disabled={row.currStatus.toLowerCase() === "completed"}
              >
                Accept
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleAcceptDeclineTrip(row.tripBookingId,"Declined")}
                disabled={row.currStatus.toLowerCase() === "completed"}
              >
                Decline
              </button>
            </>
          );
        }
        
        } else {
          return (
            <button
              className="btn btn-primary"
              onClick={() => handleCompleteTrip(row.tripBookingId)}
              disabled={row.currStatus.toLowerCase() === "completed"}
            >
              {row.currStatus.toLowerCase() === "completed" ? "Completed" : "Complete Trip"}
            </button>
          );
        }
      },
    }
    
    
  ];

  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid = cookies.uuid;
        var URL=`http://localhost:1995/admin/getAllTrips?uuid=${uuid}`;
        if(cookies.currRole==='Driver')
        {
          URL=`http://localhost:1995/admin/getTripsDriverwise?driverId=${cookies.currUserId}&uuid=${uuid}`;
        }
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
        row.pickupLocation.toLowerCase().includes(searchValue)
      );
      setFilteredRecords(newData);
    }
  }

  async function handleCompleteTrip(tripBookingId) {
    console.log("Marking TripBookingId:", tripBookingId); // Log the TripBookingId
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `http://localhost:1995/tripBooking/markCompleteTrip?TripBookingId=${tripBookingId}&uuid=${uuid}`
      );
      if (response.ok) {
        const responseText = await response.text(); // Get the response as text
      alert(responseText);
      window.location.reload();
      } else {
        console.error("Failed to mark trip as complete");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
 
  async function handleAcceptDeclineTrip(tripBookingId,status) {
    
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `http://localhost:1995/tripBooking/handleAcceptDeclineTrip?TripBookingId=${tripBookingId}&status=${status}&uuid=${uuid}`
      );
      if (response.ok) {
        const responseText = await response.text(); // Get the response as text
      alert(responseText);
      } else {
        alert(`Failed to ${status} trip`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
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
      <Sidebar />
      <div className="content-wrapper">
        <div className="container" style={{ marginTop: "100px" }}>
        <div className="container">
            <div className="row">
                {/* Centered Booking History */}
                <div className="col-12 text-center">
                    <h2>Booking History</h2>
                </div>
                {/* Breadcrumb Navigation */}
                <div className="col-12">
                    <ol className="breadcrumb float-sm-right">
                      
                        <li className="breadcrumb-item"><a href={redirect}>Home</a></li>
                        <li className="breadcrumb-item active">Booking History</li>
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
