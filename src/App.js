import logo from './logo.svg';
import './App.css';
import { FarkleGameRules } from './components/FarkleGameRules';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import { Farkle } from './components/Farkle/Farkle';
import { FarklePractice } from './components/Farkle/FarklePractice';
const linkDiv = {margin:"10px"};


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div style={linkDiv}>
            <NavLink to="farkle">Farkle</NavLink>
          </div>
          <div style={linkDiv}>
            <NavLink to="farklePractice">Practice</NavLink>
          </div>
          <div style={linkDiv}>
            <NavLink to="farkleRules">Rules</NavLink>
          </div>
        </div>
        <Routes>
          <Route path="/farkle" element={<Farkle />} />
          <Route path="/farklePractice" element={<FarklePractice />} />
          <Route path="/farkleRules" element={<FarkleGameRules />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
