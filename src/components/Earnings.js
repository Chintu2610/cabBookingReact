import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import { useCookies } from "react-cookie";
import axios from "axios";

import { toast } from "react-toastify"; // For error notifications
import Loader from "./Loader";

function Earnings() {
  const [cookies] = useCookies();
  const [currentView, setCurrentView] = useState("daily"); // To track the current view
  const [earnings, setEarnings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping currentView to API response keys
  const earningsKeyMap = {
    daily: "todayEarnings",
    weekly: "weeklyEarnings",
    monthly: "monthlyEarnings",
    total: "totalEarnings",
  };

  useEffect(() => {
    fetchEarnings(); // Fetch data on component mount
  }, []);

  const fetchEarnings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:1995/driver/GetDriverEarnings`,
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

  // Hardcoded payment list (Replace with API data when available)
  const paymentList = {
    daily: [
      { id: 1, amount: 10, date: "2023-10-01" },
      { id: 2, amount: 5, date: "2023-10-01" },
    ],
    weekly: [
      { id: 3, amount: 50, date: "2023-09-25" },
      { id: 4, amount: 30, date: "2023-09-27" },
      { id: 5, amount: 20, date: "2023-09-29" },
    ],
    monthly: [
      { id: 6, amount: 200, date: "2023-09-05" },
      { id: 7, amount: 150, date: "2023-09-15" },
      { id: 8, amount: 100, date: "2023-09-25" },
    ],
    total: [
      { id: 9, amount: 500, date: "2023-08-01" },
      { id: 10, amount: 400, date: "2023-08-15" },
      { id: 11, amount: 300, date: "2023-09-01" },
      { id: 12, amount: 200, date: "2023-09-15" },
    ],
  };

  // Redirect path based on user role
  const dashboardRedirects = {
    Driver: "/driver-dashboard",
    Admin: "/admin-dashboard",
    Vendor: "/vendor-dashboard",
  };
  const redirectPath = dashboardRedirects[cookies.currRole] || "/";

  const handleButtonClick = (period) => {
    setCurrentView(period);
  };

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
                  <Loader /> // Replace with your loader component or a simple loading text
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
                {paymentList[currentView] && paymentList[currentView].length > 0 ? (
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
                        {paymentList[currentView].map((payment, index) => (
                          <tr key={payment.id}>
                            <td>{index + 1}</td>
                            <td>${payment.amount.toFixed(2)}</td>
                            <td>{payment.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No payments available for this period.</p>
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
