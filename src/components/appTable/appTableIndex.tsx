import { ITableData } from 'src/types/ITableData';

interface AppTableIndexProps{
  data:ITableData;
}
const AppTableIndex = ({ data }: AppTableIndexProps) => {
  return (
    <tr>
      <td>{data.date}</td>
      <td>{data.name}</td>
      <td>{data.count}</td>
      <td>{data.distance}</td>
    </tr>
  );
};
export default AppTableIndex;
