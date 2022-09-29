import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getRegisteredUserData } from 'src/store/slices/authorizationSlice';
import AppError from '../appHeader/appError';
import AppHeader from '../appHeader/appHeader';
import AppTable from '../appTable/appTable';

const App = () => {
  const dispatch = useAppDispatch();
  const { alertStatus } = useAppSelector((store) => store.authorization);
  useEffect(() => {
    const registeredUser = localStorage.getItem('registeredUserData');
    if (registeredUser) {
      dispatch(getRegisteredUserData(JSON.parse(registeredUser)));
    }
  }, []);
  return (
    <div className="App">
      {alertStatus && <AppError />}
      <AppHeader />
      <AppTable />
    </div>
  );
};

export default App;
