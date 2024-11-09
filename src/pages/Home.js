import Pagination from "rc-pagination";
import esES from "rc-pagination/lib/locale/es_ES";
import { useEffect, useState } from "react";

import ArticleService from "../api/services/ArticleService";
import ArticleCard from "../components/common/article/ArticleCard";
import Searcher from "../components/common/filters/Searcher";
import Select from "../components/common/filters/Select";
import MainWrapper from "../components/wrappers/MainWrapper";

function Home() {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [find, setFind] = useState("");
  const [limit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("a-z");
  const filters = { limit, find, page, order };
  const options = [
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (!find) {
          delete filters.find;
        }
        const response = await ArticleService.findAndCountAll(filters);
        setArticles(response.data);
        setTotalArticles(response.count);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [page, order, find]);

  const handleChangeFind = (e) => {
    setFind(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <MainWrapper title="Articulos">
      <div className="flex justify-between items-center mb-4">
        <Searcher value={find} onChange={handleChangeFind} />
        <Select value={order} options={options} onChange={handleSortChange} />
      </div>
      <section className="space-y-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
      <div className="flex justify-center mt-8">
        <Pagination
          current={page}
          total={totalArticles}
          pageSize={limit}
          onChange={handlePageChange}
          showSizeChanger={false}
          locale={esES}
          showTotal={(total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} artículos`}
        />
      </div>
    </MainWrapper>
  );
}

export default Home;
