import User from '../models/user.model';

export const getUserData = async (req, res) => req.user;
