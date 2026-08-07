import { useDiplomaList } from "../../../apis/queries/use-diploma-list";
export default function DiplomaListTable() {
  const searchParams = new URLSearchParams();
  const { isLoading, data, error } = useDiplomaList(searchParams);
  console.log(data, "data in table");
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {data.payload.data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}

          </tbody>
        </table>
      )}
    </div>
  );
}
