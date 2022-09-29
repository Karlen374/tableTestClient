import SignUpForm from 'src/components/signUpForm/signUpForm';
import SignInForm from 'src/components/signInForm/signInForm';
import CreateForm from 'src/components/createForm/createForm';
import Modal from 'src/components/modal/modal';
import { useAppSelector } from 'src/hooks/hooks';

const AppModals = () => {
  const { createModal } = useAppSelector((store) => store.table);
  const { signUpModal, signInModal } = useAppSelector((store) => store.authorization);
  return (
    <>
      <Modal active={createModal}>
        <CreateForm />
      </Modal>
      <Modal active={signUpModal}>
        <SignUpForm />
      </Modal>
      <Modal active={signInModal}>
        <SignInForm />
      </Modal>
    </>
  );
};
export default AppModals;
