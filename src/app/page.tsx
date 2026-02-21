import AboutMe from "@/components/Home/AboutMe/AboutMe";
import Contact from "@/components/Home/Contact/Contact";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import Projects from "@/components/Home/Projects/Projects";
import Skills from "@/components/Home/Skills/Skills";

export default function HomePAge() {
  return (
    <div>
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
