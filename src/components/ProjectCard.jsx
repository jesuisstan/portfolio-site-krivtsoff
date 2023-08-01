import { ArrowRightCircle } from 'react-bootstrap-icons';

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  return (
    <div className="proj-imgbx">
      <img src={imgUrl} />
      <div className="proj-txtx">
        <h4>{title}</h4>
        <span>{description}</span>
        <p>

        <ArrowRightCircle
          size={22}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            window.open(link);
          }}
        />
        </p>
      </div>
    </div>
  );
};
