import bcrypt from 'bcrypt';
import { ResponseData } from '../dtos/response.dtos';
import { daterepository } from "../database/data.prisma";

export class UserService {
  async createUser(name: string, email: string, password: string): Promise<ResponseData> {
    try {
      const existingUser = await daterepository.user.findFirst({
        where: {
          email,
        },
      });

      if (existingUser) {
        return {
          success: false,
          message: 'Este email já está cadastrado',
          code: 400,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await daterepository.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          username: name,
        },
      });

      return {
        success: true,
        message: 'Usuário cadastrado com sucesso',
        code: 201,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Erro ao criar usuário',
        code: 500,
      };
    }
  }
}
