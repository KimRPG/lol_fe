import { Route, Routes } from "react-router-dom";
import Home from "./page/Home"
import Detail from "./page/Detail"
import Login from "./page/Login";
import Create from "./page/Create"
import Update from "./page/Update";
import Signup from "./page/Signup"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/page/:index" element={<Detail />} />
      <Route path="/login" element={<Login/>} />
      <Route path="create" element={<Create/>}/>
      <Route path="/update/:index" element={<Update/>}/>
      <Route path="/signup" element={<Signup/>}/>
      
    </Routes>
  );
}

export default App;
