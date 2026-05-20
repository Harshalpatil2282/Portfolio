import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import './Hero.css';

const Hero = () => {
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    axios.get('/api/resume/link')
      .then(res => setResumeUrl(res.data.url || ''))
      .catch(() => setResumeUrl(''));
  }, []);

  return (
    <section id="hero" className="hero-container">
      <div className="hero-content">
        <h1>Hello, I'm <span className="highlight">Harshal Patil</span></h1>
        <h2>
          I'm a{' '}
          <span className="typewriter">
            <Typewriter
              words={['AI Full Stack Developer', 'ML Enthusiast', 'Creative Coder']}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>
        <p>I build engaging web apps using modern technologies. Let's build something amazing together!</p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">Hire Me</a>
          {resumeUrl ? (
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              Download Resume
            </a>
          ) : (
            <span className="btn-secondary btn-disabled">Resume Coming Soon</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
