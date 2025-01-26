import { supabase } from "./Supabase";
import { Alert } from "react-native";

/**
 * Inscrit un nouvel utilisateur.
 * Crée un compte Supabase Auth (email, mot de passe) et enregistre l'utilisateur dans la table `users`.
 * @param {string} email - Adresse e-mail de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 * @param {string} name - Nom de l'utilisateur.
 * @returns {Object} - Détails de l'utilisateur créé.
 * @throws {Error} - En cas d'erreur lors de l'inscription ou de l'insertion dans la base de données.
 */
export const signUp = async (email, password, name) => {
  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      const message = signUpError.message.includes("already registered")
        ? "This email is already registered."
        : signUpError.message;
      Alert.alert("Error", message);
      throw new Error(signUpError.message);
    }

    if (!signUpData?.user) {
      throw new Error("No user returned after sign-up.");
    }

    const { user } = signUpData;

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
        name: name,
      },
    ]);

    if (insertError) {
      Alert.alert("Error", insertError.message);
      throw new Error(insertError.message);
    }

    return user;
  } catch (error) {
    console.error("Sign-up error:", error.message);
    throw error;
  }
};

/**
 * Connecte un utilisateur existant.
 * Authentifie un utilisateur avec ses identifiants (e-mail et mot de passe).
 * @param {string} email - Adresse e-mail de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 * @returns {Object} - Détails de l'utilisateur connecté.
 * @throws {Error} - En cas d'erreur lors de l'authentification.
 */
export const login = async (email, password) => {
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (loginError) {
    throw new Error(loginError.message);
  }

  return loginData.user;
};

/**
 * Déconnecte un utilisateur.
 * Supprime le token de session actuel.
 * @throws {Error} - En cas d'échec de la déconnexion.
 */
export const logout = async () => {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) {
    throw new Error(logoutError.message);
  }
};

/**
 * Met à jour l'adresse e-mail d'un utilisateur.
 * Modifie l'adresse e-mail dans Auth et met à jour la table `users` pour conserver la cohérence.
 * @param {string} newEmail - Nouvelle adresse e-mail de l'utilisateur.
 * @throws {Error} - En cas d'échec de la mise à jour.
 */
export const updateEmail = async (newEmail) => {
  const { data: updateAuthData, error: updateAuthError } =
    await supabase.auth.updateUser({ email: newEmail });

  if (updateAuthError) {
    throw new Error(updateAuthError.message);
  }

  const { data: currentUserData, error: currentUserError } =
    await supabase.auth.getUser();

  if (currentUserError) {
    throw new Error(currentUserError.message);
  }

  const { error: updateDbError } = await supabase
    .from("users")
    .update({ email: newEmail })
    .eq("id", currentUserData.user.id);

  if (updateDbError) {
    throw new Error(updateDbError.message);
  }
};

/**
 * Met à jour le mot de passe d'un utilisateur.
 * Change le mot de passe dans Supabase Auth.
 * @param {string} newPassword - Nouveau mot de passe de l'utilisateur.
 * @throws {Error} - En cas d'échec de la mise à jour.
 */
export const updatePassword = async (newPassword) => {
  const { error: updateAuthError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateAuthError) {
    throw new Error(updateAuthError.message);
  }
};

/**
 * Récupère les informations d'un utilisateur connecté.
 * @returns {Object} - Détails de l'utilisateur, incluant `id`, `email`, et `name`.
 * @throws {Error} - En cas d'échec de la récupération.
 */
export const getUserDetails = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data: userDetails, error: detailsError } = await supabase
    .from("users")
    .select("name")
    .eq("id", userData.user.id)
    .single();

  if (detailsError) {
    throw new Error(detailsError.message);
  }

  return { ...userData.user, ...userDetails };
};
