import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, price, maxPrice, minPrice,currLocation, area },
    updateFilterValue,
    all_products,
    clearFilters,
    sorting,
    availableAreas,
  } = useFilterContext();

  // get the unique values of each property
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    

    return (newVal = ["all", ...new Set(newVal)]);
  };

  // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(all_products, "carName");
  const companyData = getUniqueData(all_products, "currLocation");
  const areaData = getUniqueData(all_products, "area");
  return (
    <Wrapper>
      <div className="filter-company">
       
        <h3>Car Names</h3>
        <select
            name="carName"
            id="carName"
            className="filter-city--select"
            onClick={updateFilterValue}>
            {categoryData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="carName">
                  {curElem}
                </option>
              );
            })}
          </select>
      </div>

      {/* <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}>
                {curElem}
              </button>
            );
          })}
        </div>
      </div> */}

      <div className="filter-company">
        <h3>City</h3>

        <form action="#">
          <select
            name="currLocation"
            id="currLocation"
            className="filter-city--select"
            onClick={updateFilterValue}>
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="currLocation">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div className="filter-company">
        <h3>Area</h3>

        <form action="#">
        <select
  name="area"
  id="area"
  className="filter-city--select"
  onChange={updateFilterValue}
  disabled={currLocation === "all"}
>
  {(availableAreas || []).map((curElem, index) => (
    <option key={index} value={curElem} name="area">
      {curElem}
    </option>
  ))}
</select>

        </form>
      </div>
      <select className="filter-city--select" onChange={sorting}>
  <option value="lowest">Price: Low to High</option>
  <option value="highest">Price: High to Low</option>
 
  <option value="year-asc">Year: Old to New</option>
  <option value="year-desc">Year: New to Old</option>
</select>


      <div className="filter_price">
        <h3>Price / KM</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top:100px;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-city--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
