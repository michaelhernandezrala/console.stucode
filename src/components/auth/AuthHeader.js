import PropTypes from "prop-types";

function AuthHeader({ title, subtitle }) {
  return (
    <header className="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-white">{title}</h1>
      <p className="mt-2 text-center text-md text-white">{subtitle}</p>
    </header>
  );
}

AuthHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthHeader;
