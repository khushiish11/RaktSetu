import { BrowserRouter, Routes, Route }
    from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindBlood from './pages/FindBlood';
import Hospitals from './pages/Hospitals';
import RegisterDonor from './pages/RegisterDonor';
import RequestBlood from './pages/RequestBlood';
import Emergency from './pages/Emergency';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-blood"
            element={<FindBlood />} />
        <Route path="/hospitals"
            element={<Hospitals />} />
        <Route path="/register-donor"
            element={<RegisterDonor />} />
        <Route path="/request-blood"
            element={<RequestBlood />} />
        <Route path="/emergency"
            element={<Emergency/>} />
        <Route path="/login"
            element={<Login/>} />
        <Route path="/register"
            element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;