import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IngestionPage from './components/IngestionPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="p-4 flex justify-between items-center border-b mb-6">
        <h1 className="text-xl font-bold">SecOps Pulse</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600">Ingestion</Link>
          <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<IngestionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
