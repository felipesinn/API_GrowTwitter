import express from 'express';
import cors from 'cors';
import { UserController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.log.controller';
import { TweetController } from './controllers/tweet.controller';


const app = express();
app.use(express.json());
app.use(cors());

const userController = new UserController();
const authController = new AuthController();
const tweetController = new TweetController();


app.post('/createUser', userController.createUser);
app.post('/login', authController.login);
app.post('/createTweet', tweetController.createTweet);



app.listen(3333, () => {
  console.log('🚀 Server is running on port 3333');
});
