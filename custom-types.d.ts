// En tu archivo types.d.ts o similar

declare global {
    // Redefiniendo UserPublicMetadata para incluir propiedades específicas
    interface UserPublicMetadata {
      // Ejemplo de propiedades customizadas
      favoriteColor?: string;
      bio?: string;
    }
  
    // Redefiniendo UserPrivateMetadata para incluir propiedades específicas
    interface UserPrivateMetadata {
      // Ejemplo de propiedades customizadas
      secretNotes?: string;
    }

    interface Window {
      ethereum?: any;
    }
  }
  