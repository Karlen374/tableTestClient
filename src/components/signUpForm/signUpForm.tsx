import { useState } from 'react';
import { useAppDispatch } from 'src/hooks/hooks';
import { closeSignUpModal, openSignInModal, signUp } from 'src/store/slices/authorizationSlice';
import styles from './signUpForm.module.scss';

const SignUpForm = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const userSignUp = () => {
    dispatch(signUp({ userName: name, password }));
    dispatch(closeSignUpModal());
    setName('');
    setPassword('');
  };
  const registrationButton = (password.length > 3 && name)
    ? (
      <button onClick={userSignUp} className={styles.signUp_button} type="button">
        Регистрация
      </button>
    ) : (
      <button disabled className={styles.signUp_button} type="button">
        Регистрация
      </button>
    );
  const validationMessage = (password.length && password.length < 4)
    ? <h5 className={styles.validateMessage}>Пароль должен содержать минимум 4 символа</h5> : null;
  return (
    <div className={styles.signUp}>
      <h2>Регистрация</h2>
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
      {validationMessage}
      <div>
        {registrationButton}
        <button type="button" onClick={() => dispatch(openSignInModal())}>
          Уже есть аккаунт ?
        </button>
      </div>
    </div>
  );
};
export default SignUpForm;
