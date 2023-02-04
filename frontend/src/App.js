import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import AdminDashboardPage from "./pages/admin-dashboard";
import Login from "./pages/login";
import HomePage from "./pages";

import RiderRegisterPage from "./pages/rider-register";
import PartnerRegisterPage from "./pages/partner-register";
import MemberRegisterPage from "./pages/member-register";
import RiderDashboardPage from "./pages/rider-dashboard";
import PartnerDashboardPage from "./pages/partner-dashboard";
import MemberDashboardPage from "./pages/member-dashboard";
import CaregiverRegisterPage from "./pages/caregiver-register";
import Contact from "./pages/contact";
import styles from "./components/Layout/layout.module.css";
import Header from "./components/Layout/Header";
import CaregiverDashboardPage from "./pages/caregiver-dashboard";
import VerificationPending from "./pages/VerificationPending";
import VerificationDeclined from "./pages/VerificationDeclined";
import DonationPage from "./pages/donation";

function App() {
  return (
    <>
      <Router>
        <div className={`${styles.appContainer}`}>
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
              <Route path="/rider-dashboard" element={<RiderDashboardPage />} />
              <Route
                path="/partner-dashboard"
                element={<PartnerDashboardPage />}
              />
              <Route
                path="/member-dashboard"
                element={<MemberDashboardPage />}
              />
              <Route
                path="/member-dashboard"
                element={<CaregiverDashboardPage />}
              />

              <Route path="/member-register" element={<MemberRegisterPage />} />
              <Route
                path="/caregiver-register"
                element={<CaregiverRegisterPage />}
              />
              <Route
                path="/partner-register"
                element={<PartnerRegisterPage />}
              />
              <Route path="/rider-register" element={<RiderRegisterPage />} />

              <Route path="/VerificationPending" element={<VerificationPending />} />
              <Route path="/VerificationDeclined" element={<VerificationDeclined />} />
              <Route path="/donation" element={<DonationPage />} />



            </Routes>
          </main>

          <footer>Copyright © 2014 Merry Meals. All Rights Reserved.</footer>
        </div>
      </Router>
    </>
  );
}

export default App;
