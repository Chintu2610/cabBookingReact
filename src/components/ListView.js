import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
import PropTypes from "prop-types";
import axios from "axios";
import { useCookies } from "react-cookie";

const ListView = ({ products }) => {
  const navigate = useNavigate();
const [cookies] = useCookies();
  const handleBookingClick = (cabId, perKmRate) => {
    navigate(`/booking/${cabId}`, { state: { perKmRate } });
  };

  const handleUpdateClick = (cabId) => {
    navigate(`/updatecab/${cabId}`);
  };
  async function deleteCab(cabId) {
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
      alert("An error occurred while fetching the cab details.");
    }
}
  return (
    <Wrapper className="section">
      <div className="container grid">
        {products.map((curElem) => {
          const { cabId, carName, cabImage, perKmRate, currLocation, area } = curElem;

          return (
            <div className="card grid grid-two-column" key={cabId}>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/images/cabImages/${cabImage}`} alt={carName} />
              </figure>

              <div className="card-data">
                <h3>{carName}</h3>
                <p>
                  <FormatPrice price={perKmRate} />
                </p>
                <p>{currLocation}, {area}</p>
                <div className="button-container">
                  <Button onClick={() => handleBookingClick(cabId, perKmRate)} style={{ color: "black" }} className="btn">Book Now</Button>
                  <Button onClick={() => handleUpdateClick(cabId)} className="btn btn-update">Update</Button>
                  <Button onClick={() => deleteCab(cabId)} className="btn btn-update">Delete</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

ListView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      cabId: PropTypes.number.isRequired,
      carName: PropTypes.string.isRequired,
      cabImage: PropTypes.string.isRequired,
      perKmRate: PropTypes.number.isRequired,
      currLocation: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Wrapper = styled.section`
  padding: 9rem 0;

  .container {
    max-width: 120rem;
  }

  .grid {
    gap: 3.2rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }

  .card {
    border: 0.1rem solid rgb(170 170 170 / 40%);

    .card-data {
      padding: 0 2rem;

      .button-container {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;

        .btn {
          flex: 1;
        }

        .btn-update {
          border: 0.1rem solid rgb(0 0 0 / 50%);
          color: rgb(0 0 0);
          background-color: rgb(255 255 255);
          
          &:hover {
            background-color: rgb(0 0 0 / 10%);
            color: rgb(0 0 0);
          }
        }
      }

      h3 {
        margin: 2rem 0;
        font-weight: 300;
        font-size: 2.4rem;
        text-transform: capitalize;
      }

      .btn {
        background-color: rgb(0 0 0 / 0%);
        border: 0.1rem solid rgb(98 84 243);
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(98 84 243);

        &:hover {
          background-color: rgb(98 84 243);
        }

        &:hover a {
          color: #fff;
        }

        a {
          color: rgb(98 84 243);
          font-size: 1.4rem;
        }
      }

      .btn-main .btn:hover {
        color: #fff;
      }
    }
  }
`;

export default ListView;
