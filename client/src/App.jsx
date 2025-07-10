import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import ExamRegistrationPage from "./pages/ExamRegistrationPage";
import ViewRegistrationListPage from "./pages/ViewRegistrationListPage";
import PaymentPage from "./pages/PaymentPage"; 
import RenewalCheckPage from "./pages/RenewalCheckPage";
import CertificateSearchPage from "./pages/CertificateSearchPage"; 
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
      </Routes>
    </Router>
  );
}

export default App;

