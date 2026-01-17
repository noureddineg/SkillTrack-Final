import bcrypt from 'bcryptjs';
import mongoose, { Schema, type Document } from "mongoose";

// l'interface c'est juste pour typer dans typescript pour compilation (vérifie le code ) ,shema c'est pour runtime (vérifie les données)
export interface IUser extends Document {
  email: string;
  password_hash: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar_url?: string;
  role: "student" | "teacher" | "admin";
  is_active: boolean;
  email_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  profile_completed: boolean;
  onboarding_completed: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    avatar_url: String,
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    is_active: { type: Boolean, default: true },
    email_verified: { type: Boolean, default: false },
    lastLoginAt: Date,
    profile_completed: { type: Boolean, default: false }, // pour savoir si user a compléter l'insertion de toutes ses données personnelles
    onboarding_completed: { type: Boolean, default: false }, // le parcours de bienvenue
  },
  { timestamps: true }
);

// Middleware pour hacher le mot de passe avant la sauvegarde
// @ts-ignore
userSchema.pre('save', async function (this: any) {
  // On ne passe plus 'next' en paramètre pour une fonction async
  if (!this.isModified('password_hash')) {
    return; // On sort simplement de la fonction
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    // Pas de next() ici, la fin de la fonction async suffit
  } catch (error: any) {
    throw error; // On lance l'erreur pour qu'elle soit captée par le contrôleur
  }
});
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password_hash);
};
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
