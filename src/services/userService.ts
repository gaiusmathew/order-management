import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {
  async createUser(userData: IUser) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = new User({
      ...userData,
      password: hashedPassword,
    });

    return await user.save();
  }

  async loginUser(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
