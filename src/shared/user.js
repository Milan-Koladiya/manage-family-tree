export const getLoginUser = () => {
    const token = localStorage.getItem("token")
    return token
}