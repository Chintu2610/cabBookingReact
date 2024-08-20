import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
const FilterSection = () => {
  // In FilterSection component
const {
  filters: {
    carName,
    modelName,
    price,
    maxPrice,
    minPrice,
    currLocation,
    area,
    carType,
  },
  updateFilterValue,
  all_products,
  clearFilters,
  sorting,
  availableAreas,
  availableModels,
} = useFilterContext();
  // Get the unique values of each property
  const getUniqueData = (data, attr) => {
    const newVal = data.map((curElem) => curElem[attr]);
    return ["All", ...new Set(newVal)];
  };
  // Get unique data arrays
  const categoryData = getUniqueData(all_products, "carName");
  const companyData = getUniqueData(all_products, "currLocation");
  const cabType = getUniqueData(all_products, "carType");
  const areaData = getUniqueData(all_products, "area");
  const handleSelectAllBrands = (event) => {
    const { checked } = event.target;
    const value = checked ? categoryData : []; // Select all or deselect all
    updateFilterValue({ target: { name: "carName", value } });
  };
  return (
    <Wrapper>
       <div className="filter-company">
        <h3>carType</h3>
        <form>
          <select
            name="carType"
            id="carType"
            className="filter-city--select"
            onChange={updateFilterValue}
          >
            {cabType.map((curElem, index) => (
              <option key={index} value={curElem}>
                {curElem}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className="filter-company">
        <h3>Brand Name</h3>
        <form>
          {categoryData.map((curElem, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`carName-${curElem}`}
                name="carName"
                value={curElem}
                onChange={updateFilterValue}
                checked={carName.includes(curElem)}
              />
              <label htmlFor={`carName-${curElem}`}>{curElem}</label>
            </div>
          ))}
        </form>
      </div>
      <div className="filter-company">
        <h3>Model Name</h3>
        <form>
          {availableModels.map((curElem, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`modelName-${curElem}`}
                name="modelName"
                value={curElem}
                onChange={updateFilterValue}
                checked={modelName.includes(curElem)}
                //disabled={carName.length === 0 || carName.includes('All')}
              />
              <label htmlFor={`modelName-${curElem}`}>{curElem}</label>
            </div>
          ))}
        </form>
      </div>
      <div className="filter-company">
        <h3>City</h3>
        <form>
          <select
            name="currLocation"
            id="currLocation"
            className="filter-city--select"
            onChange={updateFilterValue}
          >
            {companyData.map((curElem, index) => (
              <option key={index} value={curElem}>
                {curElem}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className="filter-company">
        <h3>Area</h3>
        <form>
          <select
            name="area"
            id="area"
            className="filter-city--select"
            onChange={updateFilterValue}
            disabled={currLocation === "All"}
          >
            {availableAreas.map((curElem, index) => (
              <option key={index} value={curElem}>
                {curElem}
              </option>
            ))}
          </select>
        </form>
      </div>
      <select className="filter-city--select" onChange={sorting}>
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
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-city--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .filter-company div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input[type="checkbox"] {
      cursor: pointer;
    }
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection;
