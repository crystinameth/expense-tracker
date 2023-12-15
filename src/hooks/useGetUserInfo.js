export const useGetUserInfo = () => {
    const { name, profilePicture, userID, isAuth } = JSON.parse(
        localStorage.getItem("auth")
    );
    return { name, profilePicture, userID, isAuth };
};