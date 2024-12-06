import { Request, Response } from 'express';
import User from '../models/user';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const {  username, name, email, password, birthDate } = req.body;

  if (!username || !name || !email || !password || !birthDate) {
    return res.status(400).json({ message: 'sername, name, email, password and birthDate are required' });
  }

  try {
    const newUser = new User({ username, name, email, password, birthDate });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get  all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
};