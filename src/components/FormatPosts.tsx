
export interface Props {
    id: number;
    title: string | undefined;
    post: string
    deletePost: Function
};

const FormatPosts = ({id, title, post, deletePost}: Props) => {
    return (
        <div>
            <p>Title: {title}</p>
            <p>Post: {post}</p>
            <button onClick = {() => deletePost(id)}>Delete</button>
        </div>
    )
};

export default FormatPosts;