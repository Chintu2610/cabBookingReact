import styled from "styled-components";
import { TbBook2, TbHistory, TbTrack } from "react-icons/tb";

import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-three-column">
          <div className="services-1">
            <div>
              <TbBook2 className="icon" />
              <h3>Easy Booking Options</h3>
            </div>
          </div>

          <div className="services-2">
            <div className="services-colum-2">
              <div>
                <TbTrack className="icon" />
                <h3>Real-Time Tracking:</h3>
              </div>
            </div>
            <div className="services-colum-2">
              <div>
                <TbHistory className="icon" />
                <h3>Ride History and Receipts</h3>
              </div>
            </div>
          </div>

          <div className="services-3">
            <div>
              <RiSecurePaymentLine className="icon" />
              <h3>Super Secure Payment System</h3>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid {
    gap: 4.8rem;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: ${({ theme }) => theme.colors.bg};
    text-align: center;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
    }
  }

  .services-2 {
    gap: 4rem;
    background-color: transparent;
    box-shadow: none;

    .services-colum-2 {
      background: ${({ theme }) => theme.colors.bg};
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};
      }

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  h3 {
    margin-top: 1.4rem;
    font-size: 2rem;
  }

  .icon {
    width: 8rem;
    height: 8rem;
    padding: 2rem;
    border-radius: 50%;
    background-color: #fff;
    color: #5138ee;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
      transform: rotate(15deg);
      background-color: #e0e0ff;
    }
  }
`;

export default Services;
