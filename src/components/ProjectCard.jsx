import { ArrowRightCircle } from 'react-bootstrap-icons';
import styles from '@/styles/Projects.module.css';

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  return (
    <div className={styles.projectCard} onClick={() => window.open(link)}>
      <img src={imgUrl} height={300} />
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
