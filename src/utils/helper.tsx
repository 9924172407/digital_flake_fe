export const clearStorage = () => localStorage.clear();
export const getJwtToken = () => localStorage.getItem("token")
export const setJwtToken = (token: string) => localStorage.setItem('token', token)

export const isLoggedIn = () => {
    if (getJwtToken()) return true;
}