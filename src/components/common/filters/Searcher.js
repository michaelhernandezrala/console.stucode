import PropTypes from "prop-types";
import { HiSearch } from "react-icons/hi";

function Searcher({ value, placeholder, onChange }) {
  return (
    <section className="flex justify-between items-center">
      <div className="relative w-64">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </section>
  );
}

Searcher.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Searcher;
