import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

const Product = ({ cabId, currLocation, cabCurrStatus, carName, cabImage, perKmRate }) => {
  return (
    <NavLink to={`/singleproduct/${cabId}`}>
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
              <FormatPrice price={perKmRate} />
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
