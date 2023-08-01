import { ArrowRightCircle } from 'react-bootstrap-icons';

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  return (
    <div className="proj-imgbx" onClick={() => window.open(link)}>
      <img src={imgUrl} />
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
