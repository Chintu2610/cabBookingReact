import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
function Earnings() {
  const [cookies] = useCookies();
  const [currentView, setCurrentView] = useState("daily"); // To track the current view
  const [earnings, setEarnings] = useState({});
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Mapping currentView to API response keys
  const earningsKeyMap = {
    daily: "todayEarnings",
    weekly: "weeklyEarnings",
    monthly: "monthlyEarnings",
    total: "totalEarnings",
  };
 
  useEffect(() => {
    fetchEarnings(); // Fetch earnings data on component mount
    fetchTransactions(); 
    if (!cookies.uuid) {
      navigate("/login");
    }// Fetch transaction details based on the current view
  }, [currentView,cookies.uuid,navigate]); // Re-fetch transactions whenever currentView changes

  const fetchEarnings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://13.60.224.153:1995/driver/GetDriverEarnings`,
        {
          params: {
            driverid: cookies.currUserId,
            uuid: cookies.uuid,
          },
        }
      );
      setEarnings(response.data);
    } catch (err) {
      console.error("Error fetching earnings data:", err);
      setError("Failed to fetch earnings data. Please try again later.");
      toast.error("Failed to fetch earnings data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://13.60.224.153:1995/driver/getTransactionDetails`,
        {
          params: {
            driverid: cookies.currUserId,
            uuid: cookies.uuid,
            period: currentView, // Using currentView to determine the period
          },
        }
      );
      setTransactions(response.data[currentView]);
    } catch (err) {
      console.error("Error fetching transaction details:", err);
      setError("Failed to fetch transaction details. Please try again later.");
      toast.error("Failed to fetch transaction details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (period) => {
    setCurrentView(period);
  };

  // Redirect path based on user role
  const dashboardRedirects = {
    Driver: "/driver-dashboard",
    Admin: "/admin-dashboard",
    Vendor: "/vendor-dashboard",
  };
  const redirectPath = dashboardRedirects[cookies.currRole] || "/";

  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-4">
                <h2>Your Earnings</h2>
              </div>

              <div className="col-12 mb-3">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href={redirectPath}>Home</a>
                  </li>
                  <li className="breadcrumb-item active">Earnings</li>
                </ol>
              </div>

              {/* Earnings Buttons */}
              <div className="col-12 text-center mb-4">
                <button
                  className={`btn btn-outline-success m-2 ${
                    currentView === "daily" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("daily")}
                >
                  Daily Earnings
                </button>
                <button
                  className={`btn btn-outline-info m-2 ${
                    currentView === "weekly" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("weekly")}
                >
                  Weekly Earnings
                </button>
                <button
                  className={`btn btn-outline-warning m-2 ${
                    currentView === "monthly" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("monthly")}
                >
                  Monthly Earnings
                </button>
                <button
                  className={`btn btn-outline-primary m-2 ${
                    currentView === "total" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("total")}
                >
                  Total Earnings
                </button>
              </div>

              {/* Display Earnings */}
              <div className="col-12 text-center mb-4">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : (
                  <div className="card bg-light">
                    <div className="card-body">
                      <h3 className="card-title">
                        $
                        {earnings[earningsKeyMap[currentView]] !== undefined
                          ? earnings[earningsKeyMap[currentView]].toFixed(2)
                          : "0.00"}
                      </h3>
                      <p className="card-text">
                        {`${currentView.charAt(0).toUpperCase() + currentView.slice(1)
                          } Earnings`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment List */}
              <div className="col-12">
                <h4 className="mb-3">
                  {`${currentView.charAt(0).toUpperCase() + currentView.slice(1)
                    } Payment List`}
                </h4>
                {transactions.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>#</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>${transaction.price.toFixed(2)}</td>
                            <td>{transaction.toDateTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No transactions available for this period.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Earnings;
