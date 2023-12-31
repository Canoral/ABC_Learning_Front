// React Hooks
import { useEffect, useRef } from 'react';
// React Router
import { Link } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// Reducers actions
import { toggleDropDown } from '../../redux/store/reducers/user';
// Module & Library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBookOpen } from '@fortawesome/free-solid-svg-icons';
// Composants
import Login from '../Modals/Login';
import WhenIsLogged from '../Modals/WhenIsLogged';
// Logo
import logo from '../../assets/logo 2.png';

function Header() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.user.isOpen);
  const username = useAppSelector((state) => state.user.username);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function handleMenu() {
    dispatch(toggleDropDown(!isOpen));
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleDropDown(false));
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, dispatch]);

  return (
    <header className="flex items-center text-sm lg:navbar bg-base-300 mb-5 w-full sticky top-0 z-10">
      <div className="md:flex items-center mr-2 text lg:flex-none">
        <Link to="/" className="text-lg font-bold">
          <img src={logo} alt="logo" className="md:w-24 lg:w-28" />
        </Link>
        <p className="md:hidden lg:block lg:font-bold ml-10">
          Création de scénario d'apprentissage
        </p>
      </div>

      <div className="flex justify-end flex-1 px-2">
        <div className="md:text-sm lg:liens flex gap-5 mr-10">
          <Link to={'https://moodletoolguide.net/fr/'} target="_blank">
            Guide des outils Moodle <FontAwesomeIcon icon={faGraduationCap} />
          </Link>
          <Link
            to={'https://h5p.org/content-types-and-applications'}
            target="_blank"
          >
            Exemples H5P <FontAwesomeIcon icon={faBookOpen} />
          </Link>
        </div>
        <div className="flex items-stretch">
          {isLogged && username && (
            <p className="mr-10 font-bold">Bonjour {username}</p>
          )}
          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <button
              type="button"
              className="lg:focus:outline-none"
              onClick={handleMenu}
            >
              <span
                className={`block h-1 w-6 bg-base-content rounded-full transition-all duration-1000 transform ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`block h-1 w-6 bg-base-content rounded-full mt-1 transition-all duration-1000 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block h-1 w-6 bg-base-content rounded-full mt-1 transition-all duration-1000 transform ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
            {isOpen && (
              <div
                tabIndex={0}
                className={`lg:menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4`}
              >
                {!isLogged && <Login />}
                {isLogged && <WhenIsLogged />}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
