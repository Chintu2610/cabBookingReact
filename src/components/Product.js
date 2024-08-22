import React, { useEffect } from "react";
import FormatPrice from "../Helpers/FormatPrice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Product = ({ cabId, currLocation, cabCurrStatus, carName, cabImage, perKmRate, manufacturingYear }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  // Debugging logs to check the current role and other props
  useEffect(() => {
    console.log("Current Role:", cookies.currRole);
    console.log("Cab Details:", { cabId, currLocation, cabCurrStatus, carName, cabImage, perKmRate, manufacturingYear });
  }, [cookies.currRole, cabId, currLocation, cabCurrStatus, carName, cabImage, perKmRate, manufacturingYear]);

  const handleBookingClick = () => {

     if (!cookies.uuid) {
      navigate("/register");
    }else
    if (cookies.currRole !== 'Admin' || cookies.currRole !== 'Venor' || cookies.currRole !== 'Driver') {
      navigate(`/booking/${cabId}`, { state: { perKmRate } });
    } else {
      alert("Admin users cannot book a cab.");
    }
   

  };

  const updateCab = () => {
    navigate(`/updatecab/${cabId}`);
  };

 async function deleteCab() {
      try {
        const response = await  axios.delete(
          `http://localhost:1995/cab/delete?cabId=${cabId}&uuid=${cookies.uuid}`
        );
        if (response.status===200) {
          alert("cab deleted successfully.");
         window.location.reload();
        } else {
          alert("Failed to delete cab. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Cab is on the service you cant delete it now, please try after some time.");



      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the cab.");
    }
  }

  // Render the cab information
  return (
    <div className="card">
      <figure>
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
          {cookies.currRole && (cookies.currRole.toLowerCase() === 'admin' || cookies.currRole.toLowerCase()==='vendor') && 
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
}

        </div>

      </div>
    </div>
  );
};

export default Product;
