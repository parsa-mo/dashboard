import { Electrolyser, Home, FuelCell } from "./Pages/Pages";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
