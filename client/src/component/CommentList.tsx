import { Comment } from "./../models"

type CommentListProps = {
    comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {

    const renderedComments = comments.map(comment => {
        {
            switch(comment.status) {
                case "rejected": {
                    return <li key={comment.id}>Comment is rejected by Moderation service</li>
                };
                case "pending": {
                    return <li key={comment.id}>Comment is moderated</li>
                };
                default: {
                    return <li key={comment.id}>{comment.content}</li>
                }
            }
        }
        
    })

    return (
        <ul>{renderedComments}</ul>
    )
}

export default CommentList;