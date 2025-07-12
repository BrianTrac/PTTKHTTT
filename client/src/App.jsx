import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import ExamRegistrationPage from "./pages/ExamRegistrationPage";
import ViewRegistrationListPage from "./pages/ViewRegistrationListPage";
import PaymentPage from "./pages/PaymentPage"; 
import RenewalCheckPage from "./pages/RenewalCheckPage";
import CertificateSearchPage from "./pages/CertificateSearchPage"; 
import ExamSchedulePage from "./pages/ExamSchedulePage";
import DashBoard from "./pages/DashBoard";
import "./index.css"; // Ensure you have Tailwind CSS imported

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/exam-registration" element={<ExamRegistrationPage />} />
        <Route path="/view-registration-list" element={<ViewRegistrationListPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/renewal-check" element={<RenewalCheckPage />} />
        <Route path="/certificate-search" element={<CertificateSearchPage />} />
        <Route path="/exam-schedule" element={<ExamSchedulePage />} />
        <Route path="/" element={<DashBoard onNavigate={(key) => window.location.pathname = `/${key}`} />} />
      </Routes>
    </Router>
  );
}

export default App;

