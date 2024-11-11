import PropTypes from "prop-types";

function TableHead({ headers }) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header) => (
          <th
            key={header.key}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center">{header.label}</div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TableHead;
