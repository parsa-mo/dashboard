import { Home } from "./Pages/Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Components";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
