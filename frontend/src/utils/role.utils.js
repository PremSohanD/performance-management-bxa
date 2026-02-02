export const hasAnyRole = (user, allowedRoles = []) => {
  if (!user || !user.role) return false;
  return allowedRoles.includes(user.role);
};
