import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

type Post = {
    id: string;
    title: string;
    comments?: Comment[];
}

type Comment = {
    id: string;
    content: string;
    postId: string;
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

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body;
    switch (type) {
        case "PostCreated": {
            const { id, title } = data;
            posts[id] = { id, title, comments: [] };
            break;
        }
        case "CommentCreated": {
            const { id, content, postId }: Comment = data;
            posts[postId].comments!.push({ id, content });
            break;
        }
        default: {
            console.warn(`${type} doesn't exists!`);
        }
    }
    res.send({});
});

app.listen(4002, () => {
    console.log("Listening on 4002 port");
});
