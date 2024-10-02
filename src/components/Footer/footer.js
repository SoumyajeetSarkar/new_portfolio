import "./footer.css";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsTwitch,
} from "react-icons/bs";
import { FaHeart, FaReact } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Container, Nav } from "react-bootstrap";
import { links } from "../../assets/links";
export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <h2>Thanks for visiting!</h2>
        </Row>
        <Row className="align-items-center">
          <span className="socials">
            <Nav>
              <Nav.Link
                href="https://github.com/SoumyajeetSarkar"
                className="socialIcon"
              >
                <BsGithub />
              </Nav.Link>
              <Nav.Link
                href="https://www.instagram.com/mr_whytt_/"
                className="socialIcon"
              >
                <BsInstagram />
              </Nav.Link>
              <Nav.Link href={links.linkedin} className="socialIcon">
                <BsLinkedin />
              </Nav.Link>
              <Nav.Link
                href="https://twitter.com/SoumyajeetSark4"
                className="socialIcon"
              >
                <BsTwitter />
              </Nav.Link>
              <Nav.Link
                href="https://www.twitch.tv/heisenbrgwhite"
                className="socialIcon"
              >
                <BsTwitch />
              </Nav.Link>
            </Nav>
          </span>
        </Row>
        <Row className="align-items-center">
          <h3 className="endNote">
            Made with <FaHeart color="red" /> and <FaReact color="blue" />{" "}
            React.Js by Soumyajeet Sarkar
          </h3>
        </Row>
      </Container>
    </footer>
  );
};
