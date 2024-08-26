import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useCookies } from "react-cookie";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingHistoryCustomer() {
  const [cookies] = useCookies();
  const [originalRecords, setOriginalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const Navigate = useNavigate();
  
useEffect(() => {
  if (!cookies.uuid) {
    Navigate("/login");
  }
}, [cookies.uuid, Navigate]);

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
      name: "Current Status",
      selector: (row) => row.currStatus,
      sortable: true,
    },
    {
      name: "Driver Mobile",
      selector: (row) => row.driver.mobileNumber,
      sortable: true,
    },
    // ...(cookie.currRole === 'Admin'
    //   ? [{
    //       name: "Action",
    //       cell: (row) => (
    //         <button
    //           className="btn btn-danger"
    //           onClick={() => deleteCustomer(row.customerId)}
    //         >
    //           Delete Customer
    //         </button>
    //       )
    //     }]
    //   : [])
    {
      name: "Rating",
      selector: (row) =>
        row.rating !== null && row.rating !== undefined
          ? row.rating
          : "You have not given a rating yet",
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>
          {(row.currStatus === 'Booked' || row.currStatus === 'Pending') && cookies.currRole === 'Customer' && (
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
              onClick={() => handleGiveRating(row.tripBookingId, row.driver.driverId)}
              disabled={row.currStatus.toLowerCase() === "pending" || row.currStatus.toLowerCase() === "cancelled" || row.rating!==null || row.rating!==undefined}
            >
              {row.currStatus.toLowerCase() === "cancelled" ? "Cancelled" : "Give Rating"}
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
    const filteredData = originalRecords.filter((row) =>
      row.pickupLocation.toLowerCase().includes(searchValue) &&
      (!fromDate || new Date(row.fromDateTime) >= fromDate) &&
      (!toDate || new Date(row.toDateTime) <= toDate)
    );
    setFilteredRecords(filteredData);
  }

  function handleDateFilter() {
    const filteredData = originalRecords.filter(
      (row) =>
        (!fromDate || new Date(row.fromDateTime) >= fromDate) &&
        (!toDate || new Date(row.toDateTime) <= toDate)
    );
    setFilteredRecords(filteredData);
  }

  async function handleCancelTrip(tripBookingId) {
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `http://localhost:1995/tripBooking/cancelTrip?TripBookingId=${tripBookingId}&uuid=${uuid}`,
        { method: 'GET' }
      );
      if (response.ok) {
        const responseText = await response.text();
        setAlertMessage(responseText);
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

  const navigate = useNavigate();

  async function handleGiveRating(tripBookingId, driverId) {
    navigate('/submit-rating', { state: { tripBookingId, driverId } });
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
          <div className="col-12">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href={redirect}>Home</a></li>
              <li className="breadcrumb-item active">Booking History</li>
            </ol>
          </div>
          <div className="col-12 text-end mb-3">
            <input
              type="text"
              onChange={handleFilter}
              className="form-control"
              placeholder="Filter by pickup location"
              style={{ maxWidth: "300px", display: "inline-block" }}
            />
          </div>
          <div className="col-md-6 mb-3" style={{ zIndex: isDatePickerOpen ? 9999 : 1 }}>
            <Form.Group>
              <Form.Label>From Date:</Form.Label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                onCalendarOpen={() => setIsDatePickerOpen(true)}
                onCalendarClose={() => setIsDatePickerOpen(false)}
                isClearable
                className="form-control"
                placeholderText="Select From Date"
                popperPlacement="bottom-start"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport'
                  }
                }}
              />
            </Form.Group>
          </div>
          <div className="col-md-6 mb-3" style={{ zIndex: isDatePickerOpen ? 9999 : 1 }}>
            <Form.Group>
              <Form.Label>To Date:</Form.Label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                onCalendarOpen={() => setIsDatePickerOpen(true)}
                onCalendarClose={() => setIsDatePickerOpen(false)}
                isClearable
                className="form-control"
                placeholderText="Select To Date"
                popperPlacement="bottom-start"
                popperModifiers={{
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport'
                  }
                }}
              />
            </Form.Group>
          </div>
          <div className="col-12 mb-3">
            <Button onClick={handleDateFilter}>Filter by Date</Button>
          </div>
        </div>
      </div>
      <Row>
        <Col md={12} style={{ marginTop: isDatePickerOpen ? "200px" : "0" }}>
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
