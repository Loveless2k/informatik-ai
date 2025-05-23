import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import Tooltip from '@/components/ui/Tooltip';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Usar el contexto de tema
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <footer className={`relative overflow-hidden ${
      isDarkMode
        ? 'bg-black text-white'
        : 'bg-[#007D84] text-white'
    }`}>
      {/* Abstract shapes in background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full filter blur-3xl ${
          isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
        }`}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full filter blur-3xl ${
          isDarkMode ? 'bg-[#48D1CC]' : 'bg-[#48D1CC]'
        }`}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 shadow-md ${
                isDarkMode
                  ? 'bg-gradient-to-br from-[#00F0FF] to-[#48D1CC]'
                  : 'bg-gradient-to-br from-[#00B4DB] to-[#48D1CC]'
              }`}>
                IA
              </div>
              <h3 className={`text-xl font-bold bg-clip-text text-transparent ${
                isDarkMode
                  ? 'bg-gradient-to-r from-[#00F0FF] to-[#48D1CC]'
                  : 'bg-gradient-to-r from-white to-[#E0FBFF]'
              }`}>
                Informatik-AI
              </h3>
            </div>
            <p className="text-gray-300 mb-6">
              Potenciando empresas con soluciones inteligentes de IA para la transformación digital.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-800 flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 text-center sm:text-left">
            <h3 className={`text-lg font-semibold mb-5 ${
              isDarkMode ? 'text-[#00F0FF]' : 'text-white'
            }`}>Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={`hover:text-white transition-colors flex items-center group ${
                  isDarkMode ? 'text-gray-300' : 'text-[#E0FBFF]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
                  }`}></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className={`hover:text-white transition-colors flex items-center group ${
                  isDarkMode ? 'text-gray-300' : 'text-[#E0FBFF]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
                  }`}></span>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/services" className={`hover:text-white transition-colors flex items-center group ${
                  isDarkMode ? 'text-gray-300' : 'text-[#E0FBFF]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
                  }`}></span>
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/success-cases" className={`hover:text-white transition-colors flex items-center group ${
                  isDarkMode ? 'text-gray-300' : 'text-[#E0FBFF]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
                  }`}></span>
                  Casos de Éxito
                </Link>
              </li>
              {/* Temporalmente oculto
              <li>
                <Link href="/blog" className={`hover:text-white transition-colors flex items-center group ${
                  isDarkMode ? 'text-gray-300' : 'text-[#E0FBFF]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
                  }`}></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className={`hover:text-white transition-colors flex items-center group ${
                  isDarkMode ? 'text-gray-300' : 'text-[#E0FBFF]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
                  }`}></span>
                  Recursos
                </Link>
              </li>
              */}
              <li>
                <Link href="/contact" className={`hover:text-white transition-colors flex items-center group ${
                  isDarkMode ? 'text-gray-300' : 'text-[#E0FBFF]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#E0FBFF]'
                  }`}></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 text-center sm:text-left">
            <h3 className={`text-lg font-semibold mb-5 ${
              isDarkMode ? 'text-[#00F0FF]' : 'text-white'
            }`}>Nuestros Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#ai-consulting" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Consultoría de IA
                </Link>
              </li>
              <li>
                <Link href="/services#machine-learning" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Soluciones de Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/services#data-analytics" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Analítica de Datos
                </Link>
              </li>
              <li>
                <Link href="/services#process-automation" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Automatización de Procesos
                </Link>
              </li>
              <li>
                <Link href="/services#custom-ai" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Desarrollo de IA Personalizada
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 text-center sm:text-left">
            <h3 className={`text-lg font-semibold mb-5 ${
              isDarkMode ? 'text-[#00F0FF]' : 'text-white'
            }`}>Contáctanos</h3>
            <address className="not-italic space-y-4">
              <p className="text-gray-300 flex items-start group">
                <span className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center mr-3 transition-colors duration-300">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span>San Martin 924, Of. 213, Temuco</span>
              </p>
              <p className="text-gray-300 flex items-start group">
                <span className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center mr-3 transition-colors duration-300">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span>+56 951172768</span>
              </p>
              <p className="text-gray-300 flex items-start group">
                <span className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center mr-3 transition-colors duration-300">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span>info@informatik-ai.com</span>
              </p>
            </address>
          </div>
        </div>

        <div className={`mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center border-t ${
          isDarkMode ? 'border-gray-800' : 'border-[#006A70]'
        }`}>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-[#E0FBFF]'
          }`}>
            &copy; {currentYear} Informatik-AI. Todos los derechos reservados.
          </p>
          <div className="mt-4 sm:mt-6 md:mt-0">
            <ul className="flex flex-wrap gap-6 text-sm justify-center">
              <li>
                <Tooltip text="Información sobre cómo manejamos tus datos" position="top">
                  <Link href="/privacy-policy" className={`transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-[#E0FBFF] hover:text-white'
                  }`}>
                    Política de Privacidad
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip text="Condiciones de uso de nuestros servicios" position="top">
                  <Link href="/terms-of-service" className={`transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-[#E0FBFF] hover:text-white'
                  }`}>
                    Términos de Servicio
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip text="Información sobre el uso de cookies en este sitio" position="top">
                  <Link href="/cookies" className={`transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-[#E0FBFF] hover:text-white'
                  }`}>
                    Cookies
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
