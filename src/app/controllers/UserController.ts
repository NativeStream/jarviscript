import UserNotFoundError from "../errors/UserNotFoundError";
import User, { RegisterUser, IUser } from "../models/User";

export default class UserController {
  public static async register(registerUser: RegisterUser): Promise<IUser> {
    const user = new User(registerUser);
    await user.save();
    return user.getCleanUser();
  }

  public static async getUserFromWhatsapp(number: string): Promise<IUser> {
    const user = await User.findOne({ whatsapp: number });
    if (!user) throw new UserNotFoundError();
    return user.getCleanUser();
  }

  public static getWhatsappAnonymousGuestUser(whatsapp: string): IUser {
    const user = new User({ whatsapp });
    return user;
  }
}
