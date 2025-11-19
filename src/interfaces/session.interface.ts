import { User } from "./user.interface";
export interface Session {
  access_token?: string; // Adiciona o token de acesso
  user: User; // Altera o tipo para User
}