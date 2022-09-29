import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeSortParam, getTableRows } from 'src/store/slices/tableSlice';
import styles from './appTableHeader.module.scss';
import AppTableFiltration from './appTableFiltration';

const AppTableSortSelect = () => {
  const [sortValue, setSortValue] = useState<string>('default');
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const { activePage } = useAppSelector((store) => store.table);
  const dispatch = useAppDispatch();
  const changeSortValue = (e:any) => {
    setSortValue(e.target.value);
    dispatch(changeSortParam(e.target.value));
    if (registeredUserData) {
      dispatch(getTableRows({ authorId: registeredUserData._id, page: activePage, sortParam: e.target.value }));
    }
  };
  return (
    <div className={styles.sort}>
      <div className={styles.select}>
        <label>
          Сортировка:
          <select value={sortValue} onChange={changeSortValue}>
            <optgroup className={styles.select_optGroupAsc} label="По возрастанию">
              <option value="asc_name">Название</option>
              <option value="asc_count">Количество</option>
              <option value="asc_distance">Расстояние</option>
            </optgroup>
            <optgroup className={styles.select_optGroupDesc} label="По Убыванию">
              <option value="desc_name">Название</option>
              <option value="desc_count">Количество</option>
              <option value="desc_distance">Расстояние</option>
            </optgroup>
          </select>
        </label>
      </div>
      <AppTableFiltration />
    </div>
  );
};
export default AppTableSortSelect;
