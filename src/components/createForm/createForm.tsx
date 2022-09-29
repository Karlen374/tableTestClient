import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { closeCreateModal, createRow } from 'src/store/slices/tableSlice';
import { v4 as uuidv4 } from 'uuid';
import styles from './createForm.module.scss';

const CreateForm = () => {
  const [date, setDate] = useState<string>('2020-12-12');
  const { registeredUserData } = useAppSelector((store) => store.authorization);
  const [name, setName] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [distance, setDistance] = useState<number>(1);
  const dispatch = useAppDispatch();
  const createNewRow = () => {
    if (count && distance && registeredUserData?._id) {
      dispatch(createRow({
        date,
        name,
        count,
        distance,
        authorId: registeredUserData?._id,
        _id: uuidv4(),
      }));
    }
    dispatch(closeCreateModal());
  };
  return (
    <div className={styles.createForm}>
      <input
        type="date"
        name="trip-start"
        className={styles.createForm_date}
        value={date}
        size={200}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Количество"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Расстояние"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <div>
        <button
          type="button"
          className={styles.createForm_saveButton}
          onClick={createNewRow}
        >
          Сохранить
        </button>
        <button
          type="button"
          className={styles.createForm_cancelButton}
          onClick={() => dispatch(closeCreateModal())}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};
export default CreateForm;
