import PropTypes from "prop-types";

function NavigationWrapper({ children }) {
  return <nav className="bg-white shadow-lg">{children}</nav>;
}

NavigationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationWrapper;
