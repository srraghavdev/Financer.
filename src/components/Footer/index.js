import React from "react";
import "./styles.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
function Footer() {
  return (
    <footer className="footer">
      <div className="div-footer">
        <div className="inner-div">
          {/* basic html footer , this component comes with its own responsive styling , icons from mui */}
          <p>
            Financer<span style={{ color: "var(--black)" }}>.</span>
          </p>
          <div className="logo-div">
            <a href="https://github.com/srraghavdev?tab=repositories">
            <GitHubIcon></GitHubIcon>
            </a>
            <a href="https://www.linkedin.com/in/shivansh-raghav-54567b233/">
            <LinkedInIcon></LinkedInIcon>
            </a>
            <a href="https://twitter.com/lucidobserver">
            <TwitterIcon></TwitterIcon>
            </a>
          </div>
        </div>

        <p className="footer-p">Made with ❤️ by Shivansh Raghav 😛</p>
      </div>
    </footer>
  );
}

export default Footer;
