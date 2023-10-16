import React from "react";
import "./styles.css";
import Input from "../Input";
import { useState } from "react";
import Button from "../Button";
import { auth, provider } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
function LoginComponent() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [isLoading, SetisLoading] = useState(false);
  const navigate=useNavigate()
  function logininusingemail() {
    SetisLoading(true)
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success('Logged in!')
          SetisLoading(false)
          navigate('/dashboard')
        })
        .catch((error) => {
          SetisLoading(false)
          const errorCode = error.code;
          if (errorCode === "auth/wrong-password") {
            toast.error("Wrong password, please try again!");
          } else if (errorCode === "auth/user-not-found") {
            toast.error(
              "No user found with these credentials, please try again!"
            );
          } 
          
          else {
            toast.error(
              "Some error occurred , check logs for more information!"
            );
          }
        });
    } else {
      toast.error("All fields are mandatory!");
    }
  }
  function googleauth() {
    SetisLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        googleauthdocumentcheckandcreate(user)
      })
      .catch((error) => {
        // Handle Errors here.
        toast.error('Could not login with google!')
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        SetisLoading(false)
      });
  }

 async function googleauthdocumentcheckandcreate(user){
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
     SetisLoading(false)
     toast.error('Account does not exist, please signup!')
    }
    else{
      SetisLoading(false)
      toast.success('Logged in!')
      navigate('/dashboard')
    }
  }
  return (
    <motion.div className="signup-wrapper" initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.3}}>
      <h2 className="title">
        Login on <span style={{ color: "var(--theme)" }}>Financer.</span>
      </h2>
      <form>
        <Input
          label={"Email"}
          state={email}
          setState={Setemail}
          placeholder={"Enter your email"}
          type={"email"}
        ></Input>
        <Input
          label={"Password"}
          state={password}
          setState={Setpassword}
          placeholder={"Enter your password"}
          type={"password"}
        ></Input>
        <Button
          text={
            isLoading ? (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              "Login using Email and Password"
            )
          }
          onClick={logininusingemail}
          disabled={isLoading}
        ></Button>
        <p style={{ textAlign: "center", margin: "0",color:'var(--black)' }}>or</p>
        <Button
          text={
            isLoading ? (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              "Signin using Google"
            )
          }
          blue={true}
          disabled={isLoading}
          onClick={googleauth}
        ></Button>
        <p className="p-login">
          Or Don't Have An Account ?{" "}
          <Link to="/signup" className="link" style={{color:'var(--theme)'}}>
            Click Here
          </Link>
        </p>
      </form>
    </motion.div>
  );
}

export default LoginComponent;
