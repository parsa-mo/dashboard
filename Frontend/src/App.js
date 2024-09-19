import {
  Electrolyser,
  Home,
  FuelCell,
  Grid,
  Environment,
  Chamber,
} from "./Pages/Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Components";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/electrolyser" element={<Electrolyser />}></Route>
        <Route path="/fuel_cell" element={<FuelCell />}></Route>
        <Route path="/grid" element={<Grid />}></Route>
        <Route path="/environment" element={<Environment />}></Route>
        <Route path="/chamber" element={<Chamber />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
