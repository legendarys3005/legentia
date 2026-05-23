'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

const words = ['Explore', 'Learn', 'Master'];

export default function LoginPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Typing animation — mirrors original login.js typeEffect() logic exactly
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function typeEffect() {
      const currentWord = words[wordIndex];
      const displayed = isDeleting
        ? currentWord.substring(0, charIndex--)
        : currentWord.substring(0, charIndex++);

      setDisplayedText(displayed);

      let typingSpeed = isDeleting ? 80 : 150;

      if (!isDeleting && charIndex === currentWord.length + 1) {
        typingSpeed = 1000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      timer = setTimeout(typeEffect, typingSpeed);
    }

    timer = setTimeout(typeEffect, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.page}>
      {/* Left panel — branding + typing animation */}
      <div className={styles.leftContainer}>
        <p className={styles.intro}>Legentia</p>
        <div className={styles.wrapper}>
          <div className={styles.typingDemo}>{displayedText}</div>
        </div>
      </div>

      {/* Right panel — login card */}
      <div className={styles.rightContainer}>
        <div className={styles.loginCard}>
          <h3 className={styles.signIn}>Sign In</h3>

          <form className={styles.form}>
            <input
              type="email"
              id="email"
              className={styles.emailInput}
              placeholder="Email"
              autoComplete="off"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={styles.passwordInput}
              placeholder="Password"
              autoComplete="off"
            />
          </form>

          {/* Password visibility toggle */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={showPassword ? '../assets/hide.png' : '../assets/show.png'}
            alt="Toggle password visibility"
            id="toggle"
            className={styles.toggle}
            onClick={() => setShowPassword((prev) => !prev)}
          />

          <button type="submit" id="login" className={styles.loginBtn}>
            Login
          </button>

          <div className={styles.signUp}>
            <p>New Here?</p>
            <Link href="/sign_up">Sign Up</Link>
          </div>

          <hr className={styles.divider} />

          <div className={styles.otherLogin}>
            <button type="button" className={styles.google}>
              Sign in with <img src="../../assets/google.png" alt="Google" />
            </button>
            <button type="button" className={styles.microsoft}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              Sign in with <img src="../assets/microsoft.png" alt="Microsoft" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
