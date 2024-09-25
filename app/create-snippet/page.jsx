'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form' 
const create_snippet  = () => {
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
    const {data: session} = useSession();
    const CreateSnippet = async (e) => {
 
        e.preventDefault();
        setSubmitting(true);

        try {
          const response = await fetch('/api/snippet/new',
            {
              method : 'POST',
              headers: {
                'Content-Type': 'application/json' // Add this header
            },
              body : JSON.stringify({
                userId : session?.user.id,
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
        type = "Create"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {CreateSnippet}
    />
  )
}

export default create_snippet 