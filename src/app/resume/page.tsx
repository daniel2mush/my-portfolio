"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const resumeData = {
  name: "Daniel Freeman",
  title: "Full-Stack Developer | UI/UX Designer | Graphic Designer",
  contact: {
    email: "Daniel2mush@gmail.com",
    phone: "+223 71 90 70 48",
    location: "Bamako, Mali",
  },
  summary:
    "Dynamic and versatile Full-Stack Developer with expertise in modern web technologies and a strong background in UI/UX and graphic design. Proficient in building responsive applications, creating intuitive user experiences, and delivering high-quality visual designs for digital and print media. Proven ability to collaborate on projects from concept to execution, blending technical skills with creative problem-solving to drive impactful results.",
  skills: {
    technical: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
    ],
    design: [
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "InDesign",
      "After Effects",
      "Book Design",
      "Magazine Design",
      "Advertising",
      "Printing",
    ],
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "French", level: "Fluent" },
  ],
  experience: [
    {
      role: "Full-Stack Developer & Designer",
      company: "Freelance / Personal Projects",
      period: "2021 - Present",
      details: [
        "Developed responsive web applications using React, Next.js, and Tailwind CSS, ensuring seamless performance across devices.",
        "Designed intuitive UI/UX flows and interactive prototypes in Figma and Adobe XD to enhance user engagement and satisfaction.",
        "Created compelling graphics, book layouts, and magazine designs with InDesign, Photoshop, and Illustrator, meeting diverse client needs.",
        "Partnered with advertising agencies to conceptualize and execute print and digital campaigns, delivering polished, brand-aligned materials.",
      ],
    },
    {
      role: "Graphic Designer & Print Specialist",
      company: "Senior Graphic Designer at PactAfrique",
      period: "2020 - Present",
      details: [
        "Designed engaging magazine layouts, posters, flyers, and promotional materials, optimizing for visual impact and audience appeal.",
        "Prepared and managed print-ready files for publications and campaigns, ensuring high-quality output and adherence to production standards.",
        "Collaborated closely with clients to understand requirements and deliver customized visual branding solutions that aligned with business goals.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Pact Afrique",
      period: "2020 - Present",
      details: [
        "Built reusable React components to streamline development processes and improve code maintainability.",
        "Optimized web page performance and accessibility, implementing best practices to enhance user experience and compliance with standards.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor's in Computer Science",
      school: "University of Mali",
      period: "2017 - 2021",
    },
  ],
  certifications: [
    {
      title: "Full-Stack Web Development Certification",
      issuer: "FreeCodeCamp",
      year: "2021",
    },
    {
      title: "Adobe Creative Suite Masterclass",
      issuer: "Udemy",
      year: "2020",
    },
  ],
};

export default function ResumeSection() {
  return (
    <motion.div
      id="resume"
      className="min-h-screen w-full bg-primary/5 py-20 px-5 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            My <span className="text-primary">Resume</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            A snapshot of my experience, skills, and education.
          </p>
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
          <p className="text-sm md:text-base leading-relaxed">
            {resumeData.summary}
          </p>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h2 className="font-bold">Email</h2>
            <p>{resumeData.contact.email}</p>
          </div>
          <div>
            <h2 className="font-bold">Phone</h2>
            <p>{resumeData.contact.phone}</p>
          </div>
          <div>
            <h2 className="font-bold">Location</h2>
            <p>{resumeData.contact.location}</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.technical.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Design Skills</h3>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.design.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Languages</h2>
          <ul className="list-disc ml-5 space-y-2">
            {resumeData.languages.map((lang, i) => (
              <li key={i}>
                <span className="font-semibold">{lang.name}</span> —{" "}
                <span className="text-muted-foreground">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((job) => (
              <div key={job.role}>
                <h3 className="font-bold text-xl">{job.role}</h3>
                <p className="text-muted-foreground">
                  {job.company} • {job.period}
                </p>
                <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                  {job.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <div key={edu.degree}>
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-muted-foreground">
                  {edu.school} • {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Certifications</h2>
          <div className="space-y-4">
            {resumeData.certifications.map((cert, i) => (
              <div key={i}>
                <h3 className="font-bold">{cert.title}</h3>
                <p className="text-muted-foreground">
                  {cert.issuer} • {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            onClick={() => window.open("/resume.pdf", "_blank")}
            className="font-bold px-10">
            Download Resume
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
