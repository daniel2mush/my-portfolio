import AboutMe from "@/components/Home/AboutMe/AboutMe";
import Contact from "@/components/Home/Contact/Contact";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import Projects from "@/components/Home/Projects/Projects";
import Skills from "@/components/Home/Skills/Skills";
import Experience from "@/components/Home/Experience";

export default function HomePAge() {
  return (
    <div className={'max-w-500 mx-auto'}>
      <HeroSection />
      <AboutMe />
      <Skills />
        <Experience/>
      <Projects />
      <Contact />
    </div>
  );
}
