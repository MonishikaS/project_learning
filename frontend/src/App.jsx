import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentDashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/instructor" element={<InstructorDashboard/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
