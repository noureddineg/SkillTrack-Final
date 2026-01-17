// /src/models/core/user.model.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  id: string;
  matricule: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  isActive: boolean;
  isVerified: boolean;
  role: string;

  // Méthodes
  getFullName(): string;
  validatePassword(password: string): Promise<boolean>;
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    matricule: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: "/default-avatar.png",
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "admin", "alumni", "coordinator"],
    },
  },
  {
    timestamps: true,
    discriminatorKey: "role",
    collection: "users",
  },
);

// Index composés
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ createdAt: -1 });

// Méthodes d'instance
userSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.changePassword = async function (
  oldPassword: string,
  newPassword: string,
): Promise<boolean> {
  const isValid = await this.validatePassword(oldPassword);
  if (!isValid) return false;

  this.passwordHash = await bcrypt.hash(newPassword, 10);
  await this.save();
  return true;
};

// Pré-hook pour le hachage du mot de passe
userSchema.pre("save", async function (this: IUser) {
  if (!this.isModified("passwordHash")) return;

  if (this.passwordHash) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
