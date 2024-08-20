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
        if (state.sorting_value === "year-asc") {
          return a.manufacturingYear - b.manufacturingYear; // Sort by year ascending
        }
        if (state.sorting_value === "year-desc") {
          return b.manufacturingYear - a.manufacturingYear; // Sort by year descending
        }
      };
      return {
        ...state,
        filter_products: tempSortProduct.sort(sortingProducts),
      };

      case "UPDATE_FILTERS_VALUE":
        const { name, value } = action.payload;
      
        if (name === "carType") {
          return {
            ...state,
            filters: {
              ...state.filters,
              carType: value,
            },
          };
        }
      
        if (name === "carName") {
          const selectedBrands = state.filters.carName.includes(value)
            ? state.filters.carName.filter((brand) => brand !== value)
            : [...state.filters.carName, value];
      
          const filteredModels = state.all_products
            .filter((product) => selectedBrands.includes(product.carName))
            .map((product) => product.modelName);
      
          const uniqueModels = ["All", ...new Set(filteredModels)];
      
          const filteredAreas = state.all_products
            .filter((product) => selectedBrands.includes(product.carName))
            .map((product) => product.area);
      
          const uniqueAreas = ["All", ...new Set(filteredAreas)];
      
          return {
            ...state,
            filters: {
              ...state.filters,
              carName: selectedBrands,
              modelName: [], // Reset model filter when brand changes
            },
            availableModels: uniqueModels,
            availableAreas: uniqueAreas,
          };
        }
      
        if (name === "modelName") {
          const selectedModels = state.filters.modelName.includes(value)
            ? state.filters.modelName.filter((model) => model !== value)
            : [...state.filters.modelName, value];
      
          return {
            ...state,
            filters: {
              ...state.filters,
              modelName: selectedModels,
            },
          };
        }
      
        if (name === "currLocation") {
          const selectedCity = value;
          const filteredAreas = state.all_products
            .filter((product) => product.currLocation === selectedCity)
            .map((product) => product.area);
      
          const uniqueAreas = ["All", ...new Set(filteredAreas)];
      
          return {
            ...state,
            filters: {
              ...state.filters,
              [name]: value,
              area: "All", // Reset area filter when city changes
            },
            availableAreas: uniqueAreas,
          };
        }
      
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
          const {
            carName,
            currLocation,
            area,
            modelName,
            price,
            carType,
          } = state.filters;
        
          if (carType !== "All") {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => curElem.carType === carType
            );
          }
        
          if (carName.length > 0 && !carName.includes('All')) {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => carName.includes(curElem.carName)
            );
          }
        
          if (currLocation !== "All") {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => curElem.currLocation.toLowerCase() === currLocation.toLowerCase()
            );
          }
        
          if (area !== "All") {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => curElem.area.toLowerCase() === area.toLowerCase()
            );
          }
        
          if (modelName.length > 0 && !modelName.includes('All')) {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => modelName.includes(curElem.modelName)
            );
          }
        
          if (price > 0) {
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
                carName: [],
                currLocation: "All",
                color: "All",
                maxPrice: state.filters.maxPrice,
                price: state.filters.maxPrice,
                area: "All",
                modelName: [],
                carType: "All",
              },
              availableModels: ["All"],
              availableAreas: ["All"],
            };
          
          

    default:
      return state;
  }
};

export default filterReducer;
