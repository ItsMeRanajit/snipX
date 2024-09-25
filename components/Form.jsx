import Link from "next/link"
import { useEffect, useState } from "react";

const Form = ({ type , post ,setPost ,submitting ,handleSubmit }) => {
    const [tagValue, setTagValue] = useState();
    const setTag = () => {
        const tagArray = tagValue.split(' ').filter(tag => tag.trim() !== '').map( tag => tag.charAt(0) === '#' ? tag : `#${tag}`);
        setPost({...post, tag : tagArray});
    }
    useEffect(() => {
        const str = post.tag.map(tag => tag.charAt(0) === '#' ? tag : `#${tag}`).join(' ');
        setTagValue(str)
    },[post]);
    
  return (
    <section className="flex-col w-full max-w-full flex-start">
        <h1 className="head_text text_left">
            <span className="blue_gradient">{type} post</span>
        </h1>
        <p className="max-w-md text-left desc">
            {type} your code snippets here, customize as needed, and share with the world. Easily edit your creations anytime to keep them fresh and fabulous!
        </p>

        <form action="" onSubmit={handleSubmit}
              className="flex flex-col w-full max-w-full mt-5 rounded-md shadow-md gap-7 glassmorphism">
                    <label htmlFor="" className="">
                        <span className="text-base font-semibold text-gray-700 font-inter">
                            Your Snippet Here
                        </span>
                        <div className="flex flex-col w-full gap-3">
                            <div className=" max-w-96 w-96">
                                    <input type="text" 
                                           required 
                                           placeholder="Add Title..." 
                                           className="form_input"
                                           value={post.title}
                                           onChange={(e) =>{
                                            if (e.target.value.length <= 30) {
                                                setPost({ ...post, title: e.target.value });
                                              }
                                           }}/>

                                    <textarea name="" id="" 
                                    value={post.snippet_code}
                                    onChange={(e) => setPost({...post, snippet_code: e.target.value})}
                                    placeholder="Enter the output or result of the code snippet here..."
                                    required
                                    className="form_textarea  h-[237px] mb-3"></textarea>
                                    
                                    <span className="text-base font-semibold text-gray-700 font-inter">
                                    Add Some Tags {` `} {`(#react, #java, #nodejs etc.)`}
                                    </span>
                                    <input  type="text"
                                            required 
                                            placeholder="#tags" 
                                            className="form_input"
                                            value={tagValue}
                                            onChange={(e) => {
                                                // setPost({...post, tag : e.target.value})
                                                if (e.target.value.length <= 40) {
                                                    setTagValue(e.target.value);
                                                  }}
                                            }
                                            
                                            />
                            </div>

                        <hr />
                        
                        <div className="flex flex-wrap gap-3">
                            <div className=" max-w-96 w-96">
                                <textarea name="vsCode" id="vsCode" 
                                value={post.vsCode}
                                onChange={(e) => setPost({...post, vsCode: e.target.value})}
                                placeholder="Enter code snippet VS Code..."
                                className="form_textarea max-w-96 w-96 h-72"></textarea>
                            </div>
                            <div className=" max-w-96 w-96">
                                <textarea name="atom" id="atom" 
                                value={post.atom}
                                onChange={(e) => setPost({...post, atom: e.target.value})}
                                placeholder="Enter code snippet Atom..."
                                className="form_textarea max-w-96 w-96 h-72"></textarea>
                            </div>
                            <div className=" max-w-96 w-96">
                                <textarea name="sublimeText" id="sublimeText" 
                                value={post.sublimeText}
                                onChange={(e) => setPost({...post, sublimeText: e.target.value})}
                                placeholder="Enter code snippet Sublime Text..."
                                className="form_textarea max-w-96 w-96 h-72"></textarea>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="gap-4 mx-3 mb-5 flex-end">
                        <button className="black_btn"
                                type="submit"
                                onClick={setTag}
                                disabled={submitting}
                                >{type}</button>
                        <Link href="/" className="outline_btn">Cancel</Link>
                    </div>
              </form>
    </section>
  )
}

export default Form