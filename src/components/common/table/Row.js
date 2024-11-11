import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Row({ item }) {
  const formattedDate = new Date(item.createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50">
      <Link to={`/users/${item.id}`} className="contents">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{item.name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{item.email}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{formattedDate}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">0</div>
        </td>
      </Link>
    </tr>
  );
}

Row.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Row;
