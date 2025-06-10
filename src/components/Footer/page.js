"use client";
import React from 'react';
import { Instagram, Linkedin, Youtube, Twitter, Facebook ,X} from 'lucide-react';
import styles from './Footer.module.scss'; // Assuming you have a CSS module for styles

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/evolkun_officials/', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/evolkun-pvt-65680b36a', color: 'hover:text-blue-600' },
    // { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
    { name: 'X', icon: X, href: 'https://x.com/Evolkun_7', color: 'hover:text-blue-400' },
    // { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-700' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socials}>
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a key={social.name} href={social.href} className={`${styles.iconLink} ${social.color}`}>
                <Icon size={24} className={styles.icon} />
                <div className={styles.tooltip}>{social.name}</div>
              </a>
            );
          })}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.copyright}>
          <p>
            Copyright © {new Date().getFullYear()}; Designed by{' '}
            <span>EVOLKUN</span>
          </p>
        </div>

        <div className={styles.pulses}>
          <div className={styles.dot} style={{ backgroundColor: '#60a5fa' }}></div>
          <div className={styles.dot} style={{ backgroundColor: '#a78bfa' }}></div>
          <div className={styles.dot} style={{ backgroundColor: '#ec4899' }}></div>
        </div>
      </div>

      <div className={styles.accentLine}></div>
    </footer>
  );
};

export default Footer;
