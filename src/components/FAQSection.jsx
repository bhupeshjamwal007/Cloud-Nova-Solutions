'use client';
import React, { useState } from 'react';
import styles from './FAQSection.module.css';

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Every project is unique. A standard web platform can take 8-12 weeks, while complex mobile applications may require 4-6 months. We prioritize quality and rigorous testing over rushed deliveries."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Absolutely. We believe in long-term partnerships. We offer comprehensive maintenance and scaling packages to ensure your digital product evolves alongside your business."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We are stack-agnostic but heavily favor modern, high-performance tools. Our specialties include React, Next.js, React Native, Node.js, and advanced WebGL for immersive experiences."
  },
  {
    question: "How do you handle project management?",
    answer: "We use agile methodologies, providing you with a dedicated project manager, weekly sprint reviews, and completely transparent communication channels."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Got Questions?</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={styles.faqItem}>
                <button 
                  className={styles.questionButton} 
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
                    +
                  </span>
                </button>
                <div 
                  className={`${styles.answerContainer} ${isOpen ? styles.answerContainerOpen : ''}`}
                >
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
