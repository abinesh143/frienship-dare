const ResultTable = (props) => {
  const tableBack = [
    "table-danger",
    "table-warning",
    "table-info",
    "table-light",
    "table-secondary",
    "table-danger",
    "table-warning",
    "table-info",
    "table-light",
    "table-secondary",
  ];
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.length
            ? props.data.map((n, i) => {
                return (
                  <tr key={i} className={tableBack[i == tableBack.length ? 1 : i]}>
                    <th scope="row">{i + 1}</th>
                    <td>{n.name}</td>
                    <td>{n.score}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
