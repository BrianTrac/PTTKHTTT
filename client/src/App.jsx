import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import ExamRegistrationPage from "./pages/ExamRegistrationPage";
import ViewRegistrationListPage from "./pages/ViewRegistrationListPage";
import "./index.css"; // Ensure you have Tailwind CSS imported

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/exam-registration" element={<ExamRegistrationPage />} />
        <Route path="/view-registration-list" element={<ViewRegistrationListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
