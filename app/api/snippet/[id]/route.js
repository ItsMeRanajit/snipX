import {connectDB} from '@utils/database'
import snippet from '@models/snippet'

//get
export const GET = async (req, {params}) => {
    try{
        await connectDB();
        const snippets = await snippet.findById(params.id).populate('creator');
        if(!snippet) return new Response("Snippet not found", {status : 404})
        return new Response(JSON.stringify(snippets),{status : 200})
    }catch(error){
        return new Response("Failed to fetch all snippets",{status : 500})   
    }
}

//patch -- minor update
export const PATCH = async (req, {params}) => {
    const {snippet_code, title, tag, vsCode, atom, sublimeText} = await req.json();

    try{
        await connectDB();
        const existingSnippet = await snippet.findById(params.id);

        if(!existingSnippet) return new Response("Snippet not found", {status : 404});

        existingSnippet.title = title;
        existingSnippet.snippet_code = snippet_code;
        existingSnippet.tag= tag;
        existingSnippet.vsCode = vsCode;
        existingSnippet.atom = atom;
        existingSnippet.sublimeText = sublimeText;

        await existingSnippet.save();

        return new Response(JSON.stringify(existingSnippet), {status : 200})
    }catch(error){
        return new Response("Failed to update snippet", {status : 500});
    }
}

//delete

export const DELETE = async (req, {params}) => {
    try{
        await connectDB();
        await snippet.findByIdAndDelete(params.id);

        if (!deletedSnippet) {
          return new Response("Snippet not found", { status: 404 });
        }
    }catch(error){
        console.log(error);
        return new Response("Failed to delete snippet", {status : 500});
    }
}