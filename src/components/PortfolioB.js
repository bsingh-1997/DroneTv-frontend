
export default function PortfolioB({ profile }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#121212", color: "#f0f0f0" }}>
      
      {/* Hero SectionTwo-sided */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffbb33",
          color: "#121212",
          padding: "3rem 2rem",
          flexWrap: "wrap",
        }}
      >
        <img
          src={profile.profileImage}
          alt={profile.name}
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            border: "4px solid #121212",
          }}
        />
        <div style={{ maxWidth: "600px" }}>
          <h1 style={{ margin: "0", fontSize: "2.5rem" }}>{profile.name}</h1>
          <h3 style={{ margin: "0.5rem 0" }}>{profile.title}</h3>
          <p style={{ fontStyle: "italic" }}>{profile.tagline}</p>
        </div>
      </header>

      {/* About + Skills: Side by Side */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "2rem",
          gap: "2rem",
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          margin: "2rem",
        }}
      >
        {/* About */}
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ color: "#ffbb33" }}>About Me</h2>
          <p>{profile.bio}</p>
          <p>Email: {profile.contact?.email}</p>
          <p>Phone: {profile.contact?.phone}</p>
          <p>Location: {profile.contact?.location}</p>
        </div>

        {/* Skills */}
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ color: "#ffbb33" }}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {profile.skills?.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: "#333",
                  color: "#ffbb33",
                  padding: "6px 12px",
                  borderRadius: "12px",
                  fontWeight: "500",
                  fontSize: "0.9em",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services: Grid */}
      <section style={{ padding: "2rem 2rem", margin: "2rem" }}>
        <h2 style={{ color: "#ffbb33" }}>Services</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {profile.services?.map((s, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#1e1e1e",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio: Grid with Hover */}
      <section style={{ padding: "2rem", margin: "2rem" }}>
        <h2 style={{ color: "#ffbb33" }}>Portfolio</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {profile.portfolio?.map((p, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "100%", display: "block", transition: "transform 0.3s" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "#ffbb33",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials: Horizontal scroll */}
      <section style={{ padding: "2rem", margin: "2rem" }}>
        <h2 style={{ color: "#ffbb33" }}>Testimonials</h2>
        <div style={{ display: "flex", gap: "1rem", overflowX: "auto", padding: "1rem 0" }}>
          {profile.testimonials?.map((t, idx) => (
            <div
              key={idx}
              style={{
                minWidth: "250px",
                backgroundColor: "#1e1e1e",
                color: "#ffbb33",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 0 5px rgba(0,0,0,0.5)",
              }}
            >
              "{t}"
            </div>
          ))}
        </div>
      </section>

      {/* Blog: Cards */}
      <section style={{ padding: "2rem", margin: "2rem" }}>
        <h2 style={{ color: "#ffbb33" }}>Blog</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {profile.blog?.map((b, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#1e1e1e",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0,0,0,0.5)",
              }}
            >
              <h3>{b.title}</h3>
              <p>{b.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: "2rem", margin: "2rem", backgroundColor: "#1e1e1e", borderRadius: "12px" }}>
        <h2 style={{ color: "#ffbb33" }}>Contact</h2>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
          <input
            type="text"
            placeholder="Your Name"
            style={{ padding: "8px", borderRadius: "6px", border: "none" }}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={{ padding: "8px", borderRadius: "6px", border: "none" }}
          />
          <textarea
            placeholder="Your Message"
            style={{ padding: "8px", borderRadius: "6px", border: "none" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "#ffbb33",
              border: "none",
              color: "#121212",
              fontWeight: "600",
            }}
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ padding: "2rem", textAlign: "center", backgroundColor: "#121212" }}>
        <p>{profile.contact?.email}</p>
        <p>{profile.contact?.phone}</p>
        <p>{profile.contact?.location}</p>
      </footer>
    </div>
  );
}
