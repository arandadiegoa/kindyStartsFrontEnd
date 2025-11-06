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
import { HomeFamily } from "./pages/family/HomeFamily";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardAdm } from "./pages/adm/DashboardAdm";
import { useAuth } from "./hook/useAuth";
import { Messages } from "./pages/adm/Messages";
import { ActivitiesAdm } from "./pages/adm/ActivitiesAdm";
import { Users } from "./pages/adm/Users";
import { FamilyDocs } from "./pages/family/FamilyDocs";
import { FamilyNews } from "./pages/family/FamilyNews";
import { FamilyPhotos } from "./pages/family/FamilyPhotos";

function App() {

  const {user} = useAuth()
  const role = user?.role

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
            <Route path="/adm/dashboard" element={<DashboardAdm />} />
            <Route path="/adm/mensajes" element={<Messages />} />
            <Route path="/adm/actividades" element={<ActivitiesAdm />} />
            <Route path="/adm/usuarios" element={<Users />} />
        </Route>

        <Route element={<ProtectedRoute validRoles={['teaching']} />}>
            <Route path="/teaching/mi-sala" element={<MyClass />} />
        </Route>

        <Route element={<ProtectedRoute validRoles={['family']} />}>
            <Route path="/family/mi-portal" element={<HomeFamily />} />
            <Route path="/family/documentos" element={<FamilyDocs />} />
            <Route path="/family/novedades" element={<FamilyNews />} />
            <Route path="/family/fotos-diarias" element={<FamilyPhotos />} />
        </Route>
      </Routes>
      
      {!(role === 'admin' || role === 'teaching') &&  <Footer />}
     
    </>
  );
}

export default App;
