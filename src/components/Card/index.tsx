import { Link } from 'react-router-dom';
import './styles.scss';

type CardProps = {
  thumbnail: string;
  title: string;
  level: string;
  slug: string;
};

function Card({ thumbnail, title, level, slug }: CardProps) {
  return (
    <article className="card">
      <img className="card-img" src={thumbnail} alt={title} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-desc">Difficulté : {level}</p>
        <Link to={`recipe/${slug}`} className="card-link">
          Voir la recette
        </Link>
      </div>
    </article>
  );
}

export default Card;
