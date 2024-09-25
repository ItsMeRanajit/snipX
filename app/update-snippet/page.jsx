'use client'

import { useEffect, useState } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'

import Form from '@components/Form' 
const update_snippet  = () => {
    const searchParams = useSearchParams();
    const user_id = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
                                        title : '',
                                        tag : [],
                                        snippet_code : '',
                                        vsCode: '',
                                        atom : '',
                                        sublimeText: ''
                                    });
    const router = useRouter();

    useEffect(() => {
        const getSnippetDetails = async() => {
             const response = await fetch(`/api/snippet/${user_id}`)
             const data = await response.json();
             console.log(data.tag)
             setPost({
                title : data.title,
                tag: data.tag,
                snippet_code: data.snippet_code,
                vsCode: data.vsCode,
                atom : data.atom,
                sublimeText: data.sublimeText
             })
            }

            if(user_id) getSnippetDetails();
    },[user_id])

    // useEffect(() => {
    //   console.log(post,"sh")
    // },[post])
    
    const UpdateSnippet = async (e) => {
      // console.log(post)
        e.preventDefault();
        setSubmitting(true);

        if(!user_id) alert("No snippet found")

        try {
          const response = await fetch(`/api/snippet/${user_id}`,
            {
              method : 'PATCH',
              body : JSON.stringify({
                title : post.title,
                tag: post.tag,
                snippet_code: post.snippet_code,
                vsCode: post.vsCode,
                atom : post.atom,
                sublimeText: post.sublimeText
              })
            }
          )
          if(response.ok){
            router.push('/');
            console.log(response)
          }
        }catch(error){
          console.log(error);
        }finally{
          setSubmitting(false);
        }
    }
  return (
    <Form
        type = "Edit"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {UpdateSnippet}
    />
  )
}

export default update_snippet 