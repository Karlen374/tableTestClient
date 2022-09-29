import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getFilteredTableRows } from 'src/store/slices/tableSlice';
import styles from './appTableHeader.module.scss';

const AppTableFiltration = () => {
  const [value, setValue] = useState<string>('');
  const [rowParam, setRowParam] = useState<'name' | 'count' | 'distance'>('name');
  const [comparisonParam, setComparisonParam] = useState<'equal' |'contain'|'more'|'less'>('equal');
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const changeComparisonParam = (e:any) => {
    setComparisonParam(e.target.value);
  };
  const changeRowParam = (e:any) => {
    setRowParam(e.target.value);
  };
  const changeInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (registeredUserData) {
      dispatch(getFilteredTableRows({
        authorId: registeredUserData._id,
        rowParam,
        comparisonParam,
        value: e.target.value,
      }));
    }
  };
  return (
    <>
      <label className={styles.label}>
        Выбор колонки по которой будет фильтрация:
        <select value={rowParam} onChange={changeRowParam} id="select">
          <option value="name">Названиe</option>
          <option value="count">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
      </label>
      <label className={styles.label}>
        Выбор условия:
        <select value={comparisonParam} onChange={changeComparisonParam} id="select2">
          <option value="equal">равно</option>
          <option value="contain">содержить</option>
          <option value="more">больше</option>
          <option value="less">меньше</option>
        </select>
      </label>
      <input
        className={styles.input}
        type="text"
        placeholder="значение для фильтрации"
        value={value}
        onChange={changeInputValue}
      />
    </>
  );
};
export default AppTableFiltration;
