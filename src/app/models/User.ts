import { model, Schema, Document, SchemaOptions } from "mongoose";
import bcrypt from "bcrypt";
import Validation from "../middlewares/Validation";
import LoggerBuilder from "../../logs/LoggerBuilder";
const jwt = require("jsonwebtoken");

export interface RegisterUser {
  name: IUser["name"];
  username: IUser["username"];
  email: IUser["email"];
  password: IUser["password"];
  whatsapp?: IUser["whatsapp"];
}

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password?: string;
  whatsapp?: string;
  role: "owner" | "admin" | "guest";
  createAccessToken(this: IUser): string;
  comparePassword(password: string): boolean;
  getCleanUser(this: IUser): IUser;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "O campo Nome é obrigatório."],
  },
  username: {
    type: String,
    required: [true, "O campo Usuário é obrigatório."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "O campo E-mail é obrigatório."],
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "guest",
  },
  whatsapp: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "O campo Senha é obrigatório."],
  },
});

/**
 * Executa antes de salvar no banco de dados.
 * Faz o hash da senha antes de salvar no banco de dados.
 */
UserSchema.pre("save", function (next) {
  //@ts-ignore
  const user: IUser = this;

  // Somente faz o hash se a senha for modificada
  if (!user.isModified("password")) return next();

  // Gera um salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // Gera uma nova senha usando o novo salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

/**
 * Adiciona o middleware de validação após a tentativa de salvar
 */
UserSchema.post("save", Validation.validate);

/**
 * Cria um novo token a partir do usuário.
 *
 * @param this: IUser
 * @returns jsonwebtoken string
 */
UserSchema.methods.createAccessToken = function (this: IUser): string {
  const secret = process.env.TOKEN_SECRET || "";
  if (!Boolean(secret))
    LoggerBuilder.WARNING(
      "NO TOKEN PROVIDED WITH ENV TOKEN_SECRET! USING BLANK!"
    );
  const token = jwt.sign(this.toJSON(), process.env.TOKEN_SECRET);
  return token;
};

/**
 * Recebe uma senha para comparar com o usuário.
 *
 * @param password Password to compare
 * @returns boolean
 */
UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getCleanUser = function (this: IUser): IUser {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default model<IUser>("User", UserSchema);
