/**
 * Función para desplazarse suavemente al formulario de contacto
 */
export const scrollToContactForm = () => {
  // Buscar el elemento del formulario de contacto
  const contactForm = document.getElementById('contact-form');

  // Si existe, desplazarse suavemente a él
  if (contactForm) {
    contactForm.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Si no existe en la página actual, redirigir a la página de contacto
    // y añadir un hash para que se desplace al formulario cuando cargue
    window.location.href = '/contact#contact-form';
  }
};
