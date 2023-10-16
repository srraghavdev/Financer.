import React from "react";
import "./styles.css";
import Input from "../Input";
import { useState } from "react";
import Button from "../Button";
import { auth, provider } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
function SignupSignin() {
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const [isLoading, SetisLoading] = useState(false);
  const navigate=useNavigate()
  async function signupwithemail() {
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (!email.includes("@")) {
        toast.error("Email format is wrong!");
        return;
      }
      if (password.length < 6) {
        toast.error("Password length cannot be less than six characters!");
        return;
      }
      if (password != confirmPassword) {
        toast.error("Password and Confrim Password are not the same!");
        return;
      }
      SetisLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          createUserDocument(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          // extracting error code to basic error validations
          // sending out error toasts for some fixed errors and one fallbakc error toast
          SetisLoading(false);
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Email already exists , please use another email!");
          } else {
            toast.error("Some error occurred in signing you up!");
          }
        });
    } else {
      toast.error("All fields are mandatory");
      return;
    }
  }

  async function createUserDocument(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, photoURL } = user;
      const createdAt = new Date();
      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email: user.email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("User Created!");
        SetconfirmPassword("");
        Setemail("");
        Setname("");
        Setpassword("");
        SetisLoading(false);
        navigate('/dashboard')
      } catch (error) {
        SetisLoading(false);
        toast.error(error.message);
        console.error("Error creating user document: ", error);
      }
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
      const { displayName, photoURL } = user;
      const createdAt = new Date();
      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email: user.email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("User Created!");
        SetconfirmPassword("");
        Setemail("");
        Setpassword("");
        SetisLoading(false);
        navigate('/dashboard')
      } catch (error) {
        SetisLoading(false);
        toast.error(error.message);
        console.error("Error creating user document: ", error);
      }
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
        Sign up on <span style={{ color: "var(--theme)" }}>Financer.</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={Setname}
          placeholder={"Enter your name"}
          type={"text"}
        ></Input>
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
        <Input
          label={"Confrim Password"}
          state={confirmPassword}
          setState={SetconfirmPassword}
          placeholder={"Enter your confirmed password"}
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
              "Signup using Email and Password"
            )
          }
          onClick={signupwithemail}
          disabled={isLoading}
        ></Button>
        <p style={{ textAlign: "center", margin: "0" ,color:'var(--black)'}}>or</p>
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
              "Signup using Google"
            )
          }
          blue={true}
          disabled={isLoading}
          onClick={googleauth}
        ></Button>
        <p className="p-login">
          Or Have An Account Already ?{" "}
          <Link to="/login" className="link" style={{color:'var(--theme)'}}>
            Click Here
          </Link>
        </p>
      </form>
    </motion.div>
  );
}

export default SignupSignin;
