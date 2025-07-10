import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import ExamRegistrationPage from "./pages/ExamRegistrationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/exam-registration" element={<ExamRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
