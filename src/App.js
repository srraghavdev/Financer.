import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <ToastContainer className='toast-cont' theme={'dark'}/>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path='/income' element={<Income></Income>}></Route>
          <Route path='/expenses' element={<Expenses></Expenses>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
