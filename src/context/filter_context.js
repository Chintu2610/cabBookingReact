import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontex";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    carName: [], // Change to an array
    currLocation: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    area: "all",
    modelName: [], // Change to an array
    minPrice: 0,
  },
  availableModels: [],
  availableAreas: [], // Add this to the initial state
};

export const FilterContextProvider = ({ children }) => {
  
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Update available models and areas based on all_products
  useEffect(() => {
    if (state.all_products.length > 0) {
      const uniqueModels = ["all", ...new Set(state.all_products.map(product => product.modelName))];
      const uniqueAreas = ["all", ...new Set(state.all_products.map(product => product.area))];

      dispatch({
        type: "UPDATE_AVAILABLE_FILTERS",
        payload: { availableModels: uniqueModels, availableAreas: uniqueAreas }
      });
    }
  }, [state.all_products]);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log("name"+name+"value"+value);
    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  // to clear the filter
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  // to sort the product
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  // to load all the products for grid and list view
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
