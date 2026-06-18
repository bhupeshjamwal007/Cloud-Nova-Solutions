import React from 'react';
import styles from './ClientSection.module.css';

export default function ClientSection() {
  const clients = [
    { 
      type: 'text', 
      label: 'SkyPhoria',
      description: 'We build websites, Mobile Apps, and Software with breathtaking design. Elevating your digital presence through seamless interactions and bleeding-edge technology.'
    },
  ];

  return (
    <section className={styles.clientSection}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Our Clients</h2>
          <p className={styles.description}>
            From bleeding-edge startups to global industry leaders, we engineer digital ecosystems that push boundaries, elevate aesthetics, and turn ambitious visions into breathtaking realities.
          </p>
        </div>
      </div>
      
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {clients.map((client, index) => (
            <div key={index} className={styles.clientCell}>
              <div className={styles.clientItem}>
                {client.type === 'image' ? (
                  <img 
                    src={client.src} 
                    alt={client.alt} 
                    className={styles.clientLogo} 
                  />
                ) : (
                  <h4 className={styles.clientText}>{client.label}</h4>
                )}
                {client.description && (
                  <p className={styles.clientDescription}>{client.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
