"use client";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

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
    <section
      id="resume"
      className="min-h-screen w-full bg-primary/5 py-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          className="text-center space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeInUp}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            My <span className="text-primary">Resume</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A snapshot of my journey, skills, and milestones.
          </p>
        </motion.div>

        {/* Summary */}
        <motion.div
          custom={1}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <h2 className="section-heading">Professional Summary</h2>
          <p className="leading-relaxed text-muted-foreground">
            {resumeData.summary}
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          custom={2}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 text-center">
          {Object.entries(resumeData.contact).map(([label, value]) => (
            <div
              key={label}
              className="p-4 rounded-lg bg-background/50 border border-border">
              <h3 className="font-semibold capitalize">{label}</h3>
              <p className="text-muted-foreground">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Skills + Languages */}
        <motion.div
          custom={3}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="section-heading">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.technical.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
            <h2 className="section-heading mt-6">Design Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.design.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-heading">Languages</h2>
            <ul className="space-y-1">
              {resumeData.languages.map((lang) => (
                <li
                  key={lang.name}
                  className="flex justify-between border-b border-border/50 pb-1">
                  <span>{lang.name}</span>
                  <span className="text-muted-foreground">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          custom={4}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <h2 className="section-heading">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((job, i) => (
              <motion.div
                key={i}
                className="resume-card"
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}>
                <h3 className="font-bold text-lg">{job.role}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.company} • {job.period}
                </p>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-muted-foreground text-sm">
                  {job.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          custom={5}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <h2 className="section-heading">Education</h2>
          {resumeData.education.map((edu, i) => (
            <div key={i} className="resume-card">
              <h3 className="font-bold">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground">
                {edu.school} • {edu.period}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          custom={6}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <h2 className="section-heading">Certifications</h2>
          {resumeData.certifications.map((cert, i) => (
            <div key={i} className="resume-card">
              <h3 className="font-bold">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">
                {cert.issuer} • {cert.year}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Download */}
        <motion.div
          custom={7}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-8">
          <Button
            onClick={() => window.open("/resume.pdf", "_blank")}
            className="font-bold px-10">
            Download Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
