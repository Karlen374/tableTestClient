import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getTableRows, getTableRowsCount } from 'src/store/slices/tableSlice';
import AppTableIndex from './appTableIndex';
import styles from './appTable.module.scss';
import AppTablePagination from '../appTableHeader/appTablePagination';
import AppTableSortSelect from '../appTableHeader/AppTableSortSelect';

const AppTable = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const { tableData } = useAppSelector((store) => store.table);
  useEffect(() => {
    if (registeredUserData) {
      dispatch(getTableRowsCount(registeredUserData?._id));
      dispatch(getTableRows({ authorId: registeredUserData._id, page: 1, sortParam: 'default' }));
    }
  }, [registeredUserData]);
  if (!registeredUserData) {
    return (
      <div className={styles.registration}>
        <h2>Для получения доступа войдите в систему</h2>
      </div>
    );
  }
  return (
    <>
      <AppTablePagination />
      <AppTableSortSelect />
      <table className={styles.table}>
        <tbody>
          <tr className={styles.table_header}>
            <th>Дата</th>
            <th>Название</th>
            <th>Количество</th>
            <th>Расстояние</th>
          </tr>
          {
            tableData?.map((item) => <AppTableIndex key={item._id} data={item} />)
          }
        </tbody>
      </table>
    </>
  );
};
export default AppTable;
