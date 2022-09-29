import { useState } from 'react';
import { useAppDispatch } from 'src/hooks/hooks';
import { closeSignInModal, openSignUpModal, signIn } from 'src/store/slices/authorizationSlice';
import styles from './signInForm.module.scss';

const SignInForm = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const userSignIn = () => {
    dispatch(signIn({ userName: name, password }));
    dispatch(closeSignInModal());
    setName('');
    setPassword('');
  };
  return (
    <div className={styles.signIn}>
      <h2>Вход</h2>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button onClick={userSignIn} className={styles.signUp_button} type="button">
          Войти
        </button>
        <button type="button" onClick={() => dispatch(openSignUpModal())}>
          Создать Аккаунт
        </button>
      </div>
    </div>
  );
};
export default SignInForm;
