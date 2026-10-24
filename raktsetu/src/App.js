import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindBlood from './pages/FindBlood';
import Hospitals from './pages/Hospitals';
import RegisterDonor from './pages/RegisterDonor';
import RequestBlood from './pages/RequestBlood';

function App() {
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/find-blood" element={<FindBlood/>} />
        <Route path="/register-donor" element={<RegisterDonor />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/hospitals" element={<Hospitals/>} />
        <Route path="/emergency" element={<h1>Emergency</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
