import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Sidebar = () => {
 
  const [cookies]=useCookies();
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed" style={{marginTop:'100px',backgroundColor:'#F6F8FA'}} >
     

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
          </div>
          <div className="info">
            <a href="AdminProfile" className="d-block">{cookies.currRole}</a>
          </div>
        </div>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">          
            <li className="nav-item">
              <Link to="/registerDriver" className="nav-link">
              <i class="bi bi-person fs-5"></i>
                <p>
                Register Driver
                 
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registerCab" className="nav-link">
              <i class="bi bi-car-front fs-5"></i>
                <p>
                Register Cab
                  
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register-admin" className="nav-link">
              <i class="bi bi-person fs-5"></i>
                <p>
                Register Vendor
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-copy"></i>
                <p>
                Register Cab
                  <i className="fas fa-angle-left right"></i>
                  <span className="badge badge-info right">6</span>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/top-nav" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Top Navigation</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/top-nav-sidebar" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Top Navigation + Sidebar</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/boxed" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Boxed</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/fixed-sidebar" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Fixed Sidebar</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/fixed-sidebar-custom" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Fixed Sidebar <small>+ Custom Area</small></p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/fixed-topnav" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Fixed Navbar</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/fixed-footer" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Fixed Footer</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/collapsed-sidebar" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Collapsed Sidebar</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>
                  Charts
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/charts/chartjs" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>ChartJS</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/charts/flot" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Flot</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/charts/inline" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Inline</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/charts/uplot" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>uPlot</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-tree"></i>
                <p>
                  UI Elements
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/ui/general" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>General</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ui/icons" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Icons</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ui/buttons" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Buttons</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ui/sliders" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Sliders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ui/modals" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Modals & Alerts</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ui/navbar" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Navbar & Tabs</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ui/timeline" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Timeline</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ui/ribbons" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Ribbons</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit"></i>
                <p>
                  Forms
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/forms/general" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>General Elements</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/forms/advanced" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Advanced Elements</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/forms/editors" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Editors</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/forms/validation" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Validation</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-table"></i>
                <p>
                  Tables
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/tables/simple" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Simple Tables</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tables/data" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>DataTables</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tables/jsgrid" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>jsGrid</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-calendar-alt"></i>
                <p>
                  Calendar
                  <span className="badge badge-info right">2</span>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-image"></i>
                <p>Gallery</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-envelope"></i>
                <p>
                  Mailbox
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/mailbox/inbox" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Inbox</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/mailbox/compose" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Compose</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/mailbox/read" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Read</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>
                  Pages
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/examples/invoice" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Invoice</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/profile" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Profile</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/e-commerce" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>E-commerce</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/projects" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Projects</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/project-add" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Project Add</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/project-edit" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Project Edit</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/project-detail" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Project Detail</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/contacts" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Contacts</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-plus-square"></i>
                <p>
                  Extras
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/examples/login" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Login</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/register" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Register</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/forgot-password" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Forgot Password</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/recover-password" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Recover Password</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/lockscreen" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Lockscreen</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/legacy-user-menu" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Legacy User Menu</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/language-menu" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Language Menu</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/404" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Error 404</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/500" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Error 500</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/pace" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Pace</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/blank" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Blank Page</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/examples/starter" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Starter Page</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-header">MISCELLANEOUS</li>
            <li className="nav-item">
              <a href="https://adminlte.io/docs/3.1/" className="nav-link">
                <i className="nav-icon fas fa-file"></i>
                <p>Documentation</p>
              </a>
            </li>
            <li className="nav-header">MULTI LEVEL EXAMPLE</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-circle nav-icon"></i>
                <p>Level 1</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-circle"></i>
                <p>
                  Level 1
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Level 2</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>
                      Level 2
                      <i className="right fas fa-angle-left"></i>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-dot-circle nav-icon"></i>
                        <p>Level 3</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-dot-circle nav-icon"></i>
                        <p>Level 3</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Level 2</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-circle nav-icon"></i>
                <p>Level 1</p>
              </a>
            </li>
            <li className="nav-header">LABELS</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-danger"></i>
                <p className="text">Important</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-warning"></i>
                <p>Warning</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-info"></i>
                <p>Informational</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
