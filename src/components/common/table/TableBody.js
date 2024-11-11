import PropTypes from "prop-types";
import Row from "./Row";

function TableBody({ rows }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((row) => (
        <Row key={row.id} item={row} />
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TableBody;
