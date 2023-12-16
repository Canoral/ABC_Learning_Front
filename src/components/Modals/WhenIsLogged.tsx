// React Router
import { Link, useNavigate } from 'react-router-dom';
// Redux
import { useAppDispatch } from '../../redux/hooks';
// Reducers actions
import { logout } from '../../redux/store/reducers/user';
// Module & Library

import CreateSequence from '../Modals/CreateSequence';

function WhenIsLogged() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="whenIsLogged">
      <CreateSequence />
      <button className="btn btn-ghost w-full">
        <a href="/admin">Profil</a>
      </button>
      <button
        className="btn btn-ghost w-full"
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
      >
        <Link to="/">Déconnexion</Link>
      </button>
    </div>
  );
}

export default WhenIsLogged;
