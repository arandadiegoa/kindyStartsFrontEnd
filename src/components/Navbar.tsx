import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/hook/useAuth";

export function Navbar() {
  const { user, logout } = useAuth();
  const role = user?.role

  const publicLinks = [
    { to: "/", label: "Inicio" },
    { to: "/contacto", label: "Contacto" },
    { to: "/actividades", label: "Actividades" },
  ];

  const adminLinks = [{ to: "/adm/dashboard", label: "Dashboard" }];

  const teachLinks = [{ to: "/teaching/mi-sala", label: "Mi sala" }];

  const familyLinks = [{ to: "/family/mi-portal", label: "Mi portal" }];

  let navLinks = [];

  switch (role) {
    case "admin":
      navLinks = adminLinks;
      break;
    case "teaching":
      navLinks = teachLinks;
      break;
    case "family":
      navLinks = familyLinks;
      break;
    default:
      navLinks = publicLinks;
  }

  return (
    <header
      className="flex h-12 w-full items-center 
    justify-between border-b bg-background px-4 md:px-6 shadow-md sticky top-0 z-50"
    >
      {/* LADO IZQUIERDO: Logo y Nav para Desktop */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/img/logo/logo.png"
            alt="KindyStarts Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Navegación para Desktop (se oculta en móvil) */}
        <nav className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <Button variant="link" asChild key={link.to}>
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            </Button>
          ))}
        </nav>
      </div>

      {/* LADO DERECHO: Botones de Acción (Desktop) */}

      <div className="hidden md:flex items-center gap-3">
        {role ? (
          <Button variant="link" onClick={logout}>
            Cerrar Sesión
          </Button>
        ) : (
          <>
            <Button variant="link" asChild>
              <Link to="/login">Login</Link>
            </Button>

            <Button variant="link" asChild>
              <Link to="/registro">Registrate</Link>
            </Button>
          </>
        )}
      </div>

      {/* BOTÓN DE MENÚ MÓVIL (se muestra solo en móvil) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-6 p-6">
              {/* Logo en el menú móvil */}
              <Link to="/" className="flex items-center">
                <img
                  src="/img/logo/logo.png"
                  alt="KindyStarts Logo"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Links en el menú móvil */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <NavLink key={link.to} to={link.to}>
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>

              {/* Botones de acción en el menú móvil */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                {role ? (
                  <SheetClose asChild>
                    <Button variant="link" onClick={logout}>
                      Cerrar Sesión
                    </Button>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button variant="ghost" asChild>
                        <Link to="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild>
                        <Link to="/register">Registrarse</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
