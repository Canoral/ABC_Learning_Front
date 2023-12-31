// React Hooks
import { useRef, useState } from 'react';
// Reducers
import { login } from '../../redux/store/reducers/user';
// Redux
import { useAppDispatch } from '../../redux/hooks';

function Login() {
  const dispatch = useAppDispatch();

  const loginModalRef = useRef<HTMLDialogElement | null>(null);
  const [formData, setFormData] = useState({ username: '', password: '' });

  function openModal() {
    if (loginModalRef.current) {
      loginModalRef.current.showModal();
    }
  }

  function closeModal() {
    if (loginModalRef.current) {
      loginModalRef.current.close();
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(login(formData));
    closeModal();
  }

  return (
    <div className="Login">
      <button className="btn btn-ghost w-full" onClick={openModal}>
        Se connecter
      </button>
      <dialog ref={loginModalRef} className="modal">
        <div className="modal-box">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="username"
              >
                Votre identifiant
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.username}
                  placeholder='pseudo'
                  autoComplete="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="password"
              >
                Votre mot de passe
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="mot de passe"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full m-auto block sm:w-auto px-5 py-2.5 text-center">
              Connexion
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Login;
