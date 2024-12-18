 
export const mapRoleName = (role?: string): string => 
    ROLE_NAMES[role || "VISITOR"] || ROLE_NAMES.VISITOR;


const ROLE_NAMES: Record<string, string> = {
    ADMIN: "Administrador",
    USER: "Utilizador padrão",
    VISITOR: "Visitante"
  };
 