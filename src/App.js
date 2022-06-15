import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/homePage/Home.js';
import AddEmployee from './pages/addEmployeePage/AddEmployee.js';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add_employee" element={<AddEmployee/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
