import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const emptyService = { title: "", description: "" };
const emptyProject = { title: "", image: "", description: "" };
const emptyBlog = { title: "", summary: "" };

const splitToArray = (str) =>
  (str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export default function PortfolioFormPage() {
  const { template: templateParam, id } = useParams();
  const navigate = useNavigate();

  const API = useMemo(() => process.env.REACT_APP_API_URL, []);
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(!!isEdit);
  const [saving, setSaving] = useState(false);

  // Local string inputs for comma-separated fields
  const [skillsInput, setSkillsInput] = useState("");
  const [socialsInput, setSocialsInput] = useState("");

  const [formData, setFormData] = useState({
    template: templateParam || "A",
    // Hero
    name: "",
    title: "",
    tagline: "",
    profileImage: "",
    // About
    bio: "",
    email: "",
    phone: "",
    location: "",
    socials: [], // array on payload, but edited via socialsInput
    // Skills
    skills: [], // array on payload, but edited via skillsInput
    // Services (3 max)
    services: [ { ...emptyService }, { ...emptyService }, { ...emptyService } ],
    // Portfolio (3 max)
    portfolio: [ { ...emptyProject }, { ...emptyProject }, { ...emptyProject } ],
    // Testimonials (1–3)
    testimonials: [ "" ],
    // Blog (0–many, optional)
    blog: [ { ...emptyBlog } ],
    // Contact
    contact: { message: "", email: "", phone: "" },
  });

  // Fetch existing when editing
  useEffect(() => {
    let ignore = false;
    const fetchProfile = async () => {
      if (!isEdit) return;
      try {
        const res = await axios.get(`${API}/professionals/${id}`);
        if (ignore) return;

        const p = res.data || {};

        // Normalize arrays with defaults so UI is controlled
        const safeServices = Array.isArray(p.services) && p.services.length
          ? p.services
          : [ { ...emptyService }, { ...emptyService }, { ...emptyService } ];

        const safePortfolio = Array.isArray(p.portfolio) && p.portfolio.length
          ? p.portfolio
          : [ { ...emptyProject }, { ...emptyProject }, { ...emptyProject } ];

        const safeTestimonials = Array.isArray(p.testimonials) && p.testimonials.length
          ? p.testimonials.slice(0, 3)
          : [ "" ];

        const safeBlog = Array.isArray(p.blog) && p.blog.length
          ? p.blog
          : [ { ...emptyBlog } ];

        setFormData({
          template: p.template || templateParam || "A",
          name: p.name || "",
          title: p.title || "",
          tagline: p.tagline || "",
          profileImage: p.profileImage || "",
          bio: p.bio || "",
          email: p.email || "",
          phone: p.phone || "",
          location: p.location || "",
          socials: Array.isArray(p.socials) ? p.socials : [],
          skills: Array.isArray(p.skills) ? p.skills : [],
          services: safeServices,
          portfolio: safePortfolio,
          testimonials: safeTestimonials,
          blog: safeBlog,
          contact: {
            message: p?.contact?.message || "",
            email: p?.contact?.email || "",
            phone: p?.contact?.phone || "",
          },
        });

        setSkillsInput((Array.isArray(p.skills) ? p.skills : []).join(", "));
        setSocialsInput((Array.isArray(p.socials) ? p.socials : []).join(", "));
      } catch (err) {
        console.error(err);
        alert("Failed to load profile for editing.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProfile();
    return () => { ignore = true; };
  }, [API, id, isEdit, templateParam]);

  // Simple top-level string fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };

  // Template change (allow switching A/B during edit)
  const handleTemplateChange = (e) => {
    const value = e.target.value;
    setFormData((d) => ({ ...d, template: value }));
  };

  // Nested contact fields
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, contact: { ...d.contact, [name]: value } }));
  };

  // Array of objects updates (services, portfolio, blog)
  const updateArrayItem = (section, index, field, value) => {
    setFormData((d) => {
      const updated = [...d[section]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...d, [section]: updated };
    });
  };

  const addItem = (section, emptyObj, max = Infinity) => {
    setFormData((d) => {
      if (d[section].length >= max) return d;
      return { ...d, [section]: [...d[section], { ...emptyObj }] };
    });
  };

  const removeItem = (section, index, min = 0) => {
    setFormData((d) => {
      if (d[section].length <= min) return d;
      const updated = d[section].filter((_, i) => i !== index);
      return { ...d, [section]: updated.length ? updated : d[section] };
    });
  };

  // Testimonials (array of strings)
  const updateTestimonial = (index, value) => {
    setFormData((d) => {
      const updated = [...d.testimonials];
      updated[index] = value;
      return { ...d, testimonials: updated };
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      // Replace string inputs with arrays
      skills: splitToArray(skillsInput),
      socials: splitToArray(socialsInput),
      // Enforce soft caps
      services: (formData.services || []).slice(0, 3),
      portfolio: (formData.portfolio || []).slice(0, 3),
      testimonials: (formData.testimonials || []).filter(Boolean).slice(0, 3),
      blog: (formData.blog || []).filter((b) => b.title || b.summary),
    };

    try {
      setSaving(true);
      if (isEdit) {
        await axios.put(`${API}/professionals/${id}`, payload);
      } else {
        await axios.post(`${API}/professionals`, payload);
      }
    //   navigate("/professionals");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to save. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>
        {isEdit ? "Edit Portfolio" : "Create Portfolio"}
      </h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Selected Template:
        &nbsp;
        <select value={formData.template} onChange={handleTemplateChange}>
          <option value="A">Template A</option>
          <option value="B">Template B</option>
        </select>
      </p>

      <form onSubmit={handleSubmit}>
        {/* Hero Section */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>Hero</h2>
          <div>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: 8 }}
            />
            <input
              name="title"
              placeholder="Title (e.g., Full-Stack Developer)"
              value={formData.title}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <input
              name="tagline"
              placeholder="Tagline (e.g., Building modern apps)"
              value={formData.tagline}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <input
              name="profileImage"
              placeholder="Profile Image URL"
              value={formData.profileImage}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 8 }}
            />
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="preview"
                style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 12 }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : null}
          </div>
        </section>

        {/* About Me */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>About Me</h2>
          <textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
            <input
              placeholder="Social links (comma separated)"
              value={socialsInput}
              onChange={(e) => setSocialsInput(e.target.value)}
            />
          </div>
        </section>

        {/* Skills */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>Skills</h2>
          <input
            placeholder="Skills (comma separated, e.g., React, Node.js, MongoDB)"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />
        </section>

        {/* Services */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>Services (max 3)</h2>
          {formData.services.map((s, i) => (
            <div key={`srv-${i}`} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "center" }}>
                <input
                  placeholder="Service Title"
                  value={s.title}
                  onChange={(e) => updateArrayItem("services", i, "title", e.target.value)}
                />
                <input
                  placeholder="Service Description"
                  value={s.description}
                  onChange={(e) => updateArrayItem("services", i, "description", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeItem("services", i)}
                  disabled={formData.services.length <= 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("services", emptyService, 3)}
            disabled={formData.services.length >= 3}
          >
            + Add Service
          </button>
        </section>

        {/* Portfolio */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>Portfolio (max 3)</h2>
          {formData.portfolio.map((p, i) => (
            <div key={`prj-${i}`} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <input
                  placeholder="Project Title"
                  value={p.title}
                  onChange={(e) => updateArrayItem("portfolio", i, "title", e.target.value)}
                />
                <input
                  placeholder="Image URL"
                  value={p.image}
                  onChange={(e) => updateArrayItem("portfolio", i, "image", e.target.value)}
                />
                <input
                  placeholder="Description"
                  value={p.description}
                  onChange={(e) => updateArrayItem("portfolio", i, "description", e.target.value)}
                />
              </div>
              {p.image ? (
                <img
                  src={p.image}
                  alt="project"
                  style={{ width: "100%", maxWidth: 280, marginTop: 8, borderRadius: 6, objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : null}
              <div style={{ marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => removeItem("portfolio", i)}
                  disabled={formData.portfolio.length <= 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("portfolio", emptyProject, 3)}
            disabled={formData.portfolio.length >= 3}
          >
            + Add Project
          </button>
        </section>

        {/* Testimonials */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>Testimonials (1–3)</h2>
          {formData.testimonials.map((t, i) => (
            <div key={`tst-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, marginBottom: 8 }}>
              <input
                placeholder="Client quote"
                value={t}
                onChange={(e) => updateTestimonial(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeItem("testimonials", i, 1)}
                disabled={formData.testimonials.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("testimonials", "", 3)}
            disabled={formData.testimonials.length >= 3}
          >
            + Add Testimonial
          </button>
        </section>

        {/* Blog (optional) */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>Blog (optional)</h2>
          {formData.blog.map((b, i) => (
            <div key={`blog-${i}`} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, alignItems: "center" }}>
                <input
                  placeholder="Blog Title"
                  value={b.title}
                  onChange={(e) => updateArrayItem("blog", i, "title", e.target.value)}
                />
                <input
                  placeholder="Blog Summary"
                  value={b.summary}
                  onChange={(e) => updateArrayItem("blog", i, "summary", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeItem("blog", i)}
                  disabled={formData.blog.length <= 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addItem("blog", emptyBlog)}>
            + Add Blog
          </button>
        </section>

        {/* Contact */}
        <section style={{ borderTop: "1px solid #ddd", paddingTop: 16 }}>
          <h2>Contact</h2>
          <textarea
            name="message"
            placeholder="Message text"
            value={formData.contact.message}
            onChange={handleContactChange}
            rows={3}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input
              name="email"
              placeholder="Contact Email"
              value={formData.contact.email}
              onChange={handleContactChange}
            />
            <input
              name="phone"
              placeholder="Contact Phone"
              value={formData.contact.phone}
              onChange={handleContactChange}
            />
          </div>
        </section>

        {/* Actions */}
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button type="submit" disabled={saving}>
            {saving ? (isEdit ? "Updating..." : "Saving...") : (isEdit ? "Update Profile" : "Save Profile")}
          </button>
          {/* <button type="button" onClick={() => navigate("/professionals")}> */}
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
