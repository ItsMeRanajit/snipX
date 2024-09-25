"use client"

import { useState  } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { Cursor } from "mongoose"

const SnippetCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const [copied, setCopied] = useState("");
    const {data : session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    
    const handleCopy = (value) => {
        setCopied(value);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setCopied("");
        },3000);
    }


return (
    <div className="snippet_card">
        <div className="flex items-start justify-between gap-5">
            <div className="flex justify-start flex-1 gap-3 cursor-pointer">
                <Link href={session?.user.id === post.creator._id ? "/profile" : `/other-profile/${post.creator._id}`}>
                    <Image
                        src ={post.creator.image}
                        alt = "img"
                        width={40}
                        height={40}
                        className="object-contain rounded-full"
                        />
                </Link>
                <Link href={session?.user.id === post.creator._id ? "/profile" : `/other-profile/${post.creator._id}`}>
                    <div>
                        <h3 className="flex-wrap text-xl font-semibold text-gray-900 font-inter" >{post.creator.username}</h3>
                    </div>
                </Link>
            </div>
        </div>
        <div className="flex items-center justify-between gap-5 ">
        <h4 className="flex-wrap mt-2 text-xl font-semibold text-gray-800 text-satoshi">{post.title}</h4>        
        <div className="copy_btn" onClick={() => {handleCopy(post.snippet_code)}}>
                    <Image src={(copied === post.snippet_code) ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                    width={15}
                    height={15}/>
                </div>
        </div>
        <pre className="my-4 overflow-auto text-sm text-gray-700 font-satoshi ">
            {post.snippet_code}
        </pre>
        
        <div className="flex flex-wrap gap-2 text-sm cursor-pointer font-inter blue_gradient">
                    {post.tag.map((element,index) => (
                        <div key={index} 
                        className="px-2 font-bold text-white rounded-full bg-primary-blue bg-opacity-85"
                        onClick={() =>(pathName !== '/profile') && (pathName !== `/other-profile/${post.creator._id}`)  && handleTagClick(element)}>
                            {element}
                        </div>
                    ))}
        </div>

        <h4 className="my-2 text-lg font-semibold text-gray-800 text-satoshi">Get Snippets Here</h4>
        
        <div className="flex justify-between">
        <button
                className={`${post.vsCode === "" ? 'disable_btn' : 'outline_btn_sm'}`}
                type="button"
                disabled={post.vsCode === ""}
                onClick={() => handleCopy(post.vsCode)}
                >
            VS Code
            <Image src={(copied === post.vsCode && post.vsCode !== "") ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                    width={15}
                    height={15}
                    className="ml-1"></Image>
            </button>
            
            <button   className={`${post.atom === "" ? 'disable_btn' : 'outline_btn_sm'}`}
                type="button"
                disabled={post.atom === ""}
                onClick={() => handleCopy(post.atom)}>
            Atom
            <Image src={(copied === post.atom && post.atom !== "") ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                    width={15}
                    height={15}
                    className="ml-1"></Image>
            </button>

            <button   className={`${post.sublimeText === "" ? 'disable_btn' : 'outline_btn_sm'}`}
                type="button"
                disabled={post.sublimeText === ""}
                onClick={() => handleCopy(post.sublimeText)}>
            Sublime Text
            <Image src={(copied === post.sublimeText && post.sublimeText !== "") ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                    width={15}
                    height={15}
                    className="ml-1"></Image>
            </button>
        </div>
        {
           session?.user.id === post.creator._id ? 
           (pathName === '/profile') &&
           <div className="flex justify-center gap-4 pt-3 mt-5 border-t border-gray-300">
            <p className="text-sm cursor-pointer font-inter green_gradient"
                onClick={handleEdit}>
                Edit
            </p>
            <p className="text-sm cursor-pointer font-inter orange_gradient"
                onClick={handleDelete}>
                Delete
            </p>
           </div> :
           <div></div>
        }
    </div>
)
}
export default SnippetCard