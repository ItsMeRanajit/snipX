import {connectDB} from '@utils/database'
import snippet from '@models/snippet'

export const GET = async (req) => {
    try{
        await connectDB();
        const snippets = await snippet.find({}).populate('creator');
        return new Response(JSON.stringify(snippets),{status : 200})
    }catch(error){
        return new Response("Failed to fetch all snippets",{status : 500})
        
    }
}