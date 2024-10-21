import PropTypes from "prop-types";
import AuthContent from "../auth/AuthContent.js";
import AuthHeader from "../auth/AuthHeader.js";

function AuthWrapper({ title, subtitle, children }) {
  return (
    <section className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-700 via-blue-500 to-teal-400">
      <AuthHeader title={title} subtitle={subtitle} />
      <AuthContent>{children}</AuthContent>
    </section>
  );
}

AuthWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
