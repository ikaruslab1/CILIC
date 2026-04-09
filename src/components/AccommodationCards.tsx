import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mocking SVG Icons
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const ACCOMMODATIONS: Record<string, any[]> = {
  es: [
    {
      id: 'krystal',
      name: 'Hotel Krystal Satélite María Bárbara',
      image: 'https://www.krystal-satelitemariabarbara.com/media/uploads/galeriahoteles/KSMB-Pool.jpg?q=pr:sharp/rs:fill/mw:100/h:500/f:jpg',
      label: 'RECOMENDADO',
      dates: '11 AL 14 MAYO',
      price: 'DESDE $1,716.00 MXN',
      rates: [
        {
          title: 'Tarifa con Desayuno Buffet',
          description: 'Mencionar el código: "EVENTO CONGRESO URBAN LEGISLATION 2026". Tarifas por habitación, por noche.',
          options: [
            { name: 'Habitación Estándar Sencilla (Incluye 1 desayuno)', price: '$ 2,020.00 M.N.', includes: '1 desayuno buffet' },
            { name: 'Habitación Estándar Doble (Incluye 2 desayunos)', price: '$ 2,324.00 M.N.', includes: '2 desayunos buffet' }
          ],
          notes: [
            'Tarifas por habitación, por noche.',
            'Tarifa en habitación estándar sencilla incluye 1 desayuno buffet',
            'Tarifa en habitación estándar doble incluye 2 desayunos buffet',
            'Tarifas cotizadas en moneda nacional por habitación por noche'
          ]
        },
        {
          title: 'Tarifa Sin Alimentos (EP)',
          description: 'Mencionar el código: "EVENTO CONGRESO URBAN LEGISLATION 2026". Tarifas por habitación, por noche.',
          options: [
            { name: 'Habitación Estándar Sencilla o Doble', price: '$ 1,716.00 M.N.', includes: 'No incluye alimentos' },
            { name: 'Persona Extra', price: '$ 430.00 M.N.', includes: 'N/A' }
          ],
          notes: [
            'Tarifas por habitación, por noche.',
            'Tarifa en habitación estándar sencilla o doble EP (No incluye alimentos)',
            'Tarifas cotizadas en moneda nacional por habitación por noche'
          ]
        }
      ],
      times: { in: '15:00 hrs', out: '12:00 hrs' },
      services: [
        'Gimnasio las 24 hrs',
        'Alberca climatizada (8:00 a 22:00 hrs)',
        'Uso de áreas verdes',
        'Room service (7:00 a 23:00 hrs, costo adicional)',
        'Restaurante a la carta (hasta 23:00 hrs, costo adicional)'
      ],
      parking: 'Hospedados: $75.00 MXN por auto por noche',
      reservation: {
        contact: 'Las reservaciones individuales las podrán hacer directamente al Departamento de Reservaciones reservaciones1.ksmb@krystal-hotels.com o en el teléfono: 55 5366 9924 / 800 KRYSTAL.',
        guarantee: 'Al momento de hacer la reservación cada invitado deberá proporcionar una tarjeta de crédito para garantizar su estancia total.',
        sections: [
          {
            title: 'PARA PAGOS EN EFECTIVO O TRANSFERENCIAS',
            items: [
              'En caso de no contar con tarjeta de crédito para garantizar su reservación, el pago puede ser realizado con depósito en efectivo o transferencia a la cuenta del Hotel 48 horas previas a su día de llegada (días hábiles).',
              'FAVOR DE SOLICITAR SU CLAVE DE REFERENCIA PARA PAGOS O DEPÓSITOS. No se aceptan pagos con cheque.'
            ]
          },
          {
            title: 'Notas',
            items: [
              'Previo al pago de su estancia deberá comunicarse al Departamento de Reservaciones para realizar su reservación y tener su número de confirmación.',
              'Una vez realizado el depósito o transferencia le pedimos de favor remitan el comprobante al siguiente correo: ventas1.ksmb@krystal-hotels.com indicando el nombre, evento y número de confirmación de la reserva.',
              'Si la reservación no es garantizada 48 horas antes de la fecha de llegada se cancelará automáticamente.'
            ]
          }
        ]
      },
      cancellation: 'En caso de cancelación le sugerimos llamar por lo menos 48 horas antes de su día de llegada para evitar el cargo por una noche de no show.',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896.414378685106!2d-99.23100532478334!3d19.522446281776286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d202d353e97e65%3A0x16066b18ddd059e9!2sKrystal%20Satelite%20Maria%20Barbara!5e1!3m2!1ses-419!2smx!4v1775698184097!5m2!1ses-419!2smx'
    },
    {
      id: 'holidayinn',
      name: 'Hotel Holiday Inn Express Satélite',
      image: 'https://digital.ihg.com/is/image/ihg/holiday-inn-express-mexico-city-8925133451-2x1',
      label: 'RECOMENDADO',
      dates: '11 AL 14 MAYO',
      price: 'DESDE $1,766.00 MXN',
      rates: [
        {
          title: 'Tarifa con Desayuno Buffet',
          description: 'Desayuno tipo Buffet: Incluye jugos, café, leche, cereales, yogurt, fruta de temporada, huevos revueltos, hotcakes, chilaquiles verdes o rojos, verdura al vapor y una opción platillo con proteína, pan dulce.',
          options: [
            { name: 'Habitación Estándar Sencilla', price: '$ 1,766.00 M.N. ($ 104.50 USD)', includes: 'Desayuno buffet' },
            { name: 'Habitación Estándar Doble', price: '$ 2,164.80 M.N. ($ 128.09 USD)', includes: 'Desayuno buffet' }
          ],
          notes: [
            'NOTA: Ocupación máxima 2 adultos'
          ]
        }
      ],
      times: { in: '15:00 hrs', out: '13:00 hrs' },
      services: [
        'Internet Wifi de alta velocidad',
        'Acceso al gimnasio'
      ],
      parking: '$90.00 MXN / noche',
      reservation: {
        link: 'https://www.ihg.com/holidayinnexpress/hotels/us/es/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=MEXCA&qCiD=13&qCiMy=042026&qCoD=15&qCoMy=042026&qGrpCd=URB&setPMCookies=true&qSHBrC=EX&qDest=Circuito%20Arquitectos%20%233,%20Mexico%20City,%20CMX,%20MX&showApp=true&adjustMonth=false&srb_u=1&qRmFltr=',
        contact: 'Tel: +52 55 1663 2660 | reservaciones.satelite@gosahoteles.com CCP satelite.ventas@gosahoteles.com',
        guarantee: 'Es necesario solicitar disponibilidad proporcionando: fechas de hospedaje, nombre del grupo y número de personas. El hotel enviará una cotización final.',
        sections: [
          {
            title: 'PROCESO DE RESERVA',
            items: [
              'Solicitar disponibilidad al teléfono +52 55 1663 2660 o a los correos indicados.',
              'Proporcionar fechas, nombre del grupo y número de personas para recibir cotización.',
              'El huésped deberá proporcionar una tarjeta de crédito para garantizar la reservación.'
            ]
          }
        ]
      },
      cancellation: [
        'Se podrán realizar cancelaciones o cambios 10 días antes a la fecha de llegada.',
        'En caso de presentarse una cancelación a una reserva garantizada con depósito, deberá solicitarse mediante una carta los motivos de su cancelación y la devolución de dicha garantía; aplica solo a cancelaciones hechas en tiempo.',
        'Se considera una “no-llegada- no show” la penalización, por el cargo de una noche de una o varias habitaciones que no se presentan o registran al Hotel el día de la llegada estipuladas.',
        'El Hotel aplicará cargos por 01 noches de No Show más impuestos. (no aplica cancelaciones en tiempo) a la habitación que no se presenten el día de su llegada.',
        'La habitación de No Show se respetará hasta las 13:00 hrs. del día siguiente.',
        'La hora de check in es a las 15:00 hrs.; la hora de check out es a las 13:00 hrs.'
      ],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896.767858594205!2d-99.23927392478363!3d19.510776981785348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20327d6348dd7%3A0xa154285e0de0fed7!2sHoliday%20Inn%20Express%20Sat%C3%A9lite!5e1!3m2!1ses-419!2smx!4v1775698701088!5m2!1ses-419!2smx'
    }
  ],
  en: [
    {
      id: 'krystal',
      name: 'Hotel Krystal Satélite María Bárbara',
      image: 'https://www.krystal-satelitemariabarbara.com/media/uploads/galeriahoteles/KSMB-Pool.jpg?q=pr:sharp/rs:fill/mw:100/h:500/f:jpg',
      label: 'RECOMMENDED',
      dates: 'MAY 11 TO 14',
      price: 'FROM $1,716.00 MXN',
      rates: [
        {
          title: 'Rate with Buffet Breakfast',
          description: 'Mention code: "EVENTO CONGRESO URBAN LEGISLATION 2026". Rates per room, per night.',
          options: [
            { name: 'Standard Single Room (Includes 1 breakfast)', price: '$ 2,020.00 M.N.', includes: '1 buffet breakfast' },
            { name: 'Standard Double Room (Includes 2 breakfasts)', price: '$ 2,324.00 M.N.', includes: '2 buffet breakfasts' }
          ],
          notes: [
            'Rates per room, per night.',
            'Standard single room rate includes 1 buffet breakfast',
            'Standard double room rate includes 2 buffet breakfasts',
            'Rates quoted in national currency per room per night'
          ]
        },
        {
          title: 'EP Rate (No Meals Included)',
          description: 'Mention code: "EVENTO CONGRESO URBAN LEGISLATION 2026". Rates per room, per night.',
          options: [
            { name: 'Standard Single or Double Room', price: '$ 1,716.00 M.N.', includes: 'No meals included' },
            { name: 'Extra Person', price: '$ 430.00 M.N.', includes: 'N/A' }
          ],
          notes: [
            'Rates per room, per night.',
            'Standard single or double room EP rate (No meals included)',
            'Rates quoted in national currency per room per night'
          ]
        }
      ],
      times: { in: '3:00 PM', out: '12:00 PM' },
      services: [
        '24-hour gym',
        'Heated pool (8:00 AM to 10:00 PM)',
        'Use of green areas',
        'Room service (7:00 AM to 11:00 PM, additional cost)',
        'À la carte restaurant (until 11:00 PM, additional cost)'
      ],
      parking: 'Guests: $75.00 MXN per car per night',
      reservation: {
        contact: 'Individual reservations can be made directly with the Reservations Department at reservaciones1.ksmb@krystal-hotels.com or by phone: 55 5366 9924 / 800 KRYSTAL.',
        guarantee: 'At the time of reservation, each guest must provide a credit card to guarantee their total stay.',
        sections: [
          {
            title: 'FOR CASH PAYMENTS OR TRANSFERS',
            items: [
              'If you do not have a credit card to guarantee your reservation, payment can be made by cash deposit or transfer to the Hotel account 48 hours prior to your arrival day (business days).',
              'PLEASE REQUEST YOUR REFERENCE KEY FOR PAYMENTS OR DEPOSITS. Checks are not accepted.'
            ]
          },
          {
            title: 'Notes',
            items: [
              'Prior to paying for your stay, you must contact the Reservations Department to make your reservation and obtain your confirmation number.',
              'Once the deposit or transfer is made, please send the receipt to the following email: ventas1.ksmb@krystal-hotels.com indicating the name, event, and reservation confirmation number.',
              'If the reservation is not guaranteed 48 hours before the arrival date, it will be automatically cancelled.'
            ]
          }
        ]
      },
      cancellation: 'In case of cancellation, we suggest calling at least 48 hours before your arrival day to prevent a one-night no-show charge.',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896.414378685106!2d-99.23100532478334!3d19.522446281776286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d202d353e97e65%3A0x16066b18ddd059e9!2sKrystal%20Satelite%20Maria%20Barbara!5e1!3m2!1ses-419!2smx!4v1775698184097!5m2!1ses-419!2smx'
    },
    {
      id: 'holidayinn',
      name: 'Hotel Holiday Inn Express Satélite',
      image: 'https://digital.ihg.com/is/image/ihg/holiday-inn-express-mexico-city-8925133451-2x1',
      label: 'RECOMMENDED',
      dates: 'MAY 11 TO 14',
      price: 'FROM $1,766.00 MXN',
      rates: [
        {
          title: 'Rate with Buffet Breakfast',
          description: 'Buffet Breakfast: Includes juices, coffee, milk, cereals, yogurt, seasonal fruit, scrambled eggs, hotcakes, green or red chilaquiles, steamed vegetables, and a protein dish option, sweet bread.',
          options: [
            { name: 'Standard Single Room', price: '$ 1,766.00 M.N. ($ 104.50 USD)', includes: 'Buffet breakfast' },
            { name: 'Standard Double Room', price: '$ 2,164.80 M.N. ($ 128.09 USD)', includes: 'Buffet breakfast' }
          ],
          notes: [
            'NOTE: Maximum occupancy 2 adults'
          ]
        }
      ],
      times: { in: '3:00 PM', out: '1:00 PM' },
      services: [
        'High-speed Wi-Fi',
        'Gym access'
      ],
      parking: '$90.00 MXN / night',
      reservation: {
        link: 'https://www.ihg.com/holidayinnexpress/hotels/us/es/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=MEXCA&qCiD=13&qCiMy=042026&qCoD=15&qCoMy=042026&qGrpCd=URB&setPMCookies=true&qSHBrC=EX&qDest=Circuito%20Arquitectos%20%233,%20Mexico%20City,%20CMX,%20MX&showApp=true&adjustMonth=false&srb_u=1&qRmFltr=',
        contact: 'Tel: +52 55 1663 2660 | reservaciones.satelite@gosahoteles.com CCP satelite.ventas@gosahoteles.com',
        guarantee: 'Availability must be requested by providing: stay dates, group name, and number of people. the hotel will send a final quote.',
        sections: [
          {
            title: 'BOOKING PROCESS',
            items: [
              'Request availability via phone +52 55 1663 2660 or the indicated emails.',
              'Provide dates, group name, and number of people to receive a quote.',
              'The guest must provide a credit card number to guarantee the room reservation.'
            ]
          }
        ]
      },
      cancellation: [
        'Cancellations or changes can be made 10 days prior to the arrival date.',
        'In case of cancellation of a deposit-guaranteed reservation, a letter explaining the reasons and requesting the refund must be submitted; only applies to timely cancellations.',
        'A "no-arrival - no show" is considered a penalty, consisting of a one-night charge for one or more rooms that do not present or register at the Hotel on the stipulated arrival date.',
        'The Hotel will apply charges for 01 nights of No Show plus taxes (timely cancellations do not apply) to the room that does not show up on the arrival day.',
        'The No Show room will be held until 1:00 PM of the following day.',
        'Check-in time is at 3:00 PM; check-out time is at 1:00 PM.'
      ],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896.767858594205!2d-99.23927392478363!3d19.510776981785348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20327d6348dd7%3A0xa154285e0de0fed7!2sHoliday%20Inn%20Express%20Sat%C3%A9lite!5e1!3m2!1ses-419!2smx!4v1775698701088!5m2!1ses-419!2smx'
    }
  ]
};

const renderWithLinks = (text: string) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const parts = text.split(emailRegex);
  
  return parts.map((part, i) => {
    if (part.match(emailRegex)) {
      return (
        <a key={i} href={`mailto:${part}`} className="inline-link">
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function AccommodationCards({ labels, lang = 'es' }: { labels: Record<string, string>, lang?: string }) {
  const currentAccommodations = ACCOMMODATIONS[lang] || ACCOMMODATIONS['es'];
  const [selectedAcc, setSelectedAcc] = useState<any | null>(null);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedAcc(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = selectedAcc ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAcc]);

  const exploreLabel = lang === 'en' ? 'EXPLORE' : 'EXPLORAR';
  const categoryLabel = lang === 'en' ? 'ACCOMMODATION' : 'ALOJAMIENTO';

  return (
    <section className="editorial-accommodation">
      <div className="editorial-grid">
        {currentAccommodations.map((acc, idx) => (
          <motion.div
            key={acc.id}
            className="editorial-card"
            onClick={() => setSelectedAcc(acc)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-media">
              <img src={acc.image} alt={acc.name} />
              <div className="card-badge">{acc.label}</div>
            </div>
            <div className="card-info">
              <div className="card-meta">
                <CalendarIcon /> <span>{acc.dates}</span>
              </div>
              <h3 className="card-name">{acc.name}</h3>
              <div className="card-footer">
                <span className="card-price">{acc.price}</span>
                <span className="card-cta">
                  {exploreLabel} <ArrowRightIcon />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedAcc && (
          <div className="editorial-overlay" onClick={() => setSelectedAcc(null)}>
            <motion.div 
              className="editorial-modal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <button className="close-btn" onClick={() => setSelectedAcc(null)}>
                  <CloseIcon />
                </button>
                <div className="header-labels">
                  <span className="tag">{categoryLabel}</span>
                  <span className="dot">•</span>
                  <span className="tag">{selectedAcc.dates}</span>
                </div>
              </div>

              <div className="modal-content">
                <header className="content-header">
                  <h2 className="title-large">{selectedAcc.name}</h2>
                  <div className="hero-img-container">
                    <img src={selectedAcc.image} alt={selectedAcc.name} />
                  </div>
                </header>

                <div className="content-layout">
                  <aside className="content-sidebar">
                    <section className="side-block">
                      <h4 className="label-sm">{lang === 'en' ? 'SCHEDULES' : 'HORARIOS'}</h4>
                      <p>Check-in: {selectedAcc.times.in}</p>
                      <p>Check-out: {selectedAcc.times.out}</p>
                    </section>

                    <section className="side-block">
                      <h4 className="label-sm">{lang === 'en' ? 'PARKING' : 'ESTACIONAMIENTO'}</h4>
                      <p>{selectedAcc.parking}</p>
                    </section>

                    <section className="side-block">
                      <h4 className="label-sm">{lang === 'en' ? 'SERVICES' : 'SERVICIOS'}</h4>
                      <ul className="plain-list">
                        {selectedAcc.services.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </section>
                  </aside>

                  <main className="content-main">
                    <section className="main-block">
                      <h3 className="section-title">{lang === 'en' ? 'RATES & OPTIONS' : 'TARIFAS Y OPCIONES'}</h3>
                      {selectedAcc.rates.map((rate: any, i: number) => (
                        <div key={i} className="rate-item">
                          <h4 className="rate-title">{rate.title}</h4>
                          <p className="rate-info">{rate.description}</p>
                          <div className="price-table">
                            {rate.options.map((opt: any, j: number) => (
                              <div key={j} className="price-row">
                                <span className="opt-name">{opt.name}</span>
                                <span className="opt-val">{opt.price}</span>
                              </div>
                            ))}
                          </div>
                          {rate.notes && (
                            <ul className="rate-notes-list">
                              {rate.notes.map((note: string, k: number) => (
                                <li key={k}>{note}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </section>

                    <div className="divider" />

                    <section className="main-block">
                      <h3 className="section-title">{lang === 'en' ? 'RESERVATION' : 'RESERVACIÓN'}</h3>
                      <div className="text-prose">
                        <p>{renderWithLinks(selectedAcc.reservation.contact)}</p>
                        <p>{selectedAcc.reservation.guarantee}</p>
                        {selectedAcc.reservation.sections?.map((sec: any, idx: number) => (
                          <div key={idx} className="reservation-sub-block">
                            <h5 className="sub-label">{sec.title}</h5>
                            <ul className="bullet-list">
                              {sec.items.map((item: string, idy: number) => (
                                <li key={idy}>{renderWithLinks(item)}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {selectedAcc.reservation.link && (
                        <a href={selectedAcc.reservation.link} target="_blank" rel="noopener noreferrer" className="editorial-btn">
                          {lang === 'en' ? 'REQUEST BOOKING' : 'SOLICITAR RESERVA'} <ArrowRightIcon />
                        </a>
                      )}
                    </section>

                    <section className="main-block">
                      <h3 className="section-title">{lang === 'en' ? 'HOTEL POLICIES' : 'POLÍTICAS DEL HOTEL'}</h3>
                      <div className="text-prose">
                        {Array.isArray(selectedAcc.cancellation) ? (
                          <ul className="bullet-list">
                            {selectedAcc.cancellation.map((item: string, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{selectedAcc.cancellation}</p>
                        )}
                      </div>
                    </section>

                    {selectedAcc.mapUrl && (
                      <section className="main-block">
                        <h3 className="section-title">{lang === 'en' ? 'LOCATION' : 'UBICACIÓN'}</h3>
                        <div className="map-container">
                          <iframe 
                            src={selectedAcc.mapUrl}
                            width="100%" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </section>
                    )}
                  </main>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .editorial-accommodation {
          background: #ffffff;
          padding: 80px 20px;
          min-height: 100vh;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .editorial-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 60px;
        }

        /* CARD DESIGN */
        .editorial-card {
          cursor: pointer;
          transition: transform 0.4s ease;
        }

        .editorial-card:hover {
          transform: translateY(-8px);
        }

        .card-media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #f5f5f5;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .editorial-card:hover .card-media img {
          transform: scale(1.05);
        }

        .card-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #1a1a1a;
          color: #fff;
          padding: 6px 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .card-info {
          padding-top: 25px;
          border-top: 1px solid #eee;
          margin-top: 20px;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #888;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .card-name {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          color: #1a1a1a;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-price {
          font-size: 14px;
          font-weight: 700;
          color: #555;
        }

        .card-cta {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--primary, #32378c);
        }

        /* MODAL DESIGN */
        .editorial-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }

        .editorial-modal {
          width: 100%;
          max-width: 1400px; /* Expansive width */
          background: #fff;
          height: 100%;
          box-shadow: -20px 0 60px rgba(0,0,0,0.15);
          overflow-y: auto;
          position: relative;
        }

        .modal-header {
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 10;
          padding: 30px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #000;
        }

        .header-labels {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .tag {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #1a1a1a;
        }

        .dot { color: #ccc; }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #000;
          padding: 5px;
          transition: opacity 0.2s;
        }

        .close-btn:hover { opacity: 0.6; }

        .modal-content {
          padding: 80px 10%; /* Responsive horizontal padding */
          max-width: 1400px;
          margin: 0 auto;
        }

        .title-large {
          font-size: clamp(40px, 8vw, 84px); /* Larger title for wider space */
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -3px;
          margin-bottom: 60px;
          text-transform: uppercase;
        }

        .hero-img-container {
          margin-bottom: 80px;
          height: clamp(300px, 50vh, 600px);
        }

        .hero-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 60px;
        }

        .label-sm {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2.5px;
          color: #999;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .side-block { margin-bottom: 40px; font-size: 14px; line-height: 1.6; }
        .plain-list { list-style: none; padding: 0; }
        .plain-list li { margin-bottom: 8px; font-weight: 500; }

        .bullet-list {
          list-style: disc;
          padding-left: 20px;
          margin-top: 10px;
        }

        .bullet-list li {
          margin-bottom: 12px;
          font-size: 15px;
          color: #444;
          line-height: 1.5;
        }

        .section-title {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 40px;
          color: #000;
          text-transform: uppercase;
          border-bottom: 4px solid #000;
          display: inline-block;
          padding-bottom: 8px;
        }

        .rate-item { margin-bottom: 40px; }
        .rate-title { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
        .rate-info { font-size: 14px; color: #666; margin-bottom: 20px; font-style: italic; }

        .price-table { border-top: 1px solid #1a1a1a; }
        .price-row {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          font-size: 16px;
        }
        .opt-name { font-weight: 500; }
        .opt-val { font-weight: 800; }

        .divider { height: 1px; background: #000; margin: 60px 0; }

        .map-container {
          margin-top: 20px;
          border: 1px solid #eee;
          overflow: hidden;
        }

        .reservation-sub-block {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px dotted #ccc;
        }

        .sub-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          color: #1a1a1a;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .text-prose { font-size: 17px; line-height: 1.7; color: #333; margin-bottom: 30px; }

        .editorial-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #000;
          color: #fff;
          padding: 20px 35px;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 2px;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .editorial-btn:hover { background: #333; }

        @media (max-width: 900px) {
          .content-layout { grid-template-columns: 1fr; gap: 40px; }
          .modal-content { padding: 40px; }
          .title-large { font-size: 40px; }
          .hero-img-container { height: 250px; }
        }

        @media (max-width: 600px) {
          .modal-content { padding: 30px 20px; }
          .editorial-grid { grid-template-columns: 1fr; }
        }

        .rate-notes-list {
          list-style: none;
          padding: 0;
          margin-top: 15px;
        }

        .rate-notes-list li {
          font-size: 13px;
          color: #888;
          margin-bottom: 5px;
          padding-left: 20px;
          position: relative;
        }

        .rate-notes-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #ccc;
        }
        .inline-link {
          color: var(--primary, #32378c);
          text-decoration: underline;
          text-underline-offset: 4px;
          font-weight: 600;
          transition: opacity 0.2s;
        }

        .inline-link:hover {
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}
