import PropTypes from "prop-types";

function NavigationWrapper({ children }) {
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-10 py-6">{children}</div>
      </div>
    </nav>
  );
}

NavigationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationWrapper;
