
export interface Props {
    id: number;
    title: string | undefined;
    post: string;
    postEditor: boolean;
    savePost: Function;
    showPostEditor: Function;
    deletePost: Function;
};

const FormatPosts = ({id, title, post, postEditor, savePost, showPostEditor, deletePost}: Props) => {
    const getValuesToSave = () => {
        const editedTitle = (document.getElementById("edited-title") as HTMLInputElement).value;
        const editedPost = (document.getElementById("edited-post") as HTMLInputElement).value;
        savePost(id, editedTitle, editedPost);
    }
    return (postEditor=== false ?
        <div>
            <p>Title: {title}</p>
            <p>Post: {post}</p>
            <button onClick = {() => showPostEditor()}>Edit</button>
            <button onClick = {() => deletePost(id)}>Delete</button>
        </div>
        : <div>
        <p>Title: </p><input id="edited-title" type="text" name="title" defaultValue={title}/>
        <br />
        <p>Post: </p><textarea id="edited-post" name="post" form="usrform" placeholder="Enter text here..." required={true} defaultValue={post}></textarea>
        <br />
        <button onClick = {() => showPostEditor()}>Stop editing</button>
        <button onClick = {() => getValuesToSave()}>Save</button>
        </div>
    )
};

export default FormatPosts;