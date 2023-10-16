import React, { useState } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Button, Drawer, Switch } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [theme, Settheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : false
  );
  console.log(JSON.parse(localStorage.getItem("theme")));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  function logoutfn() {
    alert("logged out!");
  }
  var r = document.querySelector(":root");
  var rs = getComputedStyle(r);
  console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [loading, user]);

  function logoutfn() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("Successfully Logged out !");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Error occurred in logging out!");
      });
  }
  function changetheme(checked) {
    if (!checked) {
      r.style.setProperty("--white", "#f3f3f5");
      r.style.setProperty("--black", "rgb(13, 19, 33)");
      r.style.setProperty(
        "--shadow",
        "0px 0px 30px 9px rgba(227, 227, 227, 0.75)"
      );
      localStorage.setItem("theme", "false");
    } else {
      r.style.setProperty("--white", "rgb(13, 19, 33)");
      r.style.setProperty("--black", "#f3f3f5");
      r.style.setProperty("--shadow", "0px 0px 30px 9px rgb(13, 19, 33)");
      localStorage.setItem("theme", "true");
    }
  }
  return (
    <navbar className="navbar">
      <p className="logo">
        {" "}
        Financer<span style={{ color: "var(--theme)" }}>.</span>
      </p>
      <div
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        className="navbardesk"
      >
        <Switch
          checkedChildren={"🌙"}
          unCheckedChildren={"☀️"}
          onChange={(checked) => {
            changetheme(checked);
          }}
          defaultChecked={
            rs.getPropertyValue("--white") == "#f3f3f5" ? false : true
          }
        />
        <Link to="/">
          <p className="logo linkheader">Home</p>
        </Link>
        {user && (
          <>
            <Link to="/dashboard">
              <p className="logo linkheader">Dashboard</p>
            </Link>
            <Link to="/income">
              <p className="logo linkheader">Income</p>
            </Link>
            <Link to="/expenses">
              <p className="logo linkheader">Expenses</p>
            </Link>
          </>
        )}
        {user && (
          <>
            <p className="logo linkheader" onClick={logoutfn}>
              Logout
            </p>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              ></img>
            ) : (
              <Avatar email={user.email} size="2rem" round={true}></Avatar>
            )}
          </>
        )}
        {!user && (
          <>
            <Link to="/signup">
              <p className="logo linkheader">Signup</p>
            </Link>
          </>
        )}
      </div>
      <div className="navbarmobile">
      <Button onClick={showDrawer}>
        <UnorderedListOutlined/>  
      </Button>
      
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose}
          open={open}
          width={'45vw'}
        >
           <Switch
          checkedChildren={"🌙"}
          unCheckedChildren={"☀️"}
          onChange={(checked) => {
            changetheme(checked);
          }}
          defaultChecked={
            rs.getPropertyValue("--white") == "#f3f3f5" ? false : true
          }
        />
        <Link to="/">
          <p className="logo linkheader">Home</p>
        </Link>
        {user && (
          <>
            <Link to="/dashboard">
              <p className="logo linkheader">Dashboard</p>
            </Link>
            <Link to="/income">
              <p className="logo linkheader">Income</p>
            </Link>
            <Link to="/expenses">
              <p className="logo linkheader">Expenses</p>
            </Link>
          </>
        )}
        {user && (
          <>
            <p className="logo linkheader" onClick={logoutfn}>
              Logout
            </p>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              ></img>
            ) : (
              <Avatar email={user.email} size="2rem" round={true}></Avatar>
            )}
          </>
        )}
        {!user && (
          <>
            <Link to="/signup">
              <p className="logo linkheader">Signup</p>
            </Link>
          </>
        )}
        </Drawer>
      </div>
    </navbar>
  );
}

export default Header;
