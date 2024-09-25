'use client'
import { Suspense } from "react";
import Loading from '@app/loading.jsx'
import { CiSearch } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import { useState, useEffect } from "react"
import SnippetCard from './SnippetCard.jsx'
import Link from "next/link.js";


const SnippetCardList = ({data, handleTagClick}) => { 
  // Usage
  return (
    <div className="mt-16 snippet_layout ">
      {
        data.map((post) => (
          <SnippetCard key={post._id}
                       post = {post}
                       handleTagClick = {handleTagClick}/>
        ))
      }
    </div>
  )
}
const createUniqueRandomisedFeed = (limit, size = 10) => {
  // If the size is larger than the limit, adjust it
  if (size >= limit) size = limit;

  const randomArray = [];
  const usedIndices = new Set();

  while (randomArray.length < size) {
    const randomIndex = Math.floor(Math.random() * limit);
    
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      randomArray.push(randomIndex);
    }
  }

  return randomArray;
}; 

 const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [post, setPost] = useState([]);
  const [error, setError] = useState(false);


  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      setFeed(searchText);
    }
  } 
  const setFeed = async (text) => {
    setError(false);
    text = text.trim();
    if(text === ""){
      //  alert("Enter a tag or username");
      const response = await fetch('/api/snippet');
      const data = await response.json();

      setPost(data.slice(0,10));
    }
    else {
    const fetchPost = async () => {
      const txtVal = text.charAt(0) === '#' ? text.substring(1) : text;
      const response = await fetch(`/api/snippet/searchResults/${txtVal}`);

      if(response.ok) {
        const data = await response.json();
        console.log(data)
        setPost(data);
      }
      else {
        setPost([]);
        setError(true);
      }
    }
    
    fetchPost();
  }
  }

  const handleTagClick = async (value) => {
    value = value.substring(1);
    setSearchText('#'+value);
    console.log(value);
        const response = await fetch(`/api/snippet/searchResults/${value}`);
        if(response.ok) {
          const data = await response.json();
          // console.log(data)
          setPost(data);
          // console.log(post)
      }
}

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/snippet');
      const data = await response.json();

      if (data.length > 0) {
        const tempArray = createUniqueRandomisedFeed(data.length);
        const filteredData = tempArray.map(index => data[index]);

        setPost(filteredData);
      }
    }
    fetchPost();
  },[])
  

  
  return (
      <section className="feed">
        <form action="" className="relative w-full gap-4 flex-center">
          <input type="text" name="" id=""
                 placeholder="Search for a tag or a username" 
                 value={searchText}
                 onChange={handleSearchText}
                 onKeyDown={handleKeyDown}
                 required
                 className="search_input peer"/>
          <CiSearch size={30} 
          onClick={() => {setFeed(searchText)}}
          className="pb-1 border-b-4 rounded-b-md border-primary-orange"/>
        </form>
        {error && <div className="text-lg text-center text-gray-600"><img src="/assets/images/not-found.gif"/> No results found</div>}
       
        <SnippetCardList
        data={post}
        handleTagClick = {handleTagClick}></SnippetCardList>

         <div className="flex items-center justify-center gap-2 px-4 py-1 mb-10 font-semibold text-white rounded-full cursor-pointer bg-primary-orange"
             onClick={() => location.reload()}>
          Load more
          <IoReload size={20}/>

        </div>

      </section>

  )
}
export default Feed