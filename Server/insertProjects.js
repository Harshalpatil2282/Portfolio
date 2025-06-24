const mongoose = require("mongoose");
const Project = require("./models/Project");

mongoose.connect("mongodb://localhost:27017/portfolioDB");

const sampleProjects = [
  {
    title: "SkillShare Lite",
    description: "Micro-learning MERN platform with subscriptions and JWT auth.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://skillshare-lite.vercel.app",
    github: "https://github.com/harshal/skillshare-lite",
    image: "https://via.placeholder.com/400x250"
  },
  {
    title: "AI Resume Builder",
    description: "Java-based intelligent resume builder using OOP + Swing + Spring Boot.",
    techStack: ["Java", "Spring Boot", "Swing"],
    link: "",
    github: "https://github.com/harshal/ai-resume-builder",
    image: "https://via.placeholder.com/400x250"
  }
];

Project.insertMany(sampleProjects).then(() => {
  console.log("Data inserted!");
  mongoose.disconnect();
});
