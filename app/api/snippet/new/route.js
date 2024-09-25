import {connectDB} from '@utils/database'
import snippet from '@models/snippet'
export const POST = async (req) => {
    const {userId, title, tag, snippet_code, vsCode, atom, sublimeText} = await req.json();

    try{
        await connectDB();
        const newSnippet = new snippet({
            creator : userId,
            title,
            snippet_code,
            tag,
            vsCode,
            atom,
            sublimeText
        })
        await newSnippet.save();
        return new Response(JSON.stringify(newSnippet),{
            status : 201
        })
    }catch(error){
        console.log(error)
        return new Response("Failed to create a new Snippet", {status : 500})
    }
}