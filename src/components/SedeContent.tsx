import React from "react";
import { motion } from "framer-motion";

interface SedeContentProps {
  lang: string;
}

const SedeContent: React.FC<SedeContentProps> = ({ lang }) => {
  const isEs = lang === "es";

  // Section 1 Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideLeftVariants = {
    hidden: { opacity: 1, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };

  const slideRightVariants = {
    hidden: { opacity: 1, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const contentEs = {
    introTitle: "Centro de Estudios Municipales y Metropolitanos",
    introText:
      "El CEMM surge en 2015 como respuesta a las inquietudes de académicos, servidores públicos y tomadores de decisiones de alto nivel por contar, dentro de la Universidad Nacional Autónoma de México, con un espacio de discusión, análisis e investigación de las realidades municipales y metropolitanas.",
    readMore: "UBICACIÓN",
    highlightTitle: "Sede del congreso",
    highlightText:
      "A lo largo de los años, el CEMM ha desarrollado una labor integral para abordar las complejidades actuales y futuras de los gobiernos municipales y estatales.",
    features: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        ),
        title: "Entidad de la UNAM",
        text: "Especializada en la problemática municipal, el diseño de políticas públicas y planes de desarrollo. Dependiente de la FES Acatlán.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        ),
        title: "Personal Académico",
        text: "Carácter multidisciplinario con visión holística para el crecimiento urbano, servicios públicos, agua y gobernanza.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        ),
        title: "Instancia Líder",
        text: "Ofrece servicios profesionales especializados de excelencia en formación, capacitación y asesoría e investigación aplicada.",
      },
    ],
    mapTitle: "UBICACIÓN Y CONTACTO",
    mapText: "El espacio propicio para el análisis y la innovación metropolitana. Visita nuestras instalaciones dentro de la FES Acatlán.",
    btnVisit: "VISITAR SITIO WEB",
  };

  const contentEn = {
    introTitle: "Municipal and Metropolitan Studies Center",
    introText:
      "The CEMM was established in 2015 in response to the concerns of academics, public servants, and high-level decision makers to have, within the National Autonomous University of Mexico, a space for discussion, analysis and research of municipal and metropolitan realities.",
    readMore: "LOCATION",
    highlightTitle: "Congress Venue",
    highlightText:
      "Over the years, CEMM has developed comprehensive work to address the current and future complexities of municipal and state governments.",
    features: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        ),
        title: "UNAM Entity",
        text: "Specialized in municipal issues, public policy design, and development plans. Affiliated with FES Acatlán.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        ),
        title: "Academic Staff",
        text: "Multidisciplinary nature with a holistic vision for urban growth, public services, water, and governance.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        ),
        title: "Leading Institute",
        text: "Offers specialized professional services of excellence in training, capacity building, consulting, and applied research.",
      },
    ],
    mapTitle: "LOCATION & CONTACT",
    mapText: "The ideal space for metropolitan analysis and innovation. Visit our facilities within FES Acatlán.",
    btnVisit: "VISIT WEBSITE",
  };

  const t = isEs ? contentEs : contentEn;

  const scrollToMap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mapSection = document.getElementById("sede-map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sede-master-container">
      {/* Intro Overlapping Section */}
      <section className="overlap-hero-section">
        <div className="overlap-container">
          <motion.div
            className="overlap-image"
            variants={slideRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <img src="https://pbs.twimg.com/media/CX7jWxsWkAATHtt.jpg" alt="CEMM Installations" />
          </motion.div>
          
          <motion.div
            className="overlap-card"
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="title">{t.introTitle}</h2>
            <p className="text">{t.introText}</p>
            <a href="#sede-map" onClick={scrollToMap} className="btn-modern">
              <span>{t.readMore}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Grid Features Section */}
      <section className="features-section">
        <div className="features-container">
          <motion.div
            className="features-header"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="features-title">{t.highlightTitle}</h2>
            <p className="features-text">{t.highlightText}</p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {t.features.map((feature, i) => (
              <motion.div className="feature-card" key={i} variants={itemVariants}>
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3 className="feature-card-title">{feature.title}</h3>
                  <p className="feature-card-text">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern Map Section */}
      <section className="modern-map-section" id="sede-map">
        <motion.div
          className="map-wrapper"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="map-info-panel">
            <h3 className="map-panel-title">{t.mapTitle}</h3>
            <p className="map-panel-text">{t.mapText}</p>
            
            <div className="map-address-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-map"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>CEMM - UNAM<br />FES Acatlán</span>
            </div>

            <a href="https://acatlan.unam.mx/CEMM/" target="_blank" rel="noreferrer" className="btn-modern dark-btn">
              <span>{t.btnVisit}</span>
            </a>
          </div>

          <div className="map-iframe-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1254518.7587382577!2d-99.14362682943792!3d19.388356644806745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2030fe65d6abb%3A0xa7925e1d1a8c7a5d!2sCEMM%20-%20UNAM%20Centro%20de%20Estudios%20Municipales%20y%20Metropolitanos!5e1!3m2!1ses-419!2smx!4v1775842381114!5m2!1ses-419!2smx"
              style={{ border: 0, width: "100%", height: "100%" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa CEMM"
            ></iframe>
          </div>
        </motion.div>
      </section>
      
      <style>{`
        .sede-master-container {
          background-color: #fcfcfc;
          overflow: hidden;
          font-family: var(--font-body, system-ui, sans-serif);
        }

        /* Variables Override for elegance */
        :root {
          --c-white: #ffffff;
          --c-bg-light: #f9f9fa;
          --c-bg-gray: #f2f3f5;
          --c-text-dark: #1a1a24;
          --c-text-muted: #6b6b7b;
          --c-accent: #2e3b8a; /* primary corporate blue/purple */
        }

        /* --- Overlapping Hero Section --- */
        .overlap-hero-section {
          padding: 80px 20px;
          background: var(--c-white);
          position: relative;
        }

        .overlap-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          min-height: 500px;
        }

        .overlap-image {
          width: 55%;
          height: 600px;
          position: relative;
          z-index: 1;
        }

        .overlap-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .overlap-card {
          width: 50%;
          position: absolute;
          right: 0;
          background: var(--c-white);
          padding: 80px 60px;
          z-index: 2;
          box-shadow: 0 40px 60px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .subtitle {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--c-accent);
          margin-bottom: 20px;
        }

        .title {
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--c-text-dark);
          line-height: 1.1;
          margin-bottom: 30px;
          font-family: var(--font-heading, "Inter", sans-serif);
          letter-spacing: -1px;
        }

        .text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--c-text-muted);
          margin-bottom: 40px;
        }

        .btn-modern {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--c-text-dark);
          color: var(--c-white);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 16px 36px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-modern:hover {
          background: var(--c-accent);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(46, 59, 138, 0.2);
        }

        .btn-modern.dark-btn {
          background: var(--c-white);
          color: var(--c-text-dark);
          border: 1px solid var(--c-bg-gray);
        }
        
        .btn-modern.dark-btn:hover {
           background: var(--c-text-dark);
           color: var(--c-white);
        }


        /* --- Features Section --- */
        .features-section {
          background: var(--c-bg-light);
          padding: 120px 20px;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: flex-start;
          gap: 60px;
        }

        .features-header {
          flex: 0 0 35%;
        }

        .features-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--c-text-dark);
          margin-bottom: 24px;
          font-family: var(--font-heading);
          letter-spacing: -0.5px;
        }

        .features-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--c-text-muted);
        }

        .features-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .feature-card {
          background: var(--c-white);
          padding: 40px 30px;
          display: flex;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.02);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .feature-icon {
          color: var(--c-accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--c-text-dark);
          margin-bottom: 12px;
        }

        .feature-card-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--c-text-muted);
        }

        /* --- Modern Map Section --- */
        .modern-map-section {
          padding: 60px 20px 120px;
          background: var(--c-bg-light);
        }

        .map-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          background: var(--c-white);
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
        }

        .map-info-panel {
          width: 40%;
          padding: 80px 60px;
          background: var(--c-accent);
          color: var(--c-white);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .map-panel-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
          opacity: 0.8;
        }

        .map-panel-text {
          font-size: 1.6rem;
          font-weight: 300;
          line-height: 1.4;
          margin-bottom: 40px;
        }

        .map-address-box {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 40px;
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .icon-map {
          margin-top: 4px;
          opacity: 0.8;
        }

        .map-iframe-container {
          width: 60%;
          min-height: 500px;
          background: var(--c-bg-gray);
        }


        /* --- Responsive Design --- */
        @media (max-width: 1024px) {
          .overlap-image {
            width: 100%;
            height: 400px;
          }
          .overlap-container {
            flex-direction: column;
          }
          .overlap-card {
            width: 90%;
            position: relative;
            margin-top: -80px;
            padding: 60px 40px;
          }
          
          .features-container {
            flex-direction: column;
            gap: 40px;
          }
          .features-header {
            max-width: 600px;
          }
          
          .map-wrapper {
            flex-direction: column;
          }
          .map-info-panel, .map-iframe-container {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.2rem;
          }
          .overlap-card {
            width: 95%;
            padding: 40px 24px;
            margin-top: -60px;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .map-info-panel {
            padding: 40px 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default SedeContent;
