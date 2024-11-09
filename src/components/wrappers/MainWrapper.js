import PropTypes from "prop-types";

function MainWrapper({ title, children }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
        {children}
      </section>
    </main>
  );
}

MainWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MainWrapper;
