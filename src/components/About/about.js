import "./about.css";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollIntoView from "react-scroll-into-view";
import { FaChevronDown } from "react-icons/fa";
import profile from "../../assets/profile.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { links } from "../../assets/links";
export const About = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toLoop = ["Student", "Web/App Developer", "Cloud Enthusiast"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const timePeriod = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toLoop.length; //i= index of toLoop strings looping
    let fullText = toLoop[i]; //string to write now
    let updatedtext = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedtext);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedtext === fullText) {
      setIsDeleting(true);
      setDelta(timePeriod);
    } else if (isDeleting && updatedtext === "") {
      setIsDeleting(false);
      setLoopNum((prev) => prev + 1);
      setDelta(120);
    }
  };
  return (
    <section className="about" id="home">
      <Container>
        <Row className="align-items-center">
          {/*Main About section on left*/}
          <Col xs={12} md={6} xl={7} className="about-text">
            <span className="tagline">Welcome to my Portfolio</span>
            <h1>
              {`<h1>Hi! I am Soumyajeet,`}
              <span className="wrap">A {text}</span>
              {`</h1>`}
            </h1>
            <p>
              Welcome to my portfolio. I am an aspiring Web/App developer and
              learning Cloud Architecture and IaC. I am currently studying in
              3rd year at the prestigious Tohoku University in Sendai. If you
              are a tech enthusiast like me let's connect on LinkedIn.{" "}
            </p>
            <a href={links.linkedin}>
              <button>
                <span>Connect</span>
              </button>
            </a>
          </Col>
          {/*Portfolio Image on right*/}
          <Col xs={12} md={6} xl={5} className="about-pic">
            <img src={profile} alt="profile" className="profile-pic" />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <ScrollIntoView selector="#skills" className="click-text">
            <p>Click to learn more!</p>
            <FaChevronDown className="scroll-down-icon" />
          </ScrollIntoView>
        </Row>
      </Container>
    </section>
  );
};
