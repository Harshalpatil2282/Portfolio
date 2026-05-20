import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = ({ setAuth }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // ── Resume Link ─────────────────────────────────────────────────────────────
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [resumeMsg, setResumeMsg] = useState(null);

  // ── Projects ─────────────────────────────────────────────────────────────────
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "", description: "", techStack: "", image: "", github: "", link: "",
  });

  // ── Skills ───────────────────────────────────────────────────────────────────
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // ── Messages ─────────────────────────────────────────────────────────────────
  const [messages, setMessages] = useState([]);

  // ── Fetch all data ────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchResumeLink();
    fetchProjects();
    fetchSkills();
    fetchMessages();
  }, []);

  const fetchResumeLink = async () => {
    try {
      const res = await axios.get("/api/resume/link");
      setResumeUrl(res.data.url || "");
      setResumeInput(res.data.url || "");
    } catch (e) { console.error(e); }
  };

  const fetchProjects = async () => {
    try { const res = await axios.get("/api/projects"); setProjects(res.data); }
    catch (e) { console.error(e); }
  };

  const fetchSkills = async () => {
    try { const res = await axios.get("/api/skills"); setSkills(res.data); }
    catch (e) { console.error(e); }
  };

  const fetchMessages = async () => {
    try { const res = await axios.get("/api/contact", config); setMessages(res.data); }
    catch (e) { console.error(e); }
  };

  // ── Resume handlers ────────────────────────────────────────────────────────
  const notify = (type, text) => {
    setResumeMsg({ type, text });
    setTimeout(() => setResumeMsg(null), 4000);
  };

  const handleSaveResumeLink = async (e) => {
    e.preventDefault();
    if (!resumeInput.trim()) return;
    try {
      const res = await axios.put("/api/resume/link", { url: resumeInput.trim() }, config);
      setResumeUrl(res.data.url);
      notify("success", "Resume link updated successfully!");
    } catch (err) {
      notify("error", err.response?.data?.error || "Failed to update link.");
    }
  };

  // ── Project handlers ────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/projects/edit/${editId}`, formData, config);
      } else {
        await axios.post("/api/projects/add", formData, config);
      }
      setFormData({ title: "", description: "", techStack: "", image: "", github: "", link: "" });
      setEditId(null);
      fetchProjects();
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Failed to save project"));
    }
  };

  const handleEditProject = (p) => {
    setFormData(p);
    setEditId(p._id);
    window.scrollTo({ top: document.getElementById("project-form")?.offsetTop - 80, behavior: "smooth" });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try { await axios.delete(`/api/projects/delete/${id}`, config); fetchProjects(); }
    catch (err) { alert("Error: " + (err.response?.data?.error || "Failed")); }
  };

  // ── Skill handlers ──────────────────────────────────────────────────────────
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    try {
      await axios.post("/api/skills/add", { name: skillInput.trim() }, config);
      setSkillInput("");
      fetchSkills();
    } catch (err) { alert("Error: " + (err.response?.data?.error || "Failed")); }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try { await axios.delete(`/api/skills/delete/${id}`, config); fetchSkills(); }
    catch (err) { alert("Error: " + (err.response?.data?.error || "Failed")); }
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="admin-page">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin <span className="cyan">Dashboard</span></h1>
          <p className="admin-subtitle">Manage your portfolio content</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* ── Resume Link ────────────────────────────────────────────────────── */}
      <section className="admin-card">
        <h2 className="section-title"><span className="section-icon">📄</span> Resume Link</h2>
        <p className="section-desc">
          Paste your Google Drive sharing link. Visitors will be redirected to view &amp; download your resume directly.
        </p>

        {resumeMsg && (
          <div className={`alert-msg ${resumeMsg.type}`}>{resumeMsg.text}</div>
        )}

        <form onSubmit={handleSaveResumeLink} className="resume-link-form">
          <input
            type="url"
            value={resumeInput}
            onChange={e => setResumeInput(e.target.value)}
            placeholder="https://drive.google.com/file/d/your-file-id/view?usp=sharing"
            required
            className="admin-input"
          />
          <button type="submit" className="btn-primary-admin">Save Link</button>
        </form>

        {resumeUrl && (
          <div className="current-link-preview">
            <span className="preview-label">Current link:</span>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="preview-link">
              {resumeUrl}
            </a>
          </div>
        )}
      </section>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section className="admin-card" id="project-form">
        <h2 className="section-title">
          <span className="section-icon">🚀</span>
          {editId ? "Edit Project" : "Add New Project"}
        </h2>

        <form className="admin-form" onSubmit={handleSubmitProject}>
          <div className="form-grid">
            <input className="admin-input" type="text" name="title" value={formData.title}
              placeholder="Project Title" onChange={handleChange} required />
            <input className="admin-input" type="text" name="techStack" value={formData.techStack}
              placeholder="Tech Stack (comma-separated)" onChange={handleChange} required />
          </div>
          <textarea className="admin-input admin-textarea" name="description" value={formData.description}
            placeholder="Description" onChange={handleChange} required rows={3} />
          <div className="form-grid">
            <input className="admin-input" type="url" name="image" value={formData.image}
              placeholder="Image URL" onChange={handleChange} />
            <input className="admin-input" type="url" name="github" value={formData.github}
              placeholder="GitHub URL" onChange={handleChange} />
            <input className="admin-input" type="url" name="link" value={formData.link}
              placeholder="Live Demo URL" onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary-admin">
              {editId ? "Update Project" : "Add Project"}
            </button>
            {editId && (
              <button type="button" className="btn-ghost" onClick={() => {
                setEditId(null);
                setFormData({ title: "", description: "", techStack: "", image: "", github: "", link: "" });
              }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {projects.length > 0 && (
          <>
            <div className="divider" />
            <h3 className="sub-heading">All Projects ({projects.length})</h3>
            <ul className="item-list">
              {projects.map(p => (
                <li key={p._id} className="item-row">
                  <span className="item-name">{p.title}</span>
                  <div className="item-actions">
                    <button className="btn-edit" onClick={() => handleEditProject(p)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteProject(p._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────────── */}
      <section className="admin-card">
        <h2 className="section-title"><span className="section-icon">🛠️</span> Skills</h2>
        <form onSubmit={handleAddSkill} className="skill-form">
          <input
            className="admin-input"
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            placeholder="Add a skill (e.g. React, Python)"
            required
          />
          <button type="submit" className="btn-primary-admin">Add</button>
        </form>
        <div className="skill-chips">
          {skills.map(skill => (
            <span key={skill._id} className="skill-chip">
              {skill.name}
              <button onClick={() => handleDeleteSkill(skill._id)} className="chip-delete" title="Remove">×</button>
            </span>
          ))}
        </div>
      </section>

      {/* ── Messages ────────────────────────────────────────────────────────── */}
      <section className="admin-card">
        <h2 className="section-title">
          <span className="section-icon">📨</span> Messages
          {messages.length > 0 && <span className="badge">{messages.length}</span>}
        </h2>
        {messages.length === 0 ? (
          <p className="empty-state">No messages yet.</p>
        ) : (
          <ul className="message-list">
            {messages.map(msg => (
              <li key={msg._id} className="message-item">
                <div className="msg-header">
                  <strong>{msg.name}</strong>
                  <a href={`mailto:${msg.email}`} className="msg-email">{msg.email}</a>
                </div>
                <p className="msg-body">{msg.message}</p>
                <p className="msg-time">{new Date(msg.createdAt).toLocaleString("en-IN", {
                  day: "2-digit", month: "short", year: "numeric",
                  hour: "2-digit", minute: "2-digit"
                })}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
};

export default Admin;
