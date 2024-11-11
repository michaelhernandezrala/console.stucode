import { StatusCodes } from "http-status-codes";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

import UserService from "../api/services/UserService";
import FormControl from "../components/common/inputs/FormControl";
import Input from "../components/common/inputs/Input";
import Label from "../components/common/inputs/Label";
import MainWrapper from "../components/wrappers/MainWrapper";

const StatCard = ({ label, value }) => (
  <div className="flex items-center p-4 bg-white shadow">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

function User() {
  // const { id } = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const canEditOrDelete = userId === id;

  useEffect(() => {
    const fetchArticle = async () => {
      Modal.setAppElement("#root");

      const userResponse = await UserService.findById(userId);
      console.log(userResponse);

      setUser(userResponse.data);
      setEditedUser({
        name: userResponse.data.name,
        biography: userResponse.data.biography,
        image: userResponse.data.image,
      });

      setUser(userResponse.data);
    };

    fetchArticle();
  }, [userId]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateModal = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.update(userId, editedUser);
      if (response.statusCode === StatusCodes.OK) {
        setUser(response.data);
        setIsModalOpen(false);
        return;
      }
    } catch (error) {
      console.error("Error updating article", error);
    }
  };

  return (
    <MainWrapper>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center mb-6">
            <img className="h-24 w-24 rounded-full mr-6" src={user.image} alt={user.name} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-lg text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* {canEditOrDelete && ( */}
          <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-1 hover:bg-blue-700">
            Editar
          </button>
          {/* )} */}
        </header>

        <section className="mb-8">
          <Markdown remarkPlugins={[remarkGfm]}>{user.biography}</Markdown>
        </section>

        <footer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <StatCard label="Seguidores" value={user?.followers ?? 0} />
          <Link to={`/users/${userId}/articles`}>
            <StatCard label="Artículos" value={user?.articles ?? 0} />
          </Link>
          <StatCard label="Favoritos" value={user?.favorites ?? 0} />
        </footer>
      </article>

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <form className="space-y-4">
          <FormControl>
            <Label htmlFor="image">Imagen</Label>
            <Input name="image" type="text" value={editedUser.image} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <Label htmlFor="name">Nombre</Label>
            <Input
              name="name"
              type="text"
              required={true}
              value={editedUser.name}
              onChange={handleChange}
              autoFocus={true}
            />
          </FormControl>

          <FormControl>
            <Label htmlFor="biography">Contenido</Label>
            <textarea
              name="biography"
              value={editedUser.biography}
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

export default User;
