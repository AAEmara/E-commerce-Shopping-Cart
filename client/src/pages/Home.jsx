import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to E-commerce Shopping Cart</h1>
      <div className={styles.navLinks}>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/signup" className={styles.link}>Signup</Link>
      </div>
    </div>
  );
};

export default Home;
