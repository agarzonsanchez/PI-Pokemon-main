import React from "react";
import "./MainPage.css";
import { SiPokemon } from "react-icons/si";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { GrTwitter } from "react-icons/gr";
import { Link } from "react-router-dom";

const welcome = (
  <>
    WELCOME TO THE MOST <br /> EXCITING UNIVERSE WHERE <br /> EVERYTHING COMES
    TRUE <br /> <SiPokemon className="logoSt" />
  </>
);
const MainPage = (props) => {
  return (
    <div data-testid="mainPage1">
      <h1 className="welcome" data-testid="main">
        {welcome} <br />
      </h1>

      <button className="container">
        <Link to={"/home"} className="textD">
          Press Start
        </Link>
      </button>

      <footer>
        <div>
          <ul className="footerS">
            <li className="social">
              <a href="https://github.com/agarzonsanchez" target="blank">
                <AiFillGithub className="socialCl" />
              </a>
            </li>
            <li className="social">
              <a
                href="https://linkedin.com/in/andrés-fabián-garzón-sánchez-3b614611b"
                target="blank"
              >
                <AiFillLinkedin className="socialCl" />
              </a>
            </li>

            <li className="social">
              <a href="https://www.twitter.com/AndresGSan" target="blank">
                <GrTwitter className="socialCl" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
