import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";
import { useCookies } from "react-cookie";
const AppContext = createContext();

const API = "http://185.199.52.133:1996/cab/getAllAvailableCab"; // Ensure the correct protocol

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [cookies]=useCookies();
  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const url1=`${url}?uuid=${cookies.uuid}`;
      const res = await axios.get(url1);
      const products = res.data;
      console.log("Fetched products:", products);
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch({ type: "API_ERROR" });
    }
  };

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      console.error("Error fetching single product:", error);
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
