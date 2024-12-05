import express, { Request, Response } from 'express';
import postRoutes from './routes/posts_route';
import commentRoutes from './routes/comment_route';
import connectDB from './config/db';

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request body
app.use(express.json());

// Register routes
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Sample GET route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Post and Comment API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});