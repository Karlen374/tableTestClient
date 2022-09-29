import { useHttp } from 'src/hooks/useHttp';
import { IUserDataForm } from 'src/types/IUserDataForm';

const useAuthorizationServices = () => {
  const _apiBase = 'http://localhost:5000/auth';
  const { request } = useHttp();

  const signInUser = async (data:IUserDataForm) => {
    const res = await request(`${_apiBase}/signIn`, 'POST', JSON.stringify(data));
    return res;
  };

  const signUpUser = async (data:IUserDataForm) => {
    const res = await request(`${_apiBase}/signUp`, 'POST', JSON.stringify({ ...data }));
    return res;
  };
  return {
    signInUser,
    signUpUser,
  };
};

export default useAuthorizationServices;
