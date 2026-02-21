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
    <section id="resume">
      <div>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeInUp}
        >
          <h1>
            My <span>Resume</span>
          </h1>
          <p>A snapshot of my journey, skills, and milestones.</p>
        </motion.div>

        {/* Summary */}
        <motion.div
          custom={1}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Professional Summary</h2>
          <p>{resumeData.summary}</p>
        </motion.div>

        {/* Contact */}
        <motion.div
          custom={2}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.entries(resumeData.contact).map(([label, value]) => (
            <div key={label}>
              <h3>{label}</h3>
              <p>{value}</p>
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
        >
          <div>
            <h2>Technical Skills</h2>
            <div>
              {resumeData.skills.technical.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <h2>Design Skills</h2>
            <div>
              {resumeData.skills.design.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <h2>Languages</h2>
            <ul>
              {resumeData.languages.map((lang) => (
                <li key={lang.name}>
                  <span>{lang.name}</span>
                  <span>{lang.level}</span>
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
          viewport={{ once: true }}
        >
          <h2>Experience</h2>
          <div>
            {resumeData.experience.map((job, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3>{job.role}</h3>
                <p>
                  {job.company} • {job.period}
                </p>
                <ul>
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
          viewport={{ once: true }}
        >
          <h2>Education</h2>
          {resumeData.education.map((edu, i) => (
            <div key={i}>
              <h3>{edu.degree}</h3>
              <p>
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
          viewport={{ once: true }}
        >
          <h2>Certifications</h2>
          {resumeData.certifications.map((cert, i) => (
            <div key={i}>
              <h3>{cert.title}</h3>
              <p>
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
        >
          <Button onClick={() => window.open("/resume.pdf", "_blank")}>
            Download Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
