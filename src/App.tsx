import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Activities } from "./pages/Activities";
import { Educational } from "./pages/Educational";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/actividades" element={<Activities />} />
        <Route path="/propuestaEducativa" element={<Educational />} />
      </Routes>
    </>
  );
}

export default App;
