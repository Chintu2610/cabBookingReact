import React from "react";
//import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { useNavigate } from "react-router-dom";

const Product = ({ cabId, currLocation, cabCurrStatus, carName, cabImage, perKmRate }) => {
  const currentRole = sessionStorage.getItem("currRole");
  const navigate = useNavigate();

  const handleBookingClick = () => {
    if (currentRole !== 'admin') {
      navigate(`/booking/${cabId}`);
    } else {
      alert("Admin users cannot book a cab.");
    }
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
          <div className="card-data-flex">
            <h3>{carName}</h3>
            <p className="card-data--price">
              <FormatPrice price={perKmRate} /> / KM
            </p>
           

          </div>
          <button onClick={handleBookingClick} style={{color:"black"}} class="btn btn-primary btn-block btn-lg mt-3">Book Now</button>
        </div>
      </div>
    // </NavLink>
  );
};

export default Product;
