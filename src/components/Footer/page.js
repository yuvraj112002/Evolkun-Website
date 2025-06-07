"use client";
import React from 'react';
import { Instagram, Linkedin, Youtube, Github, Twitter, Facebook } from 'lucide-react';
import styles from './Footer.module.scss'; // Assuming you have a CSS module for styles

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-800' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-700' }
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
