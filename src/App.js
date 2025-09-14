import React, { useState, useEffect } from "react";

// Dummy testimonial data
const testimonials = [
  {
    name: "Ahmad Fariz",
    review:
      "Servis sangat professional! Aircond saya yang rosak 2 minggu akhirnya dapat diperbaiki. Harga berpatutan dan pekerja sangat berpengalaman.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Siti Rohana",
    review:
      "Pemasangan aircond baru di rumah saya. Kerja kemas, bersih dan cepat siap. Highly recommended untuk semua!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Azman Ibrahim",
    review:
      "Servis cuci aircond sangat memuaskan. Aircond jadi sejuk balik macam baru beli. Terima kasih!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/68.jpg",
  },
];

const services = [
  {
    title: "Repair & Troubleshoot",
    description:
      "Pakar membaiki pelbagai masalah aircond rumah, pejabat & kedai dengan jaminan kualiti.",
    icon: "🔧",
  },
  {
    title: "Pemasangan Aircond",
    description:
      "Pemasangan aircond baru atau pindah lokasi dengan kemas, selamat & mengikut standard.",
    icon: "🛠️",
  },
  {
    title: "Servis & Cuci",
    description:
      "Cuci menyeluruh, chemical wash & servis rutin untuk prestasi optimum aircond anda.",
    icon: "🧽",
  },
  {
    title: "Gas Top Up",
    description:
      "Top up gas aircond dengan gas berkualiti tinggi untuk prestasi cooling yang maksimum.",
    icon: "❄️",
  },
];

// Animation hook
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options]);

  return [setElement, isVisible];
}

// Animated component
function AnimatedSection({
  children,
  direction = "left",
  delay = 0,
  className = "",
}) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const getTransform = () => {
    if (direction === "left") return "translateX(-50px)";
    if (direction === "right") return "translateX(50px)";
    if (direction === "up") return "translateY(50px)";
    return "translateY(-50px)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : getTransform(),
        transition: `all 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    servis: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const whatsappMessage = `Hai! Saya ingin tempah servis aircond.%0ANama: ${form.name}%0ATelefon: ${form.phone}%0AAlamat: ${form.address}%0AServis: ${form.servis}%0APesan: ${form.message}`;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e2e8f0",
          zIndex: 1000,
          padding: "1rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#1e40af",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ❄️ AirCool Expert
          </div>

          {/* Desktop Menu */}
          <div
            style={{
              display: window.innerWidth > 768 ? "flex" : "none",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => scrollToSection("home")}
              style={navLinkStyle}
            >
              Utama
            </button>
            <button
              onClick={() => scrollToSection("services")}
              style={navLinkStyle}
            >
              Servis
            </button>
            <button
              onClick={() => scrollToSection("location")}
              style={navLinkStyle}
            >
              Lokasi
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              style={navLinkStyle}
            >
              Tempahan
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              style={navLinkStyle}
            >
              Testimoni
            </button>
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#1e40af",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "20px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: window.innerWidth <= 768 ? "block" : "none",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: "#1e40af",
              cursor: "pointer",
            }}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              borderBottom: "1px solid #e2e8f0",
              padding: "1rem",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <button
                onClick={() => scrollToSection("home")}
                style={mobileNavLinkStyle}
              >
                Utama
              </button>
              <button
                onClick={() => scrollToSection("services")}
                style={mobileNavLinkStyle}
              >
                Servis
              </button>
              <button
                onClick={() => scrollToSection("location")}
                style={mobileNavLinkStyle}
              >
                Lokasi
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                style={mobileNavLinkStyle}
              >
                Tempahan
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                style={mobileNavLinkStyle}
              >
                Testimoni
              </button>
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#1e40af",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                WhatsApp Kami
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/60123456789?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "#1e40af",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(30, 64, 175, 0.4)",
          zIndex: 999,
          animation: "pulse 2s infinite",
        }}
      >
        💬
      </a>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          color: "#fff",
          padding: "8rem 1rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatedSection direction="up" delay={0}>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "20px",
              display: "inline-block",
              marginBottom: "2rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "10px" }}>❄️</div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="left" delay={0.2}>
          <h1
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "3.5rem",
              letterSpacing: "-2px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              marginBottom: "1rem",
            }}
          >
            AirCool Expert
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.4}>
          <p
            style={{
              margin: 0,
              fontSize: "1.4rem",
              opacity: 0.9,
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            Servis Aircond Terpercaya | Repair • Pemasangan • Cuci • Gas Top Up
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.6}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => scrollToSection("booking")}
              style={{
                background: "#ffffff",
                color: "#1e40af",
                fontWeight: 700,
                fontSize: "18px",
                padding: "15px 30px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Tempah Sekarang
            </button>
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "18px",
                padding: "15px 30px",
                borderRadius: "50px",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              📞 Hubungi Kami
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Services */}
      <section
        id="services"
        style={{ maxWidth: "1200px", margin: "4rem auto", padding: "0 1rem" }}
      >
        <AnimatedSection direction="up">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                color: "#1e40af",
                fontWeight: 800,
                fontSize: "2.5rem",
                marginBottom: "1rem",
              }}
            >
              Servis Kami
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "1.2rem",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Kami menawarkan perkhidmatan lengkap untuk semua keperluan aircond
              anda
            </p>
          </div>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {services.map((service, index) => (
            <AnimatedSection
              key={index}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.2}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "2rem",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(30, 64, 175, 0.1)",
                  border: "2px solid #f1f5f9",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(30, 64, 175, 0.15)";
                  e.currentTarget.style.borderColor = "#1e40af";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(30, 64, 175, 0.1)";
                  e.currentTarget.style.borderColor = "#f1f5f9";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "#1e40af",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    margin: "0 auto 1.5rem",
                    boxShadow: "0 5px 15px rgba(30, 64, 175, 0.3)",
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    color: "#1e40af",
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    marginBottom: "1rem",
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ color: "#64748b", lineHeight: "1.6" }}>
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Location & Coverage Area */}
      <section
        id="location"
        style={{
          background: "#f8fafc",
          padding: "4rem 1rem",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimatedSection direction="up">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  color: "#1e40af",
                  fontWeight: 800,
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                }}
              >
                Lokasi & Kawasan Servis
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.2rem" }}>
                Berpusat di Shah Alam & meliputi seluruh Klang Valley
              </p>
            </div>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {/* Map */}
            <AnimatedSection direction="left" delay={0.2}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "1rem",
                  boxShadow: "0 10px 30px rgba(30, 64, 175, 0.1)",
                  border: "2px solid #f1f5f9",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127370.82472062165!2d101.4541989!3d3.0734997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4e8c569e5b81%3A0x3ed4e70b7c392eed!2sShah%20Alam%2C%20Selangor%2C%20Malaysia!5e0!3m2!1sen!2smy!4v1736790765123!5m2!1sen!2smy"
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: "15px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shah Alam Location"
                ></iframe>
              </div>
            </AnimatedSection>

            {/* Coverage Areas */}
            <AnimatedSection direction="right" delay={0.4}>
              <div>
                <h3
                  style={{
                    color: "#1e40af",
                    fontWeight: 700,
                    fontSize: "1.8rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  🏢 Pejabat Utama
                </h3>
                <div
                  style={{
                    background: "#fff",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    marginBottom: "2rem",
                    boxShadow: "0 5px 15px rgba(30, 64, 175, 0.1)",
                  }}
                >
                  <p
                    style={{ color: "#64748b", fontSize: "1.1rem", margin: 0 }}
                  >
                    📍 Shah Alam, Selangor
                    <br />
                    📞 +60 12-345 6789
                    <br />
                    📧 aircool@expert.my
                    <br />
                    🕒 24/7 Emergency Service
                  </p>
                </div>

                <h3
                  style={{
                    color: "#1e40af",
                    fontWeight: 700,
                    fontSize: "1.8rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  🗺️ Kawasan Servis
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {[
                    "Shah Alam",
                    "Klang",
                    "Petaling Jaya",
                    "Subang Jaya",
                    "Kuala Lumpur",
                    "Cyberjaya",
                    "Puchong",
                    "Bangi",
                    "Kajang",
                    "Selayang",
                    "Rawang",
                    "Cheras",
                  ].map((area, index) => (
                    <div
                      key={index}
                      style={{
                        background: "#fff",
                        padding: "1rem",
                        borderRadius: "10px",
                        textAlign: "center",
                        border: "2px solid #f1f5f9",
                        color: "#1e40af",
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(30, 64, 175, 0.08)",
                      }}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Quick Contact for Location */}
          <AnimatedSection direction="up" delay={0.6}>
            <div
              style={{
                background: "#1e40af",
                color: "#fff",
                padding: "2rem",
                borderRadius: "20px",
                textAlign: "center",
                marginTop: "3rem",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                📞 Panggilan Kecemasan 24/7
              </h3>
              <p style={{ opacity: 0.9, marginBottom: "1.5rem" }}>
                Aircond rosak tengah malam? Jangan risau! Kami sedia membantu 24
                jam sehari.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="tel:+60123456789"
                  style={{
                    background: "#fff",
                    color: "#1e40af",
                    padding: "12px 24px",
                    borderRadius: "25px",
                    textDecoration: "none",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  📞 Call Now
                </a>
                <a
                  href="https://wa.me/60123456789?text=Kecemasan! Aircond saya rosak dan perlu bantuan segera."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: "25px",
                    textDecoration: "none",
                    fontWeight: 700,
                    border: "2px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          padding: "4rem 1rem",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <AnimatedSection direction="up">
            <h2
              style={{
                fontWeight: 800,
                fontSize: "2.5rem",
                marginBottom: "3rem",
                color: "#1e40af",
              }}
            >
              Kenapa Pilih Kami?
            </h2>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "⚡",
                title: "Servis Pantas",
                desc: "Respons dalam 30 minit & siap dalam hari yang sama",
              },
              {
                icon: "👨‍🔧",
                title: "Teknisi Berpengalaman",
                desc: "15+ tahun pengalaman dalam bidang aircond",
              },
              {
                icon: "💰",
                title: "Harga Berpatutan",
                desc: "Quotation percuma & harga yang kompetitif",
              },
              {
                icon: "🛡️",
                title: "Jaminan Kualiti",
                desc: "Warranty 6 bulan untuk semua kerja repair",
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.2}
              >
                <div
                  style={{
                    padding: "2rem",
                    background: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(30, 64, 175, 0.08)",
                    border: "2px solid #f1f5f9",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      marginBottom: "1rem",
                      color: "#1e40af",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "#64748b" }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section
        id="booking"
        style={{
          maxWidth: "600px",
          margin: "4rem auto",
          padding: "0 1rem",
        }}
      >
        <AnimatedSection direction="up">
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "3rem",
              boxShadow: "0 20px 40px rgba(30, 64, 175, 0.1)",
              border: "2px solid #f1f5f9",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2
                style={{
                  color: "#1e40af",
                  fontWeight: 800,
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                }}
              >
                Tempah Servis Sekarang
              </h2>
              <p style={{ color: "#64748b" }}>
                Isi maklumat dan kami akan hubungi anda segera
              </p>
            </div>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <AnimatedSection direction="left" delay={0.1}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#1e40af",
                      }}
                    >
                      Nama Penuh *
                    </label>
                    <input
                      required
                      name="name"
                      placeholder="Masukkan nama penuh anda"
                      value={form.name}
                      onChange={handleChange}
                      style={modernInputStyle}
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#1e40af",
                      }}
                    >
                      No. Telefon *
                    </label>
                    <input
                      required
                      name="phone"
                      placeholder="01X-XXX XXXX"
                      value={form.phone}
                      onChange={handleChange}
                      style={modernInputStyle}
                      type="tel"
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="left" delay={0.3}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#1e40af",
                      }}
                    >
                      Alamat *
                    </label>
                    <input
                      required
                      name="address"
                      placeholder="Alamat lengkap (Bandar/Kawasan)"
                      value={form.address}
                      onChange={handleChange}
                      style={modernInputStyle}
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.4}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#1e40af",
                      }}
                    >
                      Jenis Servis *
                    </label>
                    <select
                      required
                      name="servis"
                      value={form.servis}
                      onChange={handleChange}
                      style={modernInputStyle}
                    >
                      <option value="">
                        Pilih jenis servis yang diperlukan
                      </option>
                      <option value="repair">🔧 Repair & Troubleshoot</option>
                      <option value="install">🛠️ Pemasangan Aircond</option>
                      <option value="cleaning">🧽 Servis & Cuci</option>
                      <option value="gas">❄️ Gas Top Up</option>
                    </select>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="left" delay={0.5}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        color: "#1e40af",
                      }}
                    >
                      Mesej Tambahan
                    </label>
                    <textarea
                      name="message"
                      placeholder="Terangkan masalah atau keperluan anda..."
                      value={form.message}
                      onChange={handleChange}
                      rows="4"
                      style={{
                        ...modernInputStyle,
                        resize: "vertical",
                        minHeight: "100px",
                      }}
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.6}>
                  <button
                    type="submit"
                    style={{
                      background: "#1e40af",
                      color: "#fff",
                      border: "none",
                      padding: "15px 0",
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: "18px",
                      marginTop: "1rem",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      paddingRight: "20px",
                      paddingLeft: "20px",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "translateY(-2px)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.transform = "translateY(0)")
                    }
                  >
                    Hantar Tempahan
                  </button>
                </AnimatedSection>
              </form>
            ) : (
              <AnimatedSection direction="up">
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    background: "#1e40af",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    ✅
                  </div>
                  <h3 style={{ marginBottom: "0.5rem" }}>
                    Tempahan Berjaya Dihantar!
                  </h3>
                  <p style={{ opacity: 0.9 }}>
                    Terima kasih! Kami akan hubungi anda dalam masa 30 minit.
                  </p>
                </div>
              </AnimatedSection>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        style={{
          background: "#f8fafc",
          padding: "4rem 1rem",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimatedSection direction="up">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  color: "#1e40af",
                  fontWeight: 800,
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                }}
              >
                Apa Kata Pelanggan Kami
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.2rem" }}>
                Lebih 500+ pelanggan yang berpuas hati dengan servis kami
              </p>
            </div>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.2}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    padding: "2rem",
                    boxShadow: "0 10px 30px rgba(30, 64, 175, 0.1)",
                    border: "2px solid #f1f5f9",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "1rem",
                        border: "3px solid #e2e8f0",
                      }}
                    />
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          color: "#1e40af",
                          fontWeight: 700,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {testimonial.name}
                      </h4>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span
                            key={i}
                            style={{ color: "#1e40af", fontSize: "1.2rem" }}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#64748b",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    "{testimonial.review}"
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#1e40af",
          color: "#fff",
          padding: "3rem 1rem 2rem",
          textAlign: "center",
        }}
      >
        <AnimatedSection direction="up">
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                AirCool Expert
              </h3>
              <p style={{ opacity: 0.8, maxWidth: "500px", margin: "0 auto" }}>
                Servis aircond terpercaya di seluruh Klang Valley. Hubungi kami
                untuk quotation percuma!
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <strong>📞 Telefon:</strong>
                <br />
                <span style={{ opacity: 0.8 }}>+60 12-345 6789</span>
              </div>
              <div>
                <strong>📧 Email:</strong>
                <br />
                <span style={{ opacity: 0.8 }}>aircool@expert.my</span>
              </div>
              <div>
                <strong>📍 Kawasan:</strong>
                <br />
                <span style={{ opacity: 0.8 }}>Klang Valley & Selangor</span>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.2)",
                paddingTop: "1.5rem",
                opacity: 0.7,
              }}
            >
              © 2025 AirCool Expert | Developed by DenRoko-Kasdi_MTLS
            </div>
          </div>
        </AnimatedSection>
      </footer>

      {/* Add CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 4px 20px rgba(30, 64, 175, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(30, 64, 175, 0.8);
          }
          100% {
            box-shadow: 0 4px 20px rgba(30, 64, 175, 0.4);
          }
        }

        @media (max-width: 768px) {
          #location .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// Styles
const navLinkStyle = {
  background: "none",
  border: "none",
  color: "#64748b",
  fontWeight: 600,
  fontSize: "16px",
  cursor: "pointer",
  transition: "color 0.3s ease",
  padding: "8px 0",
};

const mobileNavLinkStyle = {
  background: "none",
  border: "none",
  color: "#64748b",
  fontWeight: 600,
  fontSize: "16px",
  cursor: "pointer",
  padding: "12px 0",
  textAlign: "left",
  width: "100%",
};

// Modern input style
const modernInputStyle = {
  padding: "12px 16px",
  borderRadius: "12px",
  border: "2px solid #e2e8f0",
  fontSize: "16px",
  outline: "none",
  transition: "border-color 0.2s ease",
  width: "100%",
  boxSizing: "border-box",
};
