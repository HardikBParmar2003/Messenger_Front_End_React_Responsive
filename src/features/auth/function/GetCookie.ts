export const getCookie = (name: string) => {
  const allCOokies = document.cookie.split(";");
  for (let cookie of allCOokies) {
    const [key, value] = cookie.split("=");
    if (key.trim() === name) return decodeURIComponent(value);
  }
  return null;
};
