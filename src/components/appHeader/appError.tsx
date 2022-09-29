import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { closeAlertModal } from 'src/store/slices/authorizationSlice';
import styles from './appHeader.module.scss';

const AppError = () => {
  const { alertMessage } = useAppSelector((store) => store.authorization);
  const dispatch = useAppDispatch();
  const closeAlert = () => {
    dispatch(closeAlertModal());
  };
  if (alertMessage.alert === 'error') {
    return (
      <div className={styles.appError}>
        <h3>{alertMessage.text}</h3>
        <button onClick={closeAlert} type="button">
          <span className={styles.close}>&times;</span>
        </button>
      </div>
    );
  }
  return (
    <div className={styles.appSuccess}>
      <h3>{alertMessage.text}</h3>
      <button onClick={closeAlert} type="button">
        <span className={styles.close}>&times;</span>
      </button>
    </div>
  );
};
export default AppError;
