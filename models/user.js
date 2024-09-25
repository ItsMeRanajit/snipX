import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        unique : [true, 'Email already exists!'],
        required : [true, 'Email is required!']
    },
    username:{
        type : String,
        required : [true, 'Username is required'],
        match: [  /^[a-zA-Z0-9]{8,20}$/, "Username invalid, it should contain 3-30 alphanumeric letters or spaces and be unique!"]
        // theres a regular expression which should match for every username, otherwise the msg will be displayed
  },
  image :{
    type: String,
  }
});

const User = models.User || model("User",userSchema);
export default User;