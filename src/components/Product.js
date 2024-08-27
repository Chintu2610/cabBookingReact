import React from "react";

import FormatPrice from "../Helpers/FormatPrice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


const Product = ({ cabId, currLocation, cabCurrStatus, carName, cabImage, perKmRate, manufacturingYear }) => {
  const currentRole = sessionStorage.getItem("currRole");
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const handleBookingClick = () => {
    // Check if uuid cookie is present
    if (!cookies.uuid) {
      // If uuid is not present, redirect to the register/login page
      navigate("/register");  // Adjust the path to your login or registration page
    } else {
      // If uuid is present, proceed with booking
      navigate(`/booking/${cabId}`, { state: { perKmRate } });
    }

  };
  const updateCab = () => {
    // if (currentRole !== 'admin') {
    //   navigate(`/booking/${cabId}`);
    // } else {
    //   alert("Admin users cannot book a cab.");
    // }
    navigate(`/updatecab/${cabId}`);
  };

  async function deleteCab() {
    try {
      const response = await axios.delete(
        `http://localhost:1995/cab/delete?cabId=${cabId}&uuid=${cookies.uuid}`
      );
      if (response.status === 200) {

        alert("Cab deleted successfully.");

        window.location.reload();
      } else {
        alert("Failed to delete cab. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the cab details.");
    }
  }

  return (
    // <NavLink to={`/singleproduct/${cabId}`}>
    <div className="card">
      <figure>
        {/* <img src={cabImage} alt={carName} /> */}
        <img
          src={`${process.env.PUBLIC_URL}/images/cabImages/${cabImage}`}
          alt={carName}
        />
        <figcaption className="caption">{currLocation}</figcaption>
      </figure>

      <div className="card-data">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="card-title mb-1">{carName}</h5>
            <p className="card-text text-muted">
              <FormatPrice price={perKmRate} /> / KM
            </p>
          </div>
          <div className="text-right">
            <h6 className="text-secondary">Manufactured On</h6>
            <p className="card-text">{manufacturingYear}</p>
          </div>
        </div>
        {cookies.currRole &&
          (cookies.currRole.toLowerCase() === "customer") &&
        <button
          onClick={handleBookingClick}
          style={{ color: "black" }}
          class="btn btn-primary btn-block btn-lg mt-3"
        >
          Book Now
        </button>
}
        {cookies.currRole &&
          (cookies.currRole.toLowerCase() === "admin" ||
            cookies.currRole.toLowerCase()==="vendor") && (
            <div className="row">
              <div className="col-md-6">
                <button
                  onClick={updateCab}
                  style={{ color: "black", backgroundColor: "green" }}
                  className="btn btn-primary btn-block btn-md mt-3"
                >
                  Update Cab
                </button>
              </div>
              <div className="col-md-6">
                <button
                  onClick={deleteCab}
                  style={{ color: "black", backgroundColor: "red" }}
                  className="btn btn-danger btn-block btn-md mt-3"
                >
                  Delete Cab
                </button>
              </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default Product;
