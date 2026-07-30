import { SupabaseClient, User, Session } from '@supabase/supabase-js';

export interface AuthResult {
  success: boolean;
  user?: User | null;
  session?: Session | null;
  error?: string;
}

export class ForgeAuthService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Registers a new athlete with Email, Password, Username and Display Name
   */
  async signUpWithEmail(
    email: string,
    password: string,
    displayName: string,
    username: string
  ): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            username: username.toLowerCase().trim(),
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error inesperado durante el registro.' };
    }
  }

  /**
   * Signs in an existing athlete with Email and Password
   */
  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: 'Credenciales inválidas. Verifica tu correo y contraseña.' };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error inesperado al iniciar sesión.' };
    }
  }

  /**
   * Signs out current active session
   */
  async signOut(): Promise<boolean> {
    const { error } = await this.supabase.auth.signOut();
    return !error;
  }

  /**
   * Gets current active session user
   */
  async getCurrentSession(): Promise<User | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session?.user || null;
  }
}
