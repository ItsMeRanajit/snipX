import mongoose, {Schema, model, models} from "mongoose";

const SnippetSchema = new Schema ({
    creator : {
        type : Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [25, 'Title cannot be more than 25 characters']
    },
    snippet_code : {
        type : String,
        required  :[ true, 'Title is required']
    },
    tag: {
        type: [String], 
        required: [true, 'At least one tag is required'],
    },
    vsCode : {
        type : String,
        required : false
    },
    atom : {
        type : String,
        required : false

    },
    sublimeText : {
        type : String,
        required : false

    }
})
const snippet = models.snippet || model("snippet",SnippetSchema);

export default snippet;