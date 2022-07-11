import logo from './logo.svg';
import './App.css';
import Signup from './Signup-component/Signup';
import Dashbord from './Dashbord-Component/Dashbord';
import Login from './Login-Component/Login'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes> 
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Dashbord" element={<Dashbord />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
