import { Request, Response } from "express";
import { UserService } from "../servicing/user.servicing"

const userService = new UserService();

export class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const user = await userService.createUser(name, email, password);

      return response.status(201).json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: true,
        message: 'Erro ao criar usuário'
      });
    }
  }
}
