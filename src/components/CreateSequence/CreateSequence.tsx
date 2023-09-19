// React Hooks
import { useEffect } from 'react';
// Module & Library

// Redux functions
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers actions
import { getAllCards } from '../../redux/store/reducers/card';
// Components
import Cards from '../Cards/Cards';
import Tables from '../Table/Tables';
import { useLocation, useParams } from 'react-router-dom';

import TogglerLevelButton from './TogglerLevelButton';
import {
  getOneSequence,
  resetSequenceAlert,
} from '../../redux/store/reducers/sequence';
import { resetSessionAlert } from '../../redux/store/reducers/session';

function CreateSequence() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const sequenceId = useAppSelector((state) => state.sequence.sequenceId);
  const sessionAlert = useAppSelector((state) => state.session.alert);
  const sequenceAlert = useAppSelector((state) => state.sequence.alert);

  if (location.pathname === '/sequence') {
    history.pushState(
      { name: 'exemple' },
      'pushState sequenceId',
      `/sequence/${sequenceId?.toString()}`
    );
  }
  const { id } = useParams();
  const allCards = useAppSelector((state) => state.card.cards);
  const sequence = useAppSelector((state) => state.sequence.sequence);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (!allCards && isLogged) {
      dispatch(getAllCards());
    }
    if (sessionAlert) {
      dispatch(resetSessionAlert());
      dispatch(getOneSequence(id as string));
    }

    if (sequenceAlert) {
      dispatch(resetSequenceAlert());
      dispatch(getOneSequence(id as string));
    }
  }, [dispatch, allCards, isLogged, id, sequence, sessionAlert, sequenceAlert]);

  return (
    <div className="CreateSequence flex flex-col flex-nowrap items-center gap-5">
      {allCards && isLogged && <TogglerLevelButton />}
      <Cards />
      <Tables />
    </div>
  );
}

export default CreateSequence;
