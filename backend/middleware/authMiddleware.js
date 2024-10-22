import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization"); // Récupérer le header Authorization

  // Vérifier que le header existe et contient "Bearer"
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "You must be logged in to place a bid" });
  }

  try {
    // Extraire la partie après "Bearer "
    const actualToken = token.split(" ")[1];

    // Vérifier et décoder le token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // Stocker l'utilisateur dans req.user pour l'utiliser dans les routes protégées

    next(); // Continuer si le token est valide
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
