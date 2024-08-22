import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const VendorDash = () => {
  const Navigate=useNavigate();
  useEffect(() => {
    if(cookies.uuid===undefined)
    {
      Navigate("/login");
    }
    fetchData();
  }, []);
  const [cookies,setCookie,removeCookie]=useCookies();
  const [countdata, setCountData] = useState({
    noOfUserRegistered:0,
	 noOfBookings:0,
	 noOfBookingsLastMonth:0,
	 noOfDrivers:0,
   noOfCab:0,
   noOfVendors:0,
  });
  const fetchData = async () => {
    
    try {
      const uuid=cookies.uuid;
     
      const response = await fetch(`http://localhost:1995/admin/getCountsForAdminDashboard?uuid=${uuid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCountData({
          noOfUserRegistered: data.noOfUserRegistered,
          noOfBookings: data.noOfBookings,
          noOfBookingsLastMonth: data.noOfBookingsLastMonth,
          noOfDrivers: data.noOfDrivers,
          noOfCab:data.noOfCab,
          noOfVendors:data.noOfVendors,
          });
      } else {
       
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{countdata.noOfBookingsLastMonth}</h3>
                  <p>New Bookings</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="/booking-history" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{countdata.noOfCab}</h3>
                  <p>Total Cab</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
                <a href="/cabs" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{countdata.noOfUserRegistered}</h3>
                  <p>User Registered</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add"></i>
                </div>
                <a href="/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{countdata.noOfDrivers}</h3>
                  <p>No Of drivers</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph"></i>
                </div>
                <a href="/drivers" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
          {(cookies.currRole==="Admin") &&
            <div className="row">
            <div className="col-lg-3 col-6">
                <div className="small-box bg-primary">
                  <div className="inner">
                    <h3>{countdata.noOfVendors}</h3>
                    <p>No Of Vendors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph"></i>
                  </div>
                  <a href="/vendors" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                </div>
              </div>
  
            </div>
          }
          
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <section className="col-lg-7 connectedSortable">
              {/* Custom tabs (Charts with tabs) */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1"></i>
                    Sales
                  </h3>
                  <div className="card-tools">
                    <ul className="nav nav-pills ml-auto">
                      <li className="nav-item">
                        <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="revenue-chart" style={{ position: 'relative', height: '300px' }}>
                      <canvas id="revenue-chart-canvas" height="300" style={{ height: '300px' }}></canvas>
                    </div>
                    <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: '300px' }}>
                      <canvas id="sales-chart-canvas" height="300" style={{ height: '300px' }}></canvas>
                    </div>
                  </div>
                </div>
              </div>
              {/* DIRECT CHAT */}
              <div className="card direct-chat direct-chat-primary">
                <div className="card-header">
                  <h3 className="card-title">Direct Chat</h3>
                  <div className="card-tools">
                    <span title="3 New Messages" className="badge badge-primary">3</span>
                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
                      <i className="fas fa-comments"></i>
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="direct-chat-messages">
                    <div className="direct-chat-msg">
                      <div className="direct-chat-infos clearfix">
                        <span className="direct-chat-name float-left">Alexander Pierce</span>
                        <span className="direct-chat-timestamp float-right">23 Jan 2:00 pm</span>
                      </div>
                      <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user" />
                      <div className="direct-chat-text">
                        Is this template really for free? That's unbelievable!
                      </div>
                    </div>
                    <div className="direct-chat-msg right">
                      <div className="direct-chat-infos clearfix">
                        <span className="direct-chat-name float-right">Sarah Bullock</span>
                        <span className="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
                      </div>
                      <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user" />
                      <div className="direct-chat-text">
                        You better believe it!
                      </div>
                    </div>
                    <div className="direct-chat-msg">
                      <div className="direct-chat-infos clearfix">
                        <span className="direct-chat-name float-left">Alexander Pierce</span>
                        <span className="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>
                      </div>
                      <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user" />
                      <div className="direct-chat-text">
                        Working with AdminLTE on a great new app! Wanna join?
                      </div>
                    </div>
                    <div className="direct-chat-msg right">
                      <div className="direct-chat-infos clearfix">
                        <span className="direct-chat-name float-right">Sarah Bullock</span>
                        <span className="direct-chat-timestamp float-left">23 Jan 6:10 pm</span>
                      </div>
                      <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user" />
                      <div className="direct-chat-text">
                        I would love to.
                      </div>
                    </div>
                  </div>
                  <div className="direct-chat-contacts">
                    <ul className="contacts-list">
                      <li>
                        <a href="#">
                          <img className="contacts-list-img" src="dist/img/user1-128x128.jpg" alt="User Avatar" />
                          <div className="contacts-list-info">
                            <span className="contacts-list-name">
                              Count Dracula
                              <small className="contacts-list-date float-right">2/28/2015</small>
                            </span>
                            <span className="contacts-list-msg">How have you been? I was...</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img className="contacts-list-img" src="dist/img/user7-128x128.jpg" alt="User Avatar" />
                          <div className="contacts-list-info">
                            <span className="contacts-list-name">
                              Sarah Doe
                              <small className="contacts-list-date float-right">2/23/2015</small>
                            </span>
                            <span className="contacts-list-msg">I will be waiting for...</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img className="contacts-list-img" src="dist/img/user3-128x128.jpg" alt="User Avatar" />
                          <div className="contacts-list-info">
                            <span className="contacts-list-name">
                              Nadia Jolie
                              <small className="contacts-list-date float-right">2/20/2015</small>
                            </span>
                            <span className="contacts-list-msg">I'll call you back at...</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img className="contacts-list-img" src="dist/img/user5-128x128.jpg" alt="User Avatar" />
                          <div className="contacts-list-info">
                            <span className="contacts-list-name">
                              Nora S. Vans
                              <small className="contacts-list-date float-right">2/10/2015</small>
                            </span>
                            <span className="contacts-list-msg">Where is your new...</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img className="contacts-list-img" src="dist/img/user6-128x128.jpg" alt="User Avatar" />
                          <div className="contacts-list-info">
                            <span className="contacts-list-name">
                              John K.
                              <small className="contacts-list-date float-right">1/27/2015</small>
                            </span>
                            <span className="contacts-list-msg">Can I take a look at...</span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img className="contacts-list-img" src="dist/img/user8-128x128.jpg" alt="User Avatar" />
                          <div className="contacts-list-info">
                            <span className="contacts-list-name">
                              Kenneth M.
                              <small className="contacts-list-date float-right">1/4/2015</small>
                            </span>
                            <span className="contacts-list-msg">Never mind I found...</span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-footer">
                  <form action="#" method="post">
                    <div className="input-group">
                      <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                      <span className="input-group-append">
                        <button type="button" className="btn btn-primary">Send</button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              {/* /.card */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Members</h3>
                  <div className="card-tools">
                    <span className="badge badge-danger">8 New Members</span>
                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body p-0">
                  <ul className="users-list clearfix">
                    <li>
                      <img src="dist/img/user1-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">Alexander Pierce</a>
                      <span className="users-list-date">Today</span>
                    </li>
                    <li>
                      <img src="dist/img/user8-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">Norman</a>
                      <span className="users-list-date">Yesterday</span>
                    </li>
                    <li>
                      <img src="dist/img/user7-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">Jane</a>
                      <span className="users-list-date">12 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user6-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">John</a>
                      <span className="users-list-date">12 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user2-160x160.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">Alexander</a>
                      <span className="users-list-date">13 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user5-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">Sarah</a>
                      <span className="users-list-date">14 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user4-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">Nora</a>
                      <span className="users-list-date">15 Jan</span>
                    </li>
                    <li>
                      <img src="dist/img/user3-128x128.jpg" alt="User Image" />
                      <a className="users-list-name" href="#">Nadia</a>
                      <span className="users-list-date">15 Jan</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="col-lg-5 connectedSortable">
              <div className="card bg-gradient-primary">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    Visitors
                  </h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-sm daterange" title="Date range">
                      <i className="fas fa-calendar-alt"></i>
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div id="world-map" style={{ height: '250px', width: '100%' }}></div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="row">
                    <div className="col-4 text-center">
                      <div id="sparkline-1"></div>
                      <div className="text-white">Visitors</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-2"></div>
                      <div className="text-white">Online</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-3"></div>
                      <div className="text-white">Sales</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bg-gradient-info">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="fas fa-th mr-1"></i>
                    Sales Graph
                  </h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-info btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-info btn-sm" data-card-widget="remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <canvas className="chart" id="line-chart" style={{ minHeight: '250px', height: '250px', maxHeight: '250px', maxWidth: '100%' }}></canvas>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="row">
                    <div className="col-4 text-center">
                      <input type="text" className="knob" data-readonly="true" value="20" data-width="60" data-height="60" data-fgColor="#39CCCC" />
                      <div className="text-white">Mail-Orders</div>
                    </div>
                    <div className="col-4 text-center">
                      <input type="text" className="knob" data-readonly="true" value="50" data-width="60" data-height="60" data-fgColor="#39CCCC" />
                      <div className="text-white">Online</div>
                    </div>
                    <div className="col-4 text-center">
                      <input type="text" className="knob" data-readonly="true" value="30" data-width="60" data-height="60" data-fgColor="#39CCCC" />
                      <div className="text-white">In-Store</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bg-gradient-success">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="far fa-calendar-alt"></i>
                    Calendar
                  </h3>
                  <div className="card-tools">
                    <div className="btn-group">
                      <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset="-52">
                        <i className="fas fa-bars"></i>
                      </button>
                      <div className="dropdown-menu" role="menu">
                        <a href="#" className="dropdown-item">Add new event</a>
                        <a href="#" className="dropdown-item">Clear events</a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">View calendar</a>
                      </div>
                    </div>
                    <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div id="calendar" style={{ width: '100%' }}></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VendorDash;

