import "./App.css";
import { NavBar } from "./components/Nav_Bar/NavBar";
import { About } from "./components/About/about";
import { Skills } from "./components/Skills/skills";
import { GoToTop } from "./components/GoToTop/GoToTop";
import { Projects } from "./components/Projects/projects";
import { ContactForm } from "./components/ContactForm/contact-form";

function App() {
  return (
    <div className="App">
      {/* //Navigation Bar */}
      <GoToTop />
      <NavBar />
      <About />
      <Skills />
      <Projects />
      <ContactForm />
    </div>
  );
}

export default App;
