import mongoose, { Document, Schema } from 'mongoose';

// Define the Comment interface
export interface Comment extends Document {
  postId: mongoose.Schema.Types.ObjectId;
  text: string;
}

// Define the Comment schema
const commentSchema: Schema = new Schema({
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post',
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
});

// Create and export the Comment model
const Comment = mongoose.model<Comment>('Comment', commentSchema);
export default Comment;
