import AboutMe from "@/components/appComponent/aboutMe";
import Contact from "@/components/appComponent/contact";
import HeroSection from "@/components/appComponent/heroSection";
import Projects from "@/components/appComponent/projects";
import Skills from "@/components/appComponent/skils";

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
