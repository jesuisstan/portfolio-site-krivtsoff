'use client';

import { ArrowRightCircle } from 'react-bootstrap-icons';
import styles from '@/styles/Projects.module.css';
import Image from 'next/image';

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  return (
    <div className={styles.projectCard} onClick={() => window.open(link)}>
      <Image
        src={imgUrl}
        alt="project"
        width="0"
        height="0"
        sizes="100vw"
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '800px',
          cursor: 'pointer',
        }}
      />
      <div className="proj-txtx">
        <h4>{title}</h4>
        <span>{description}</span>
        <p>
          <ArrowRightCircle size={22} style={{ cursor: 'pointer' }} />
        </p>
      </div>
    </div>
  );
};
