import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useCookies } from "react-cookie";
import { Button, Container, Row, Col, InputGroup, FormControl, Alert } from "react-bootstrap";

function BookingHistoryCustomer() {
  const [cookies] = useCookies();
  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

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
      name: "Distance (Km)",
      selector: (row) => row.distanceInKm,
      sortable: true,
    },
    {
      name: "Current Status",
      selector: (row) => row.currStatus,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>
          {row.currStatus === 'Booked' && cookies.currRole==='Customer' && (
            <Button
              variant="danger"
              onClick={() => handleCancelTrip(row.tripBookingId)}
              disabled={row.currStatus.toLowerCase() === "canceled"}
            >
              {row.currStatus.toLowerCase() === "canceled" ? "Canceled" : "Cancel Trip"}
            </Button>
          )}
          {row.currStatus === 'Completed' && (
            <Button
              variant="warning"
              onClick={() => handleGiveRating(row.tripBookingId)}
              disabled={row.currStatus.toLowerCase() === "pending" || row.currStatus.toLowerCase() === "cancelled"}
            >
              {row.currStatus.toLowerCase() === "canceled" ? "Canceled" : "Give Rating"}
            </Button>
          )}
        </>
      ),
    }
    
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid = cookies.uuid;
        const response = await fetch(`http://localhost:1995/admin/getTripsCustomerwise?uuid=${uuid}&customerId=${cookies.currUserId}`);
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

  async function handleCancelTrip(tripBookingId) {
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `http://localhost:1995/tripBooking/cancelTrip?TripBookingId=${tripBookingId}&uuid=${uuid}`,
        { method: 'GET' }
      );
      if (response.ok) {
        const responseText = await response.text(); // Get the response as text
        setAlertMessage(responseText);
        // Refresh the bookings
        const updatedRecords = originalRecords.filter(record => record.tripBookingId !== tripBookingId);
        setOriginalRecords(updatedRecords);
        setFilteredRecords(updatedRecords);
      } else {
        setAlertMessage('Failed to cancel trip. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage('An error occurred while canceling the trip.');
    }
  }

  var redirect="";
  if(cookies.currRole==="Driver"){
   redirect="/driver-dashboard";
  }else if(cookies.currRole==="Admin")
  {
    redirect="/admin-dashboard";
  }else if(cookies.currRole==="Customer"){
    redirect="/";
  }

  async function handleGiveRating(tripBookingId) {
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `http://localhost:1995/tripBooking/cancelTrip?TripBookingId=${tripBookingId}&uuid=${uuid}`,
        { method: 'GET' }
      );
      if (response.ok) {
        const responseText = await response.text(); // Get the response as text
        setAlertMessage(responseText);
        // Refresh the bookings
        const updatedRecords = originalRecords.filter(record => record.tripBookingId !== tripBookingId);
        setOriginalRecords(updatedRecords);
        setFilteredRecords(updatedRecords);
      } else {
        setAlertMessage('Failed to cancel trip. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage('An error occurred while canceling the trip.');
    }
  }

  return (
    <Container fluid>
      <Row className="my-4">
        <Col md={12} className="text-center">
          <h2>Booking History</h2>
        </Col>
      </Row>
      {alertMessage && (
        <Row className="my-3">
          <Col md={12}>
            <Alert variant={alertMessage.startsWith('Failed') ? 'danger' : 'success'}>
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      )}
      <div className="container">
            <div className="row">
                {/* Centered Booking History */}
                
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
      <Row>
        <Col md={12}>
          <DataTable
            columns={columns}
            data={filteredRecords}
            fixedHeader
            pagination
            className="table table-striped"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BookingHistoryCustomer;
