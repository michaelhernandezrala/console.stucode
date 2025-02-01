import Pagination from "rc-pagination";
import esES from "rc-pagination/lib/locale/es_ES";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";

import ArticleService from "../api/services/ArticleService";
import ArticleCard from "../components/common/article/ArticleCard";
import Searcher from "../components/common/filters/Searcher";
import Select from "../components/common/filters/Select";
import FormControl from "../components/common/inputs/FormControl";
import Input from "../components/common/inputs/Input";
import Label from "../components/common/inputs/Label";
import { UserContext } from "../components/contexts/UserContext";
import MainWrapper from "../components/wrappers/MainWrapper";

const cleanFilters = (filters) => {
  const { find, ...rest } = filters;
  return { ...rest, find: find || undefined };
};

function Home() {
  const { id } = useContext(UserContext);

  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [filters, setFilters] = useState({ find: "", limit: 10, page: 1, order: "a-z" });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", image: "", content: "" });

  const options = [
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  const fetchArticles = async () => {
    Modal.setAppElement("#root");
    setLoading(true);

    const cleanedFilters = cleanFilters(filters);
    const response = await ArticleService.findAndCountAll(cleanedFilters);
    setArticles(response.data);
    setTotalArticles(response.count);

    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [filters.find, filters.limit, filters.page, filters.order]);

  const handleChangeFind = (e) => {
    setFilters((prev) => ({ ...prev, find: e.target.value }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, order: e.target.value }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();

    try {
      await ArticleService.create(id, newArticle);

      const cleanedFilters = cleanFilters(filters);
      const updatedArticlesResponse = await ArticleService.findAndCountAll(cleanedFilters);

      setArticles(updatedArticlesResponse.data);
      setTotalArticles(updatedArticlesResponse.count);
      setIsModalOpen(false);
      setNewArticle({ title: "", image: "", content: "" });
    } catch (error) {
      toast.error(error?.data?.message ?? error.message, { autoClose: false });
    }
  };

  return (
    <MainWrapper title="Articulos">
      <header className="flex justify-between items-center mb-4">
        <Searcher value={filters.find} onChange={handleChangeFind} />

        <div className="flex items-center space-x-4">
          <Select value={filters.order} options={options} onChange={handleSortChange} />
          <button
            type="submit"
            onClick={handleOpenModal}
            className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 rounded"
          >
            Crear
          </button>
        </div>
      </header>

      <section className="space-y-8">
        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : articles.length > 0 ? (
          articles.map((article) => <ArticleCard key={article.id} article={article} />)
        ) : (
          <p className="text-center text-gray-500">No hay artículos disponibles</p>
        )}
      </section>

      <footer className="flex justify-center mt-8">
        <Pagination
          current={filters.page}
          total={totalArticles}
          pageSize={filters.limit}
          onChange={handlePageChange}
          showSizeChanger={false}
          locale={esES}
          showTotal={(total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} artículos`}
          aria-label="Paginación de artículos"
        />
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <form className="space-y-4">
          <FormControl>
            <Label htmlFor="image">Imagen</Label>
            <Input name="image" type="text" value={newArticle.image} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <Label htmlFor="title">Nombre</Label>
            <Input
              name="title"
              type="text"
              required={true}
              value={newArticle.title}
              onChange={handleChange}
              autoFocus={true}
            />
          </FormControl>

          <FormControl>
            <Label htmlFor="content">Contenido</Label>
            <textarea
              name="content"
              value={newArticle.content}
              onChange={handleChange}
              rows={22}
              className="w-full text-sm px-3 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </FormControl>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              onClick={handleCreateArticle}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              Crear
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

export default Home;
