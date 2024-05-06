import { TweetType } from "@prisma/client";

export interface TweetDTO {
  content: string;
  userId: string;
  tweetType: TweetType;
}
