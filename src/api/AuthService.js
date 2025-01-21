import { supabase } from './Supabase';

/**
 * Inscription d'un utilisateur.
 * - Crée un compte Supabase Auth (email, password).
 * - Ajoute une ligne dans la table `users` avec le même `id`.
 */
export const signUp = async (email, password, name) => {
  // Création de l'utilisateur dans Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
    email, 
    password 
  });
  if (signUpError) {
    throw new Error(signUpError.message);
  }

  if (!signUpData?.user) {
    throw new Error('Aucun utilisateur renvoyé après signUp.');
  }

  const { user } = signUpData;

  // Insertion dans la table `users`
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: user.id,      // UID généré par Supabase Auth
        email: user.email,
        name: name,       // Variable "name" reçue en paramètre
      },
    ]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return user;
};

/**
 * Connexion d'un utilisateur.
 * - Authentifie un utilisateur avec ses identifiants.
 */
export const login = async (email, password) => {
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
  if (loginError) {
    throw new Error(loginError.message);
  }

  // loginData.user contient l'utilisateur, loginData.session contient la session
  return loginData.user;
};

/**
 * Déconnexion d'un utilisateur.
 */
export const logout = async () => {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) {
    throw new Error(logoutError.message);
  }
};

/**
 * Mise à jour de l'adresse e-mail.
 * - Modifie l'adresse e-mail dans Auth.
 * - Met à jour la table `users` pour avoir une cohérence.
 */
export const updateEmail = async (newEmail) => {
  // Mise à jour dans Auth
  const { data: updateAuthData, error: updateAuthError } = await supabase.auth.updateUser({
    email: newEmail,
  });
  if (updateAuthError) {
    throw new Error(updateAuthError.message);
  }

  // DEBUG : Log la réponse
  // console.log('updateAuthData:', updateAuthData);

  // Récupère le user depuis Auth
  const { data: currentUserData, error: currentUserError } = await supabase.auth.getUser();
  if (currentUserError) {
    throw new Error(currentUserError.message);
  }
  // console.log('currentUserData après update:', currentUserData);

  // Mise à jour de la table `users`
  const { error: updateDbError } = await supabase
    .from('users')
    .update({ email: newEmail })
    .eq('id', currentUserData.user.id);

  if (updateDbError) {
    throw new Error(updateDbError.message);
  }
};


/**
 * Mise à jour du mot de passe dans Auth.
 * - Supabase ne stocke pas le mot de passe en clair, seul Auth est concerné.
 */
export const updatePassword = async (newPassword) => {
  const { data: updateAuthData, error: updateAuthError } = await supabase.auth.updateUser({ password: newPassword });
  if (updateAuthError) {
    throw new Error(updateAuthError.message);
  }
};

/**
 * Récupération des informations utilisateur dans Auth.
 * - Permet de récupérer l'UID et l'email côté Auth.
 */
export const getUserDetails = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    throw new Error(userError.message);
  }
  return userData.user; // Renvoie l'objet user qui contient { id, email, ... }
};
