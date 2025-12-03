import { Navigate, Route, Routes } from "react-router-dom";
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
import { ChildrenList } from "./pages/teaching/ChildrenList";
import { PhotosClass } from "./pages/teaching/PhotosClass";
import { NewsClass } from "./pages/teaching/NewsClass";
import { NotFound } from "./pages/NotFound";

function App() {

  const {user} = useAuth()
  const role = user?.role

  const getDashboardRoute = () => {
    switch (role) {
      case 'admin': return "/adm/dashboard"
      case 'teaching': return "/teaching/mi-sala"
      case 'family': return "/family/mi-portal"
      default: return "/"
    }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        
        <Route 
          path="/"
          element={user ? <Navigate to={getDashboardRoute()} replace /> : <Home />}
        />

        {/*Pages public*/}
        <Route path="/login" element={user ? <Navigate to={getDashboardRoute()} /> : <Login />} />
        <Route path="/registro" element={user ? <Navigate to={getDashboardRoute()} /> : <Register />} />
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
            <Route path="/teaching/listado" element={<ChildrenList />} />
            <Route path="/teaching/fotos" element={<PhotosClass />} />
            <Route path="/teaching/novedades" element={<NewsClass />} />
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
