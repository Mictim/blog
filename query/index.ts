import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

type Post = {
    id: string;
    title: string;
    comments?: Comment[];
}

type Comment = {
    id: string;
    content: string;
    postId: string;
    status?: string;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
// the idea was to create a post of Post[] type;
/*
const posts: Post[] = [];
*/
// but this approach doesn't work, because client app received empty array in this case
const posts = {};

const handleEvent = (type: string, data: any) => {
    switch (type) {
        case "PostCreated": {
            const { id, title } = data;
            posts[id] = { id, title, comments: [] };
            break;
        }
        case "CommentCreated": {
            const { id, content, postId, status }: Comment = data;
            posts[postId].comments!.push({ id, content, status });
            break;
        }
        case "CommentUpdated": {
            const { id, content, postId, status }: Comment = data;
            const post = posts[postId];
            const comment: Comment = post.comments.find((comment: { id: string; }) => {
                return comment.id === id
            }) 
            comment.status = status;
            comment.content = content;
            break;
        }
        default: {
            console.warn(`${type} doesn't exists!`);
        }
    }
}

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    console.log(posts);
    res.send({});
});

app.listen(4002, async () => {
    console.log("Query service: Listening on 4002 port");

    const res = await axios.get('http://localhost:4005/events');
    for (const event of res.data) {
        console.log('Processing event: ', event.type);
        handleEvent(event.type,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     event.data);
    }
});
