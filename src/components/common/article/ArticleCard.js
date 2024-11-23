import PropTypes from "prop-types";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";

import NoImageAvailable from "../../../assets/images/no-image-available.png";

function ArticleCard({ article }) {
  const imageSrc = article.image ? article.image : NoImageAvailable;
  return (
    <Link to={`/users/${article.userId}/articles/${article.id}`} className="block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={imageSrc} alt={article.title} />
          </div>
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
              {article.title}
            </h2>
            <p className="mt-3 text-gray-600">{article.content}</p>
            <div className="mt-6 flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <AiOutlineLike className="w-4 h-4 mr-1" />
                <span>{article.likes ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
};

export default ArticleCard;
