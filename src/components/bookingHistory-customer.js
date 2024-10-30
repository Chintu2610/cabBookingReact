import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useCookies } from "react-cookie";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../config"; // Adjust path based on file location

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
  }, [cookies.uuid, Navigate]);

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

    {
      name: "Rating",
      selector: (row) =>
        row.rating !== null && row.rating !== undefined && row.rating !== -1
          ? row.rating
          : "You have not given any rating yet",
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>
          {(row.currStatus === "Booked" || row.currStatus === "Pending") &&
            cookies.currRole === "Customer" && (
              <Button
                variant="danger"
                onClick={() => handleCancelTrip(row.tripBookingId)}
                disabled={row.currStatus.toLowerCase() === "canceled"}
              >
                {row.currStatus.toLowerCase() === "canceled"
                  ? "Canceled"
                  : "Cancel Trip"}
              </Button>
            )}
          {row.currStatus === "Completed" && (
            <Button
              variant="warning"
              onClick={() =>
                handleGiveRating(row.tripBookingId, row.driver.driverId)
              }
              disabled={
                row.currStatus.toLowerCase() === "pending" ||
                row.currStatus.toLowerCase() === "cancelled" ||
                row.rating !== -1
              }
            >
              {row.currStatus.toLowerCase() === "cancelled"
                ? "Cancelled"
                : "Give Rating"}
            </Button>
          )}
          {row.currStatus === "Completed" && (
            <Button
              variant="danger"
              onClick={() =>
                handleReport(row.tripBookingId, row.driver.driverId)
              }
              disabled={
                row.currStatus.toLowerCase() === "reported" ||
                row.currStatus.toLowerCase() === "cancelled"
              }
            >
              {row.currStatus.toLowerCase() === "cancelled"
                ? "Cancelled"
                : "Report"}
            </Button>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid = cookies.uuid;
        const response = await fetch(
          `${BASE_URL}/admin/getTripsCustomerwise?uuid=${uuid}&customerId=${cookies.currUserId}`
        );
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
    const filteredData = originalRecords.filter(
      (row) =>
        row.pickupLocation.toLowerCase().includes(searchValue) &&
        (!fromDate || new Date(row.fromDateTime) >= fromDate) &&
        (!toDate || new Date(row.toDateTime) <= toDate)
    );
    setFilteredRecords(filteredData);
  }

  function handleDateFilter() {
    const filteredData = originalRecords.filter((row) => {
      const rowFromDateTime = new Date(row.fromDateTime).setHours(0, 0, 0, 0);
      const rowToDateTime = new Date(row.toDateTime).setHours(23, 59, 59, 999);
      const fromDateStart = fromDate ? fromDate.setHours(0, 0, 0, 0) : null;
      const toDateEnd = toDate ? toDate.setHours(23, 59, 59, 999) : null;

      return (
        (!fromDate || rowFromDateTime >= fromDateStart) &&
        (!toDate || rowToDateTime <= toDateEnd)
      );
    });

    setFilteredRecords(filteredData);
  }

  async function handleCancelTrip(tripBookingId) {
    try {
      const uuid = cookies.uuid;
      const response = await fetch(
        `${BASE_URL}/tripBooking/cancelTrip?TripBookingId=${tripBookingId}&uuid=${uuid}`,
        { method: "GET" }
      );
      if (response.ok) {
        const responseText = await response.text();
        setAlertMessage(responseText);
        const updatedRecords = originalRecords.filter(
          (record) => record.tripBookingId !== tripBookingId
        );
        setOriginalRecords(updatedRecords);
        setFilteredRecords(updatedRecords);
      } else {
        setAlertMessage("Failed to cancel trip. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("An error occurred while canceling the trip.");
    }
  }

  const navigate = useNavigate();

  async function handleGiveRating(tripBookingId, driverId) {
    navigate("/submit-rating", { state: { tripBookingId, driverId } });
  }
  async function handleReport(tripBookingId, driverId) {
    navigate("/submit-report", { state: { tripBookingId, driverId } });
  }
  var redirect = "";
  if (cookies.currRole === "Driver") {
    redirect = "/urbanwheels/#/driver-dashboard";
  } else if (cookies.currRole === "Customer") {
    redirect = "/urbanwheels/#/";
  } else if (cookies.currRole === "Admin") {
    redirect = "/urbanwheels/#/admin-dashboard";
  } else {
    redirect = "/urbanwheels/#/vendor-dashboard";
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
            <Alert
              variant={alertMessage.startsWith("Failed") ? "danger" : "success"}
            >
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      )}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href={redirect}>Home</a>
              </li>
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
          <div className="col-md-12 mb-3">
            <Form.Group>
              <div className="float-sm-right">
                <a
                  href="/urbanwheels/#/reports"
                  className="btn btn-primary"
                  style={{
                    padding: "5px 20px",
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                >
                  Reports
                </a>
              </div>
            </Form.Group>
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
