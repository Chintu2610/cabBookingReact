const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      console.log("Payload received:", action.payload); // Log the payload
      if (action.payload && Array.isArray(action.payload)) {
        let priceArr = action.payload.map((curElem) => curElem.perKmRate);
        let maxPrice = Math.max(...priceArr);
        return {
          ...state,
          filter_products: [...action.payload],
          all_products: [...action.payload],
          filters: { ...state.filters, maxPrice, price: maxPrice },
        };
      } else {
        console.error("Invalid payload:", action.payload);
        return state; // Return the state unchanged if the payload is invalid
      }
    

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let tempSortProduct = [...state.filter_products];
      const sortingProducts = (a, b) => {
        if (state.sorting_value === "lowest") {
          return a.perKmRate - b.perKmRate;
        }
        if (state.sorting_value === "highest") {
          return b.perKmRate - a.perKmRate;
        }
        if (state.sorting_value === "a-z") {
          return a.carName.localeCompare(b.carName);
        }
        if (state.sorting_value === "z-a") {
          return b.carName.localeCompare(a.carName);
        }
      };
      return {
        ...state,
        filter_products: tempSortProduct.sort(sortingProducts),
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];
      const { text, category, currLocation, color, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.carName.toLowerCase().includes(text.toLowerCase())
        );
      }
      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.carType === category
        );
      }
      if (currLocation !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.currLocation.toLowerCase() === currLocation.toLowerCase()
        );
      }
      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.colors.includes(color)
        );
      }
      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.perKmRate === price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.perKmRate <= price
        );
      }
      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
