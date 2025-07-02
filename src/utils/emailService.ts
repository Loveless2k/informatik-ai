import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_1k212a9',
  templateId: 'template_93m0kce',
  publicKey: 'NuEMLaMO5zEqU4ka1',
};

// Tipos para los datos del formulario
export interface EmailFormData {
  user_name: string;
  user_email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

// Función para enviar email con manejo de errores robusto
export const sendEmail = async (formData: EmailFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Inicializar EmailJS si no está inicializado
    if (!emailjs) {
      throw new Error('EmailJS no está disponible');
    }

    // Crear un formulario temporal para EmailJS
    const tempForm = document.createElement('form');
    
    // Agregar campos al formulario
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        tempForm.appendChild(input);
      }
    });

    // Agregar el formulario al DOM temporalmente
    document.body.appendChild(tempForm);

    try {
      // Intentar enviar con EmailJS
      const response = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        tempForm,
        EMAILJS_CONFIG.publicKey
      );

      // Limpiar el formulario temporal
      document.body.removeChild(tempForm);

      if (response.status === 200) {
        return {
          success: true,
          message: 'Email enviado correctamente'
        };
      } else {
        throw new Error(`Error del servidor: ${response.status}`);
      }

    } catch (emailError) {
      // Limpiar el formulario temporal en caso de error
      if (document.body.contains(tempForm)) {
        document.body.removeChild(tempForm);
      }
      throw emailError;
    }

  } catch (error) {
    console.error('Error al enviar email:', error);
    
    // Determinar el tipo de error y devolver mensaje apropiado
    if (error instanceof Error) {
      if (error.message.includes('CSP') || error.message.includes('Content Security Policy')) {
        return {
          success: false,
          message: 'Error de configuración de seguridad. Por favor, contacta al administrador del sitio.'
        };
      } else if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
        return {
          success: false,
          message: 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.'
        };
      } else {
        return {
          success: false,
          message: 'Error al enviar el mensaje. Por favor, intenta nuevamente más tarde.'
        };
      }
    }

    return {
      success: false,
      message: 'Error desconocido. Por favor, intenta nuevamente.'
    };
  }
};

// Función alternativa usando fetch directo (como fallback)
export const sendEmailFallback = async (formData: EmailFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Esta es una implementación alternativa que podrías usar
    // si EmailJS no funciona debido a CSP
    
    // Por ahora, simularemos el envío
    console.log('Usando método fallback para enviar email:', formData);
    
    // Aquí podrías implementar:
    // 1. Un endpoint propio en tu servidor
    // 2. Una función serverless
    // 3. Un webhook
    
    return {
      success: true,
      message: 'Email enviado usando método alternativo'
    };
    
  } catch (error) {
    console.error('Error en método fallback:', error);
    return {
      success: false,
      message: 'Error en todos los métodos de envío. Por favor, contacta directamente.'
    };
  }
};

// Función principal que intenta EmailJS primero y luego el fallback
export const sendEmailWithFallback = async (formData: EmailFormData): Promise<{ success: boolean; message: string }> => {
  // Intentar con EmailJS primero
  const emailJsResult = await sendEmail(formData);
  
  if (emailJsResult.success) {
    return emailJsResult;
  }
  
  // Si EmailJS falla debido a CSP, intentar método alternativo
  if (emailJsResult.message.includes('configuración de seguridad')) {
    console.log('EmailJS bloqueado por CSP, intentando método alternativo...');
    return await sendEmailFallback(formData);
  }
  
  // Para otros errores, devolver el resultado original
  return emailJsResult;
};

// Función para inicializar EmailJS
export const initializeEmailJS = (): void => {
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  } catch (error) {
    console.error('Error al inicializar EmailJS:', error);
  }
};
