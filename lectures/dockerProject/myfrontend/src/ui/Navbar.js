import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navbarContent">
        <Link to={`/`}> Start </Link>
        <Link to={`/users`}> Users </Link>
        <Link to={`/users`}> Users </Link>
      </div>
    </div>
  );
};
export default Navbar;
