export const useGetUserInfo = () => {
  const { name, profilePicture, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {}; // empty object needed because if there is no auth in local storage, it will return null and null.name will throw an error , deployment error
  return { name, profilePicture, userID, isAuth };
};
