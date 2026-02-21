import Contact from "@/components/appComponent/contact";
import Projects from "@/components/appComponent/projects";
import Skills from "@/components/appComponent/skils";
import AboutMe from "@/components/Home/AboutMe/AboutMe";
import HeroSection from "@/components/Home/HeroSection/HeroSection";

export default function HomePAge() {
  return (
    <div>
      <HeroSection />
      <AboutMe />
      {/* <AboutMe /> 
      <Skills />
      <Projects />
      <Contact /> */}
    </div>
  );
}
