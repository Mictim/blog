

import express, {Express, Request, Response} from 'express';
import bodyParser from 'body-parser'; 
import axios from 'axios'; 
  
const app: Express = express();
app.use(bodyParser.json());

app.post('/events', async  (req: Request, res: Response) => {
    const {type, data} = req.body;

    if(type === "CommentCreated") {
        const status = data.content.includes("orange") 
            ? "rejected"
            : "approved";
            
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }

    res.send({}); 
});

app.listen(4003, () => {
    console.log('Moderation service: Listening for 4003 Port');
})