import { useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import './Post.scss'
import Create from "../Create/Create";

function Post() {
    const { data, isLoading } = usePosts()
    const posts = data?.slice(0, 10);
    const [isCreate, setIsCreate] = useState(false);

    if(isCreate) {
        return <Create />
    }

    return (
        <>
            <h1>Новые посты</h1>
            <p onClick={() => setIsCreate(true)} className="create">Создать пост</p>
            {isLoading
             ? 'Loading...'
             : posts?.length
             ? posts.map((post) => <div key={post.id} className="title">{post.title}</div>)
             : 'Not found'}
            
        </>
    )
}

export default Post;