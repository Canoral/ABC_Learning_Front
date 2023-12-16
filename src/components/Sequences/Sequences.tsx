import moment from 'moment';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  deleteSequence,
  getAllSequences,
} from '../../redux/store/reducers/sequence';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import 'moment/locale/fr';

function Sequences() {
  const dispatch = useAppDispatch();
  const sequences = useAppSelector((state) => state.sequence.sequences);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const handleDeleteSequence = (sequenceId: number) => {
    dispatch(deleteSequence(sequenceId));
  };

  return (
    <div className="table-container">
      {isLogged && sequences.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nom</th>
              <th>Date de création</th>
            </tr>
          </thead>
          <tbody>
            {sequences.length > 0 &&
              sequences.map((sequence) => (
                <tr key={sequence.id}>
                  <td>
                    <button
                      className="btn bg-transparent border-none"
                      onClick={() => {
                        handleDeleteSequence(sequence.id as number);
                        localStorage.removeItem('sequence_name');
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </button>
                  </td>
                  <td>
                    <p className="table-row-link">{sequence.id}</p>
                  </td>
                  <td>
                    <p className="table-row-link">{sequence.name}</p>
                  </td>
                  <td>
                    <p className="table-row-link">
                      {moment(sequence.created_at).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </p>
                  </td>
                  <td>
                    <Link
                      to={`/sequence/${sequence.id}`}
                      className="table-row-link text-blue-700"
                      onClick={() => {
                        localStorage.setItem(
                          'sequence_name',
                          sequence.name as string
                        );
                      }}
                    >
                      Cliquez ici pour voir le scénario
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Sequences;
