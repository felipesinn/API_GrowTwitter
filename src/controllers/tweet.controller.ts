import { Request, Response } from "express";
import { TweetService } from "../servicing/tweet.servicing";
import { TweetDTO } from "../dtos/tweet.dto";

const tweetService = new TweetService();

export class TweetController {
  async createTweet(request: Request, response: Response) {
    try {
      const { content, userId } = request.body;
      const tweetType = "TWEET"; 

      const tweetDTO: TweetDTO = { content, userId, tweetType };

      const tweet = await tweetService.createTweet(tweetDTO);

      return response.status(tweet.code).json(tweet);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: true,
        message: "Erro ao criar o tweet",
      });
    }
  }
}
