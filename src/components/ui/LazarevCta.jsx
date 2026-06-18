'use client';
import React from 'react';
import styles from './LazarevCta.module.css';

export default function LazarevCta({ text = "Let's Talk", href = "#", className = "" }) {
  return (
    <a href={href} className={`${styles.lazarevCta} ${className}`}>
      <div className={styles.ctaTextContainer}>
        <span className={styles.ctaTextPrimary}>{text}</span>
        <span className={styles.ctaTextSecondary}>{text}</span>
      </div>
      <div className={styles.ctaIconWrapper}>
        <svg className={styles.ctaIconPrimary} fill="none" viewBox="0 0 15 15">
          <path clipRule="evenodd" d="M10.125 3.153H1.961V1H13.8v11.839h-2.152V4.675L2.722 13.6 1.2 12.078l8.925-8.925Z" fill="currentColor" fillRule="evenodd"></path>
        </svg>
        <svg className={styles.ctaIconSecondary} fill="none" viewBox="0 0 15 15">
          <path clipRule="evenodd" d="M10.125 3.153H1.961V1H13.8v11.839h-2.152V4.675L2.722 13.6 1.2 12.078l8.925-8.925Z" fill="currentColor" fillRule="evenodd"></path>
        </svg>
      </div>
    </a>
  );
}
