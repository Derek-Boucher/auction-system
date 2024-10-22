import React, { createContext, useEffect, useState } from "react";

// Create UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État pour stocker l'utilisateur

  // Charger les informations depuis le localStorage si disponible
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Mettre à jour l'état avec l'utilisateur stocké
    }
  }, []);

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Supprimer l'utilisateur du localStorage
    localStorage.removeItem("token"); // Supprimer le token du localStorage
  };

  // Mettre à jour le localStorage chaque fois que l'état de l'utilisateur change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Stocker l'utilisateur dans le localStorage
    } else {
      localStorage.removeItem("user"); // Supprimer l'utilisateur s'il n'est pas connecté
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children} {/* Afficher les enfants du provider */}
    </UserContext.Provider>
  );
};
