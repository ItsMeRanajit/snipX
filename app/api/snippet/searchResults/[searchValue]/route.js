import {connectDB} from '@utils/database'
import Snippet from '@models/snippet'
import User from '@models/user'

export const GET = async (req, { params }) => {

    try {
      await connectDB();
      const { searchValue } = params;
      const tagSearchValue = '#' + searchValue;
      console.log(tagSearchValue)
      
      const userFound = await User.find({ username: searchValue });
      const tagFound = await Snippet.findOne({ tag: { $in : tagSearchValue} });


      const snippetsByUser = userFound ? await Snippet.find({ creator: { $in: userFound.map(user => user._id) } }).populate('creator') : [];
      const snippetsByTag = tagFound ? await Snippet.find({ tag: { $in : tagSearchValue} }).populate('creator') : [];

    
      const resultSnippetSet = [...snippetsByTag, ...snippetsByUser];
      if (resultSnippetSet.length > 0) {
        return new Response(JSON.stringify(resultSnippetSet), { status: 200 });
      } else {
        return new Response(`No snippets found for value: ${searchValue}`, { status: 404 });
      }
    } catch (error) {
      console.log("error");
      return new Response("Failed to fetch snippets", { status: 500 });
    }
  };
  