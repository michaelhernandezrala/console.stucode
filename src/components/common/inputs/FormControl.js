import PropTypes from "prop-types";

function FormControl({ children }) {
  return <div className="space-y-1">{children}</div>;
}

FormControl.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormControl;
