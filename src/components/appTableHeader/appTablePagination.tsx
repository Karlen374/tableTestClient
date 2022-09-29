import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeActivePage, getTableRows } from 'src/store/slices/tableSlice';
import styles from './appTableHeader.module.scss';

const AppTablePagination = () => {
  const { pagesCount, activePage, sortParam } = useAppSelector((store) => store.table);
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const dispatch = useAppDispatch();
  const pagesCountArr = [];
  for (let i = 1; i <= Math.ceil(pagesCount / 10); i++) {
    pagesCountArr.push(i);
  }
  const changePage = (page:number) => {
    if (registeredUserData) {
      dispatch(getTableRows({ authorId: registeredUserData._id, page, sortParam }));
      dispatch(changeActivePage(page));
    }
  };
  return (
    <div className={styles.pagination}>
      {
        pagesCountArr.map((item) => {
          const showButton = (activePage === item)
            ? (
              <button onClick={() => changePage(item)} className={styles.pagination_activeBtn} type="button">
                {item}
              </button>
            )
            : (
              <button onClick={() => changePage(item)} className={styles.pagination_btn} type="button">
                {item}
              </button>
            );
          return (
            <div key={item}>
              {showButton}
            </div>
          );
        })
      }
    </div>
  );
};
export default AppTablePagination;
