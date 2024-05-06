import bcrypt from 'bcrypt';
import { ResponseData } from '../dtos/response.dtos';
import { daterepository } from '../database/data.prisma';

export class AuthService {
  async login(email: string, password: string): Promise<ResponseData> {
    try {
      const user = await daterepository.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return {
          error: true,
          message: 'Credenciais inválidas',
          code: 401,
        };
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return {
          error: true,
          message: 'Credenciais inválidas',
          code: 401,
        };
      }

      return {
        success: true,
        message: 'Login realizado com sucesso',
        code: 200,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
        },
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: 'Erro ao realizar login',
        code: 500,
      };
    }
  }
}
