import { daterepository } from "../database/data.prisma";
import { ResponseData } from "../dtos/response.dtos";
import { TweetDTO } from "../dtos/tweet.dto";

export class TweetService {
  async createTweet(tweetDTO: TweetDTO): Promise<ResponseData> {
    try {
      const { content, userId, tweetType } = tweetDTO;

      const tweet = await daterepository.tweet.create({
        data: {
          content,
          userId,
          tweetType
        }
      });

      return {
        success: true,
        message: "Tweet criado com sucesso",
        code: 201,
        data: tweet,
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: "Erro ao criar o tweet",
        code: 500,
      };
    }
  }
}
