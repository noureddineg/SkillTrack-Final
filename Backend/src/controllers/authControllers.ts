import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // 2. Vérifier le mot de passe (grâce à la méthode ajoutée dans User.ts)
    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // 3. Créer le Token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secret_par_defaut',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName, 
        lastName: user.lastName,   
        filiere: user.filiere
        }
    });
  } catch  (error: any) {
    console.log("ERREUR DETECTEE :", error); // Cela va écrire l'erreur précise dans ton terminal noir
    res.status(500).json({ message: error.message }); 
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Utilisateur déjà existant" });

    // Créer l'utilisateur (le mot de passe sera haché automatiquement grâce à User.ts)
    const user = new User({
      email,
      password_hash: password, 
      username,
      firstName,
      lastName,
      role: 'student'
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error: any) {
    console.log("ERREUR DETECTEE :", error); // Cela va écrire l'erreur précise dans ton terminal noir
    res.status(500).json({ message: error.message }); 
  }
};