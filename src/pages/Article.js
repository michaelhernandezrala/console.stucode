import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

import { Link, useParams } from "react-router-dom";
import ArticleService from "../api/services/ArticleService";
import UserService from "../api/services/UserService";
import MainWrapper from "../components/wrappers/MainWrapper";

function Article() {
  const { userId, articleId } = useParams();
  const [article, setArticle] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleResponse = await ArticleService.findById({ userId, articleId });
        setArticle(articleResponse.data);

        const userResponse = await UserService.findById(userId);
        console.log(userResponse);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching article", error);
      }
    };

    fetchArticle();
  }, [userId, articleId]);
  return (
    <MainWrapper>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        </header>

        <section className="mb-8">
          <p className="text-xl text-gray-600 mb-6">{article.content}</p>
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <AiOutlineLike className="w-5 h-5 mr-1" />
            <span>{article.likes}</span>
          </button>
        </section>

        <footer className="mt-8  pt-4">
          <Link
            to={`/users/${userId}`}
            className="flex items-center justify-end space-x-2 text-gray-600 hover:text-blue-600"
          >
            <span className="text-sm text-gray-500">Author:</span>
            {user.image && <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full ml-2" />}
            <span className="ml-2">{user.name}</span>
          </Link>
        </footer>
      </article>
    </MainWrapper>
  );
}

export default Article;
