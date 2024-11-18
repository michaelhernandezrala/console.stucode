import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MenuItem({ item }) {
  return (
    <Link
      to={item.link}
      className="text-gray-900 inline-flex items-center px-3 py-2 text-sm font-medium hover:text-blue-500 transition-colors duration-300"
    >
      {item.label}
    </Link>
  );
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.node.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
