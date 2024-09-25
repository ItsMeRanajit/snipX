'use client'
import { useState, useEffect } from "react"

import Profile from '@components/Profile'
const MyProfile = ({params}) => {

    const [posts, setPosts] = useState([]);
    const id = params.id;
    const [name,setName] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${id}/posts`);
            const data = await response.json();
            // console.log(response);
            setName(data[0].creator.username)
            setPosts(data);
        }
        
        if(id) fetchPosts();
        // console.log(posts)
    },[id])

  return (
    <Profile
        name = {`${name}'s`}
        desc="Explore their snippets and share your thoughts!"
        data={posts}
        // handleEdit={handleEdit}
        // handleDelete = {handleDelete}
        />
  )
}

export default MyProfile