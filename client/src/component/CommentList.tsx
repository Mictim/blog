import { Comment } from "./../models"

type CommentListProps = {
    comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })

    return (
        <ul>{renderedComments}</ul>
    )
}

export default CommentList;