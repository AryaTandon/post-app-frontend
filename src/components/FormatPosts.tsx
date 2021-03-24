
import './FormatPosts.css'
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
        <div className="display_holder">
            <h1> Selected Post</h1>
            <p className="display_content">Title: <span className="display_variable">{title}</span></p>
            <p className="display_content">Post: <span className="display_variable">{post}</span></p>
            <div className="display_button_holder">
            <button className="action_button" onClick = {() => showPostEditor()}>Edit</button>
            <button className="action_button"onClick = {() => deletePost(id)}>Delete</button>
            </div>
        </div>
        :  <div className="display_holder">
        <h1> Edit Selected Post</h1>
        <input className="form_input" id="edited-title" type="text" name="title" defaultValue={title}/>
        <textarea className="form_text_area" id="edited-post" name="post" form="usrform" placeholder="Enter text here..." required={true} defaultValue={post}></textarea>
        <button className="action_button" onClick = {() => showPostEditor()}>Cancel Edit</button>
        <button className="action_button" onClick = {() => getValuesToSave()}>Save</button>
        </div>
    )
};

export default FormatPosts;