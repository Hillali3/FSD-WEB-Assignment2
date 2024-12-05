import mongoose, { Document, Schema } from 'mongoose';

// Define the Post interface
export interface Post extends Document {
  title: string;
  content: string;
}

// Define the Post schema
const postSchema: Schema = new Schema({
  title: { 
    type: String,
    required: true 
  },
  content: { 
    type: String,
    required: true 
  },
});

// Create and export the Post model
const Post = mongoose.model<Post>('Post', postSchema);
export default Post;