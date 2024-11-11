import PropTypes from "prop-types";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

function Table({ headers, rows }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHead headers={headers} />
        <TableBody rows={rows} />
      </table>
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
