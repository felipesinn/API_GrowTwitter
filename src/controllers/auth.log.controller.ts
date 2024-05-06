import { Request, Response } from 'express';
import { AuthService } from '../servicing/auth.log.servicing';

const authService = new AuthService();

export class AuthController {
  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response.status(400).json({
          error: true,
          message: 'Informe o email e a senha',
          code: 400,
        });
      }

      const result = await authService.login(email, password);

      return response.status(result.code).json(result);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: true,
        message: 'Erro ao realizar login',
        code: 500,
      });
    }
  }
}
