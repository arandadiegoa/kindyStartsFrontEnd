import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  // Define tus links aquí para no repetirlos
  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/actividades", label: "Actividades" },
    { to: "/propuestaEducativa", label: "Propuesta Educativa" }
    // Agrega más links aquí
  ];

  const baseClasses = "text-sm font-medium transition-colors hover:text-primary";
  const activeClass = "text-primary";
  const inactiveClass = "text-muted-foreground";

  return (
    <header className="flex h-12 w-full items-center justify-between border-b bg-background px-4 md:px-6 shadow-sm">
      {/* LADO IZQUIERDO: Logo y Nav para Desktop */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/img/logo.png"
            alt="KindyStarts Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Navegación para Desktop (se oculta en móvil) */}
        <nav className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              // Esta función de NavLink aplica estilos si el link está "activo"
              className={({ isActive }) =>
                cn(
                  baseClasses,
                  isActive ? activeClass : inactiveClass
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* LADO DERECHO: Botones de Acción (Desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <Button variant="link" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="link" asChild>
          <Link to="/register">Registrarse</Link>
        </Button>
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
                  src="/img/logo.png"
                  alt="KindyStarts Logo"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Links en el menú móvil */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          baseClasses,
                          isActive ? activeClass : inactiveClass
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>

              {/* Botones de acción en el menú móvil */}
              <div className="flex flex-col gap-3 pt-4 border-t">
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
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

import { cn } from "@/lib/utils";
