import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { openCreateModal } from 'src/store/slices/tableSlice';
import { openSignUpModal, signOut } from 'src/store/slices/authorizationSlice';
import styles from './appHeader.module.scss';
import AppModals from './appModals';

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const openModal = () => {
    dispatch(openCreateModal());
  };
  const openSignUpModalForm = () => {
    dispatch(openSignUpModal());
  };
  const content = registeredUserData
    ? (
      <div className={styles.header_profile}>
        <h3>{registeredUserData.userName}</h3>
        <button onClick={() => dispatch(signOut())} className={styles.header_signOut} type="button">
          Выйти
        </button>
      </div>
    ) : (
      <button className={styles.header_button} onClick={openSignUpModalForm} type="button">
        Регистрация
      </button>
    );
  return (
    <div className={styles.header}>
      {registeredUserData
      && (
      <button onClick={openModal} className={styles.header_button} type="button">
        Добавить
      </button>
      )}
      {content}
      <AppModals />
    </div>
  );
};
export default AppHeader;
