import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuScan from '../src/components/MenuScan';
import AdminLogin from '../src/components/AdminLogin';
import AdminDashboard from '../src/components/AdminDashboard';
import './App.css';
import QRCodeScanner from '../src/components/QRCodeScanner';
import GenerateQRCode from '../src/components/GenerateQRCode';
import PrintQRCodes from '../src/components/PrintQRCodes';
import Dashboard from './components/Dashboard';
//import Cameratest from './components/cameratest';
import CameraDashboard from '../src/components/CameraDashboard';
import QRCodeGenerator from '../src/components/QRCodeGenerator';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
//import QRCodeScanner from './components/QRCodeScanner';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<AdminDashboard />} /> */}
            {/* <Route path="/" element={<MenuScan />} /> */}
            {/* <Route path="/scan" element={<QRCodeScanner />} /> */}
             {/* <Route path="/" element={<QRCodeScanner />} /> */}
            {/* <Route path="/" element={<CameraDashboard />} /> */}
            {/* <Route path="/" element={<QRCodeGenerator />} /> */}
            {/* <Route path="/" element={<AdminLogin />} /> */}
            {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
             <Route path="/admindashboard" element={<AdminDashboard />} />
             {/* <Route path="/dashboard" element={<Dashboard />} /> */}
             <Route path="/" element={<Dashboard />} />
             <Route path="/register" element={<RegistrationForm />} />
            {/* <Route path="/" element={<RegistrationForm />} /> */}
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/generateQR" element={<GenerateQRCode />} />
            {/* <Route path="/" element={<GenerateQRCode />} /> */}
            <Route path="/generate-pdf" element={<PrintQRCodes />} />
            {/* <Route path="/" element={<QRCodeScanner />} /> */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
