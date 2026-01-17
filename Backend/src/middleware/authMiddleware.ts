import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: any, res: Response, next: NextFunction) => {
    // 1. Vérifier si le token est présent dans les headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Accès non autorisé, token manquant" });
    }

    try {
        // 2. Vérifier si le token est valide
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        
        // 3. Ajouter l'utilisateur à la requête pour que les routes puissent l'utiliser
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalide ou expiré" });
    }
};

// Middleware pour restreindre par rôle
export const restrictTo = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Vous n'avez pas la permission d'accéder à cette ressource" });
        }
        next();
    };
};