// React component
import { useEffect } from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Components
import NotLogged from './NotLogged';
import NotSequences from './NotSequences';
import HasSequences from './HasSequences';
import {
  getAllSequences,
  resetAlert,
} from '../../redux/store/reducers/sequence';

function App() {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const scenarios = useAppSelector((state) => state.sequence.sequences);
  const alert = useAppSelector((state) => state.sequence.alert);

  useEffect(() => {
    if (isLogged) {
      dispatch(getAllSequences());
    }
    if (alert) {
      dispatch(getAllSequences());
      dispatch(resetAlert());
    }
  }, [dispatch, isLogged, alert]);

  return (
    <div className="home">
      {!isLogged && <NotLogged />}
      {isLogged && scenarios.length === 0 && <NotSequences />}
      {isLogged && scenarios.length > 0 && <HasSequences />}
    </div>
  );
}

export default App;
