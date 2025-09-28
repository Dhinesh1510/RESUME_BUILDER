import React, { useState } from "react";

export default function DynamicResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "", details: "" }],
    skills: [""],
    achievements: [""],
  });

  const handlePersonalInfoChange = (field, value) =>
    setFormData((prev) => ({
      ...prev,
      [field.includes(".") ? field.split(".")[0] : "personalInfo"]: prev.personalInfo,
    }));

  // (Simpler handlers for this example)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSimpleItem = (section) =>
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], ""] }));

  const removeSimpleItem = (section, idx) =>
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx),
    }));

  const updateSimpleItem = (section, idx, value) =>
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((it, i) => (i === idx ? value : it)),
    }));

  // Put CSS into a string so the JSX parser won't try to read CSS braces
  const css = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #root { height: 100%; }
    body {
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      background: linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%);
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .container {
      max-width: 1200px;
      margin: 28px auto;
      padding: 20px;
    }

    .top-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }
    .title {
      font-size: 28px;
      font-weight: 800;
      color: #0f172a;
    }
    .subtitle {
      color: #475569;
      font-size: 14px;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    @media (min-width: 900px) {
      .layout {
        grid-template-columns: 1fr 1fr;
      }
    }

    .card {
      background: rgba(255,255,255,0.95);
      border-radius: 12px;
      padding: 18px;
      box-shadow: 0 8px 30px rgba(2,6,23,0.06);
      border: 1px solid rgba(15,23,42,0.03);
    }

    .form-grid {
      display: grid;
      gap: 12px;
    }

    label {
      display: block;
      font-size: 13px;
      color: #334155;
      margin-bottom: 6px;
      font-weight: 600;
    }
    input[type="text"], input[type="email"], input[type="tel"], textarea {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #e6eef8;
      background: #fff;
      font-size: 14px;
      color: #0f172a;
      transition: box-shadow .15s ease, border-color .15s ease;
    }
    input:focus, textarea:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 6px 20px rgba(99,102,241,0.08);
    }
    .row {
      display: flex;
      gap: 12px;
    }
    .row > * { flex: 1; }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(90deg,#6366f1,#4f46e5);
      color: #fff;
      padding: 10px 14px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      font-weight: 700;
      box-shadow: 0 8px 20px rgba(79,70,229,0.12);
    }

    /* resume preview */
    #resume-preview {
      background: #ffffff;
      border-radius: 10px;
      padding: 22px;
      color: #0f172a;
      height: 100%;
    }
    #resume-preview .header {
      background: linear-gradient(90deg,#6366f1,#4f46e5);
      color: #fff;
      padding: 18px;
      border-radius: 8px;
      margin-bottom: 14px;
    }
    #resume-preview h1 {
      font-size: 20px;
      margin-bottom: 4px;
    }
    #resume-preview p.meta {
      font-size: 13px;
      opacity: 0.9;
    }
    .section {
      margin-bottom: 14px;
    }
    .section h3 {
      font-size: 14px;
      color: #0f172a;
      margin-bottom: 8px;
      border-left: 4px solid #4f46e5;
      padding-left: 8px;
      font-weight: 700;
    }
    .badge {
      display: inline-block;
      background: #eef2ff;
      color: #1e40af;
      padding: 6px 10px;
      border-radius: 999px;
      margin: 4px 6px 4px 0;
      font-size: 13px;
    }

    ul { padding-left: 18px; color: #334155; }
    li { margin-bottom: 6px; font-size: 14px; }

    /* small helpers */
    .muted { color: #6b7280; font-size: 13px; }
    .flex-between { display:flex; justify-content:space-between; align-items:center; gap:12px; }

    /* print */
    @media print {
      body { background: #fff; }
      .container > * { box-shadow:none !important; }
      .btn, .no-print { display: none !important; }
    }
  `;

  return (
    <div className="container">
      {/* inject CSS safely */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="top-header">
        <div>
          <div className="title">Dynamic Resume Builder</div>
          <div className="subtitle">Create a professional resume instantly</div>
        </div>
        <div>
          <button
            className="btn no-print"
            onClick={() => window.print()}
            title="Print / Save as PDF"
          >
            📄 Print / Save
          </button>
        </div>
      </div>

      <div className="layout">
        {/* Form */}
        <div className="card">
          <div className="form-grid">
            <div className="row">
              <div>
                <label>Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div>
                <label>Professional Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Senior Software Engineer"
                  type="text"
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                />
              </div>
            </div>

            <div>
              <label>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, State"
                type="text"
              />
            </div>

            <div>
              <label>Professional Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="4"
                placeholder="Short description of your experience and goals..."
              />
              <div className="muted">{(formData.summary || "").length}/500 characters</div>
            </div>

            <div className="flex-between" style={{ marginTop: 8 }}>
              <div className="muted">Skills</div>
              <div>
                <button
                  className="btn no-print"
                  onClick={() => addSimpleItem("skills")}
                  type="button"
                >
                  ➕ Add
                </button>
              </div>
            </div>

            {/* simple skills inputs */}
            <div>
              {formData.skills.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    placeholder="Skill"
                    value={s}
                    onChange={(e) => updateSimpleItem("skills", i, e.target.value)}
                    type="text"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      className="btn no-print"
                      style={{ background: "#ef4444" }}
                      onClick={() => removeSimpleItem("skills", i)}
                      type="button"
                    >
                      🗑
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex-between" style={{ marginTop: 6 }}>
              <div className="muted">Achievements</div>
              <div>
                <button
                  className="btn no-print"
                  onClick={() => addSimpleItem("achievements")}
                  type="button"
                >
                  ➕ Add
                </button>
              </div>
            </div>

            <div>
              {formData.achievements.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    placeholder="Achievement"
                    value={a}
                    onChange={(e) => updateSimpleItem("achievements", i, e.target.value)}
                    type="text"
                  />
                  {formData.achievements.length > 1 && (
                    <button
                      className="btn no-print"
                      style={{ background: "#ef4444" }}
                      onClick={() => removeSimpleItem("achievements", i)}
                      type="button"
                    >
                      🗑
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card" id="resume-preview">
          <div className="header">
            <h1>{formData.name || "Your Name"}</h1>
            <div className="muted">
              {formData.title || "Professional Title"} • {formData.email || "email@example.com"} •{" "}
              {formData.phone || "123-456-7890"}
            </div>
          </div>

          {formData.summary && (
            <div className="section">
              <h3>Professional Summary</h3>
              <p style={{ color: "#334155" }}>{formData.summary}</p>
            </div>
          )}

          {formData.skills.some((s) => s.trim()) && (
            <div className="section">
              <h3>Skills</h3>
              <div>
                {formData.skills
                  .filter((s) => s.trim())
                  .map((s, i) => (
                    <span key={i} className="badge">
                      {s}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {formData.achievements.some((a) => a.trim()) && (
            <div className="section">
              <h3>Achievements</h3>
              <ul>
                {formData.achievements
                  .filter((a) => a.trim())
                  .map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
