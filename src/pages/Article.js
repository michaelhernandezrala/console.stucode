import { StatusCodes } from "http-status-codes";
import { useContext, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import Markdown from "react-markdown";
import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

import ArticleService from "../api/services/ArticleService";
import UserService from "../api/services/UserService";
import FormControl from "../components/common/inputs/FormControl";
import Input from "../components/common/inputs/Input";
import Label from "../components/common/inputs/Label";
import { UserContext } from "../components/contexts/UserContext";
import MainWrapper from "../components/wrappers/MainWrapper";

function Article() {
  const { id } = useContext(UserContext);
  const { userId, articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [user, setUser] = useState({});
  const [editedArticle, setEditedArticle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const canEditOrDelete = userId === id;

  useEffect(() => {
    const fetchArticle = async () => {
      Modal.setAppElement("#root");
      const articleResponse = await ArticleService.findById({ userId, articleId });
      const userResponse = await UserService.findById(userId);

      setArticle(articleResponse.data);
      setEditedArticle({
        title: articleResponse.data.title,
        content: articleResponse.data.content,
        image: articleResponse.data.image,
      });

      setUser(userResponse.data);

      const likeStatus = await ArticleService.checkIfFavorite(id, articleId);
      setHasLiked(likeStatus.data.isFavorite);
    };

    fetchArticle();
  }, [userId, articleId, hasLiked]);

  const handleChange = (e) => {
    setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await ArticleService.deleteById(userId, articleId);
      if (response.statusCode === StatusCodes.OK) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateModal = async (e) => {
    e.preventDefault();

    try {
      const response = await ArticleService.update(userId, articleId, editedArticle);
      if (response.statusCode === StatusCodes.OK) {
        setArticle(response.data);
        setIsModalOpen(false);
        return;
      }
    } catch (error) {
      console.error("Error updating article", error);
    }
  };

  const handleLike = async () => {
    await ArticleService.likeArticle(id, articleId);
    setHasLiked(true);
  };

  const handleUnlike = async () => {
    await ArticleService.unlikeArticle(id, articleId);
    setHasLiked(false);
  };

  return (
    <MainWrapper>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={hasLiked ? handleUnlike : handleLike}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <AiOutlineLike className={`w-5 h-5 mr-1 ${hasLiked ? "text-blue-600" : ""}`} />
              <span>{article.likes ?? 0}</span>
            </button>
            <div className="flex items-center space-x-1">
              {canEditOrDelete && (
                <>
                  <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-1 hover:bg-blue-700">
                    Editar
                  </button>
                  <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-1 hover:bg-red-700">
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        <section className="mb-8">
          <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
        </section>

        <footer className="mt-8 pt-4">
          <Link
            to={`/users/${userId}`}
            className="flex items-center justify-end space-x-2 text-gray-600 hover:text-blue-600"
          >
            <span className="text-sm text-gray-500">Autor:</span>
            {user.image && <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full ml-2" />}
            <span className="ml-2">{user.name}</span>
          </Link>
        </footer>
      </article>

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <form className="space-y-4">
          <FormControl>
            <Label htmlFor="image">Imagen</Label>
            <Input name="image" type="text" value={editedArticle.image} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <Label htmlFor="title">Título</Label>
            <Input
              name="title"
              type="text"
              required={true}
              value={editedArticle.title}
              onChange={handleChange}
              autoFocus={true}
            />
          </FormControl>

          <FormControl>
            <Label htmlFor="content">Contenido</Label>
            <textarea
              name="content"
              value={editedArticle.content}
              onChange={handleChange}
              rows={22}
              className="w-full text-sm px-3 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </FormControl>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              onClick={handleUpdateModal}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-red-600 text-white px-4 py-2 hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </MainWrapper>
  );
}

export default Article;
