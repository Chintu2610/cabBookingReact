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
      name: "Actions",
      cell: (row) => (
        <Button
          variant="danger"
          onClick={() => handleCancelTrip(row.tripBookingId)}
          disabled={row.currStatus.toLowerCase() === "canceled"}
        >
          {row.currStatus.toLowerCase() === "canceled" ? "Canceled" : "Cancel Trip"}
        </Button>
      ),
    },
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
      <Row className="mb-3">
        <Col md={12} className="text-end">
          <InputGroup className="mb-3" style={{ maxWidth: "300px" }}>
            <FormControl
              type="text"
              onChange={handleFilter}
              placeholder="Filter by pickup location"
            />
          </InputGroup>
        </Col>
      </Row>
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
