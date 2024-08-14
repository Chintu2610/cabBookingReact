import React from "react";
//import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { useNavigate } from "react-router-dom";

const Product = ({ cabId, currLocation, cabCurrStatus, carName, cabImage, perKmRate,manufacturingYear }) => {
  const currentRole = sessionStorage.getItem("currRole");
  const navigate = useNavigate();

  const handleBookingClick = () => {
    // if (currentRole !== 'admin') {
    //   navigate(`/booking/${cabId}`);
    // } else {
    //   alert("Admin users cannot book a cab.");
    // }
    navigate(`/booking/${cabId}`, { state: { perKmRate } });
  };
  return (
    // <NavLink to={`/singleproduct/${cabId}`}>
      <div className="card">
        <figure>
          {/* <img src={cabImage} alt={carName} /> */}
          <img src={`${process.env.PUBLIC_URL}/images/cabImages/${cabImage}`} alt={carName} />
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
          <button onClick={handleBookingClick} style={{color:"black"}} class="btn btn-primary btn-block btn-lg mt-3">Book Now</button>
        </div>
      </div>
    // </NavLink>
  );
};

export default Product;
