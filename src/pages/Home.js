import React from "react";
import Header from "../components/Header";
import incomemodal from '../assets/incomemodal.jpg'
import linechart from '../assets/linechart.png'
import { motion } from "framer-motion";
import pie from '../assets/pie.png'
import homeimage from '../assets/18771522_6029519.svg'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { RWebShare } from "react-web-share";
import Footer from "../components/Footer";
function Home() {
  let navigate= useNavigate()
  const [user] = useAuthState(auth);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header></Header>
      <div className="home-container" style={{ flexGrow: "1",flexDirection:'row' }}>
        <motion.div className="left" initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5}}>
          <h1 className="headingh1">
            Simple way to{" "}
            <span style={{ color: "var(--theme)" }}>
              manage personal finances
            </span>
          </h1>
          <p style={{textAlign:'center'}}>
            Financer<span style={{ color: "var(--theme)" }}>.</span>allows you
            to track your expenses and various income sources with complete CRUD
            capabilities.View your sift through your data in different charts to
            gather insight.
          </p>
          <div className="homebtn-cont" style={{display:'flex',justifyContent:'center', gap:'1rem'}}>
             <button className="homebtn" onClick={()=>navigate(user? '/dashboard' : '/signup')}>Get started</button>
             <RWebShare
              data={{
                text: "Financer. made using React JS, React-Router and Firebase.",
                url: "",
                title: "Financer.",
              }}
              onClick={() => console.log("shared successfully!")}
              // onClick for the buttom
             >
              <button className="homebtn custombtn">Share</button>
             </RWebShare>
          
          </div>
        </motion.div>
        <motion.div className="right" initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5, delay:0.3}}>
          <motion.img 
          src={homeimage}
          initial={{ x:-10}}
          animate={{ x:10 }}
          transition={{
            // differrent properties for the animation type etc.
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
          className="home-img"
          ></motion.img>
        </motion.div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
