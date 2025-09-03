
export default function PortfolioA({ profile }) {
  return (

<div>
  {/* Hero Section */}
  <header style={{ textAlign: "center", backgroundColor: "#facc15", padding: "3rem", color: "black" }}>
    <img src={profile.profileImage} alt={profile.name} width="120" style={{ borderRadius: "50%" }} />
    <h1>{profile.name}</h1>
    <h3>{profile.title}</h3>
    <p>{profile.tagline}</p>
  </header>

  {/* About Me */}
  <section style={{ padding: "2rem" }}>
    <h2>About Me</h2>
    <p>{profile.bio}</p>
    <p>Email: {profile.contact?.email}</p>
    <p>Phone: {profile.contact?.phone}</p>
    <p>Location: {profile.contact?.location}</p>
  </section>

  {/* Skills */}
  <section style={{ padding: "2rem" }}>
    <h2>Skills</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {profile.skills?.map((skill, idx) => (
        <span key={idx} style={{ backgroundColor: "#fde047", padding: "4px 10px", borderRadius: "12px" }}>
          {skill}
        </span>
      ))}
    </div>
  </section>

  {/* Services */}
  <section style={{ padding: "2rem" }}>
    <h2>Services</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
      {profile.services?.map((s, idx) => (
        <div key={idx} style={{ background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 0 5px #ccc" }}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Portfolio */}
  <section style={{ padding: "2rem" }}>
    <h2>Portfolio</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
      {profile.portfolio?.map((p, idx) => (
        <div key={idx} style={{ background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 0 5px #ccc" }}>
          <img src={p.image} alt={p.title} width="100%" style={{ borderRadius: "8px" }} />
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  </section>

  {/* teestimonials Carsl */}
  <section style={{ padding: "2rem" }}>
    <h2>Testimonials</h2>
    <div style={{ display: "flex", overflowX: "auto", gap: "1rem", padding: "1rem 0" }}>
      {profile.testimonials?.map((t, idx) => (
        <div key={idx} style={{ minWidth: "250px", background: "#fde047", padding: "1rem", borderRadius: "12px" }}>
          "{t}"
        </div>
      ))}
    </div>
  </section>

  {/* Blog */}
  <section style={{ padding: "2rem" }}>
    <h2>Blog</h2>
    {profile.blog?.map((b, idx) => (
      <div key={idx} style={{ marginBottom: "1rem" }}>
        <h3>{b.title}</h3>
        <p>{b.summary}</p>
      </div>
    ))}
  </section>

  {/* Contact Form */}
  <section style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
    <h2>Contact</h2>
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <input type="text" placeholder="Your Name" style={{ padding: "8px", borderRadius: "6px" }} />
      <input type="email" placeholder="Your Email" style={{ padding: "8px", borderRadius: "6px" }} />
      <textarea placeholder="Your Message" style={{ padding: "8px", borderRadius: "6px" }} />
      <button type="submit" style={{ padding: "10px", borderRadius: "6px", backgroundColor: "#facc15", border: "none" }}>
        Send Message
      </button>
    </form>
  </section>

  <footer style={{ padding: "2rem", textAlign: "center", background: "#f5f5f5" }}>
    <p>{profile.contact?.email}</p>
    <p>{profile.contact?.phone}</p>
    <p>{profile.contact?.location}</p>
  </footer>
</div>

)}
