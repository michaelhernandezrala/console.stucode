import Pagination from "rc-pagination";
import esES from "rc-pagination/lib/locale/es_ES";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ArticleService from "../api/services/ArticleService";
import ArticleCard from "../components/common/article/ArticleCard";
import Searcher from "../components/common/filters/Searcher";
import Select from "../components/common/filters/Select";
import MainWrapper from "../components/wrappers/MainWrapper";

const cleanFilters = (filters) => {
  const { find, ...rest } = filters;
  return { ...rest, find: find || undefined };
};

function Articles() {
  const { userId } = useParams();
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [filters, setFilters] = useState({ find: "", limit: 10, page: 1, order: "a-z", userId });
  const [loading, setLoading] = useState(false);

  const options = [
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  const fetchArticles = async () => {
    setLoading(true);

    const cleanedFilters = cleanFilters(filters);
    const response = await ArticleService.findAndCountAll(cleanedFilters);
    setArticles(response.data);
    setTotalArticles(response.count);

    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [filters]);

  const handleChangeFind = (e) => {
    setFilters((prev) => ({ ...prev, find: e.target.value }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, order: e.target.value }));
  };

  return (
    <MainWrapper>
      <header className="flex justify-between items-center mb-4">
        <Searcher value={filters.find} onChange={handleChangeFind} />
        <Select value={filters.order} options={options} onChange={handleSortChange} />
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
    </MainWrapper>
  );
}

export default Articles;
