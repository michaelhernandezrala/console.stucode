import Pagination from "rc-pagination";
import esES from "rc-pagination/lib/locale/es_ES";
import { useEffect, useState } from "react";

import UserService from "../api/services/UserService";
import Searcher from "../components/common/filters/Searcher";
import Select from "../components/common/filters/Select";
import Table from "../components/common/table/Table";
import MainWrapper from "../components/wrappers/MainWrapper";

const headers = [
  { key: 1, label: "Nombre" },
  { key: 2, label: "Email" },
  { key: 3, label: "Usuario desde" },
  { key: 4, label: "Artículos" },
];

const cleanFilters = (filters) => {
  const { find, ...rest } = filters;
  return { ...rest, find: find || undefined };
};

function Users() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState({ find: "", limit: 10, page: 0, order: "a-z" });
  const [loading, setLoading] = useState(false);

  const options = [
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  const fetchUsers = async () => {
    setLoading(true);

    const cleanedFilters = cleanFilters(filters);
    const response = await UserService.findAndCountAll(cleanedFilters);
    console.log(response);
    setUsers(response.data);
    setTotalUsers(response.count);

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
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
    <MainWrapper title="Usuarios">
      <header className="flex justify-between items-center mb-4">
        <Searcher value={filters.find} onChange={handleChangeFind} />
        <Select value={filters.order} options={options} onChange={handleSortChange} />
      </header>

      <section className="space-y-8">
        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : users.length > 0 ? (
          <Table headers={headers} rows={users} />
        ) : (
          <p className="text-center text-gray-500">No hay usuarios disponibles</p>
        )}
      </section>

      <footer className="flex justify-center mt-8">
        <Pagination
          current={filters.page}
          total={totalUsers}
          pageSize={filters.limit}
          onChange={handlePageChange}
          showSizeChanger={false}
          locale={esES}
          showTotal={(total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} usuarios`}
          aria-label="Paginación de usuarios"
        />
      </footer>
    </MainWrapper>
  );
}

export default Users;
