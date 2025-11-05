import {
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-green-100 text-muted-foreground p-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly gap-10">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg text-foreground mb-2">
            KindyStarts
          </h3>
          <ul className="space-y-1 flex flex-col items-center md:items-start">
            <li className="flex items-start gap-2">
              <a
                href="https://www.google.com/maps"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={20} className="mt-1"/>
              </a>
              <span>AV. Siempre Viva 123, Córdoba, Argentina</span>
            </li>
            <li className="flex items-start gap-2">
              <a
                href="https://www.whatsapp.com/?lang=es"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={20} className="mt-1"/>
              </a>
               <span>351-1233900</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-1"/>
              <span>Lunes a Viernes de 8 a 17hs</span>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg text-foreground mb-2">
            Información para familias
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/contacto"
                className="hover:text-primary transition-colors"
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                to="/¿como-inscribirse?"
                className="hover:text-primary transition-colors"
              >
                ¿Cómo inscribirse?
              </Link>
            </li>
            <li>
              <Link
                to="/preguntas-frecuentes"
                className="hover:text-primary transition-colors"
              >
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg text-foreground mb-2">Redes</h3>
          <ul className="space-y-1 flex flex-col items-center md:items-start">
            <li>
              <a
                href="https://instagram.com"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/?locale=es_LA"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/?lang=es"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
         <div className="border-t border-gray-700/20 mt-5 pt-6 text-center text-sm">
        <p>© 2025 KindyStarts. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
