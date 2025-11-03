import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Activities } from "./pages/Activities";
import { Contact } from "./pages/Contact";
import { Footer } from "./components/Footer";
import { StepsList } from "./pages/StepsList";
import { Questions } from "./pages/Questions";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/actividades" element={<Activities />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/¿como-inscribirse?" element={<StepsList />} />
        <Route path="/preguntas-frecuentes" element={<Questions />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
