import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Auth = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
       const results = await signInWithPopup(auth, provider);                    //this is an async function, returns a promise
    //  console.log(results);                                                   But we need to store the user data in the local storage, we cannot store objects in local storage, so we need to convert it into a string
       const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePicture: results.user.photoURL,
            isAuth: true,
       };
        localStorage.setItem("auth", JSON.stringify(authInfo));                     //"auth" is the key, "authInfo" is the value, "JSON.stringify()" converts the object into a string
        navigate("/expense-tracker")                  
    }

    return (
        <div className="login-page">
            <p>Sign In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign In
            </button>
        </div>
    )
}