import PropTypes from "prop-types";

import AuthContent from "../auth/AuthContent.js";
import AuthHeader from "../auth/AuthHeader.js";

function AuthWrapper({ title, subtitle, children }) {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
