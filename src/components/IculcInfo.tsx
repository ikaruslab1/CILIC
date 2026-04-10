import React from 'react';
import { motion } from 'framer-motion';

interface IculcInfoProps {
  lang: string;
}

const IculcInfo: React.FC<IculcInfoProps> = ({ lang }) => {
  const isEs = lang === 'es';

  const contentEs = {
    badge: "Perspectiva Global",
    title: "La Conferencia Internacional de Legislación Urbana Comparada (ICULC)",
    subtitle: "Organizada por el Urban Law Center de la Universidad de Fordham",
    introText: "Se consolida como un espacio de encuentro global que reúne a especialistas para analizar los desafíos contemporáneos de la legislación urbana a través de:",
    features: [
      {
        title: "Enfoque Multidisciplinario",
        desc: "Perspectivas internacionales, comparativas e interdisciplinarias."
      },
      {
        title: "Alcance Global",
        desc: "Ediciones celebradas en distintos continentes impulsando el intercambio de ideas."
      },
      {
        title: "Entendimiento Urbano",
        desc: "Comprensión integral de la complejidad de las ciudades actuales y sus marcos normativos."
      }
    ],
    venueYear: "2026",
    venueTitle: "FES Acatlán: Nodo Estratégico",
    venueSubtitle: "Sede de la edición 2026, consolidándose como un referente académico en el contexto global.",
    collabCol: {
      title: "Alianzas Internacionales",
      text: "En colaboración con el Colegio de Jurisprudencia Urbanística CJUR Internacional y con la participación de ONU Habitat. Este encuentro posiciona a México como un nodo fundamental para la innovación urbana."
    },
    impactCol: {
      title: "Objetivo Común",
      text: "Una oportunidad única para reflexionar sobre los procesos que transforman nuestras ciudades fomentando el diálogo crítico entre academia, profesionales y actores clave, para generar propuestas hacia el futuro."
    }
  };

  const contentEn = {
    badge: "Global Perspective",
    title: "The International Comparative Urban Law Conference (ICULC)",
    subtitle: "Organized by the Urban Law Center at Fordham University",
    introText: "Establishes itself as a global meeting space bringing together specialists to analyze the contemporary challenges of urban legislation through:",
    features: [
      {
        title: "Multidisciplinary Approach",
        desc: "International, comparative, and interdisciplinary perspectives."
      },
      {
        title: "Global Reach",
        desc: "Editions held across different continents promoting the exchange of ideas."
      },
      {
        title: "Urban Understanding",
        desc: "Comprehensive understanding of the complexity of today's cities and their regulatory frameworks."
      }
    ],
    venueYear: "2026",
    venueTitle: "FES Acatlán: Strategic Node",
    venueSubtitle: "Host of the 2026 edition, consolidating itself as an academic point of reference in a global context.",
    collabCol: {
      title: "International Alliances",
      text: "In collaboration with the Colegio de Jurisprudencia Urbanística CJUR Internacional and with the participation of UN-Habitat. This meeting positions Mexico as a fundamental node for urban innovation."
    },
    impactCol: {
      title: "Common Objective",
      text: "A unique opportunity to reflect on the processes that transform our cities, fostering critical dialogue among academia, professionals, and key actors, to generate proposals towards the future."
    }
  };

  const t = isEs ? contentEs : contentEn;

  const fadeUp = {
    hidden: { opacity: 1, y: 0 }, // Visible by default for file:// support
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section className="iculc-modern-section">
      <div className="iculc-modern-container">
        
        {/* TOP COMPONENT: The Conference Intro */}
        <motion.div 
          className="iculc-intro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="iculc-intro-header">
            <span className="iculc-badge">{t.badge}</span>
            <h2 className="iculc-main-title">{t.title}</h2>
            <h3 className="iculc-subtitle">{t.subtitle}</h3>
            <p className="iculc-intro-text">{t.introText}</p>
          </div>

          <motion.div 
            className="iculc-features"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {t.features.map((feat, idx) => (
              <motion.div key={idx} className="iculc-feature-item" variants={fadeUp}>
                <div className="feature-marker"></div>
                <div>
                  <h4 className="feature-title">{feat.title}</h4>
                  <p className="feature-desc">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* BOTTOM COMPONENT: The Venue 2026 */}
        <motion.div 
          className="iculc-venue-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="venue-hero">
            <div className="venue-year">{t.venueYear}</div>
            <div className="venue-titles">
              <h3>{t.venueTitle}</h3>
              <p>{t.venueSubtitle}</p>
            </div>
          </div>
          
          <div className="venue-details">
            <div className="venue-col detail-br">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="venue-icon"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <h4 className="venue-col-title">{t.collabCol.title}</h4>
              <p className="venue-col-text">{t.collabCol.text}</p>
            </div>
            <div className="venue-col">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="venue-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
               <h4 className="venue-col-title">{t.impactCol.title}</h4>
               <p className="venue-col-text">{t.impactCol.text}</p>
            </div>
          </div>
        </motion.div>

      </div>
      
      <style>{`
        .iculc-modern-section {
          background-color: var(--c-white, #ffffff);
          padding: 100px 20px 140px;
          font-family: var(--font-body, system-ui, sans-serif);
        }

        .iculc-modern-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 100px;
        }

        /* --- Top Intro Section --- */
        .iculc-intro {
          display: flex;
          gap: 80px;
          align-items: center;
        }

        .iculc-intro-header {
          flex: 1;
        }

        .iculc-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #2e3b8a;
          background: rgba(46, 59, 138, 0.1);
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 24px;
        }

        .iculc-main-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #1a1a24;
          line-height: 1.2;
          margin-bottom: 16px;
          font-family: var(--font-heading, "Inter", sans-serif);
          letter-spacing: -0.5px;
        }

        .iculc-subtitle {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2e3b8a;
          margin-bottom: 24px;
        }

        .iculc-intro-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #6b6b7b;
        }

        .iculc-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .iculc-feature-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          background: #f9f9fa;
          padding: 24px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .iculc-feature-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.04);
        }

        .feature-marker {
          width: 8px;
          height: 8px;
          background: #2e3b8a;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
          box-shadow: 0 0 0 4px rgba(46, 59, 138, 0.15);
        }

        .feature-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a24;
          margin-bottom: 6px;
        }

        .feature-desc {
          font-size: 0.95rem;
          color: #6b6b7b;
          line-height: 1.5;
        }

        /* --- Bottom Venue Section --- */
        .iculc-venue-block {
          background: #1a1a24;
          color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
        }

        .venue-hero {
          background: #2e3b8a;
          padding: 60px 80px;
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .venue-year {
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255,255,255,0.15);
          line-height: 1;
          font-family: var(--font-heading, "Inter", sans-serif);
          letter-spacing: -2px;
        }

        .venue-titles h3 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }

        .venue-titles p {
          font-size: 1.1rem;
          opacity: 0.8;
          max-width: 600px;
        }

        .venue-details {
          display: flex;
        }

        .venue-col {
          flex: 1;
          padding: 60px 80px;
          position: relative;
        }

        .detail-br {
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .venue-icon {
          color: #fff;
          opacity: 0.6;
          margin-bottom: 24px;
        }

        .venue-col-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #ffffff;
        }

        .venue-col-text {
          font-size: 1.05rem;
          line-height: 1.8;
          opacity: 0.8;
          font-weight: 300;
        }

        /* --- Responsive Design --- */
        @media (max-width: 1024px) {
          .iculc-intro {
            flex-direction: column;
            gap: 50px;
          }
          .venue-hero {
            padding: 50px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .venue-details {
            flex-direction: column;
          }
          .detail-br {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .venue-col {
            padding: 50px;
          }
        }

        @media (max-width: 768px) {
          .iculc-modern-container {
             gap: 60px;
          }
          .iculc-main-title {
            font-size: 1.8rem;
          }
          .venue-year {
             font-size: 4rem;
          }
          .venue-titles h3 {
             font-size: 1.6rem;
          }
          .venue-hero {
             padding: 40px 30px;
          }
          .venue-col {
             padding: 40px 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default IculcInfo;
