import express , {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto"; 
import cors from 'cors';
import axios from "axios";

type PostContent = {
    id: string;
    content: string;
}

const app: Express = express();
app.use(bodyParser.json()); 
app.use(cors());

const commentsByPostId: PostContent[] = []; 

app.get('/posts/:id/comments', (req: Request, res: Response) => {
    res.send(commentsByPostId[req.params.id] || []); 
});

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
     const commentId = randomBytes(4).toString('hex'); 
     const { content } = req.body;

     const comments: PostContent[] = commentsByPostId[req.params.id] || [];
     comments.push({ id: commentId,  content });
     commentsByPostId[req.params.id] = comments;

     await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: { 
            id: commentId,
            content,
            postId: req.params.id
        }
    });

     res.status(201).send(comments); 
});

app.post('/events', (req: Request, res: Response) => {
    console.log('Received Event', req.body.type);

    res.send({}); 
});

app.listen(4001, () => {
    console.log('Listening to 4001 Port');
});