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
import { MyClass } from "./pages/teaching/MyClass";
import { Dashboard } from "./pages/adm/Dashboard";
import { HomeFamily } from "./pages/family/HomeFamily";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        
        {/*Pages public*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/actividades" element={<Activities />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/¿como-inscribirse?" element={<StepsList />} />
        <Route path="/preguntas-frecuentes" element={<Questions />} />

        {/*Pages private*/}
        <Route element={<ProtectedRoute validRoles={['admin']} />}>
            <Route path="/adm/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute validRoles={['teaching']} />}>
            <Route path="teaching/myclass" element={<MyClass />} />
        </Route>

        <Route element={<ProtectedRoute validRoles={['family']} />}>
            <Route path="/family/homefamily" element={<HomeFamily />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
