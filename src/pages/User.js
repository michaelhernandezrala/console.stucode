import { StatusCodes } from "http-status-codes";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import Modal from "react-modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import remarkGfm from "remark-gfm";

import UserService from "../api/services/UserService";
import FormControl from "../components/common/inputs/FormControl";
import Input from "../components/common/inputs/Input";
import Label from "../components/common/inputs/Label";
import { UserContext } from "../components/contexts/UserContext";
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
  const { id } = useContext(UserContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasFollow, setHasFollow] = useState(false);

  const canEditOrDelete = userId === id;

  useEffect(() => {
    const fetchArticle = async () => {
      Modal.setAppElement("#root");

      const userResponse = await UserService.findById(userId);

      setUser(userResponse.data);
      setEditedUser({
        name: userResponse.data.name,
        biography: userResponse.data.biography,
        image: userResponse.data.image,
      });

      const followStatus = await UserService.checkIfFollowing(id, userId);
      setHasFollow(followStatus);
    };

    fetchArticle();
  }, [userId, hasFollow, isModalOpen]);

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
      toast.error(error?.data?.message ?? error.message, { autoClose: false });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await UserService.deleteById(userId);
      if (response.statusCode === StatusCodes.OK) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.data?.message ?? error.message, { autoClose: false });
    }
  };

  const handleFollow = async () => {
    await UserService.followUser(userId, { followerId: id });
    setHasFollow(true);
  };

  const handleUnfollow = async () => {
    await UserService.unfollowUser(userId, id);
    setHasFollow(false);
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

          <div className="flex items-center space-x-1">
            {!canEditOrDelete && (
              <button
                onClick={hasFollow ? handleUnfollow : handleFollow}
                className={`px-4 py-2 ${hasFollow ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
              >
                {hasFollow ? "Unfollow" : "Follow"}
              </button>
            )}

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
        </header>

        <section className="mb-8">
          <Markdown remarkPlugins={[remarkGfm]}>{user.biography}</Markdown>
        </section>

        <footer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <Link to={`/users/${userId}/followers`}>
            {" "}
            <StatCard label="Seguidores" value={user?.followers ?? 0} />
          </Link>
          <Link to={`/users/${userId}/articles`}>
            <StatCard label="Artículos" value={user?.articles ?? 0} />
          </Link>
          <Link to={`/users/${userId}/favorites`}>
            <StatCard label="Favoritos" value={user?.favorites ?? 0} />
          </Link>
        </footer>
      </article>

      <ToastContainer position="top-right" autoClose={3000} />

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
