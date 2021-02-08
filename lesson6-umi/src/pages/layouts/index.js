import React from 'react';
import styles from './index.css';
import {connect} from 'umi'

export default ({ children }) => {
  return (
    <div>
      <h1 className={styles.title}>全局layout-Page layouts/index</h1>
      {children}
    </div>
  );
};
