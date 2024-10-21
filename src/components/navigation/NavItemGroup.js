import PropTypes from "prop-types";

function NavItemGroup({ children }) {
  return <div className="flex space-x-5">{children}</div>;
}

NavItemGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavItemGroup;
