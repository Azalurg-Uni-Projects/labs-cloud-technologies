import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userGetList } from '../../ducks/users/operations';
import { usersGet } from '../../ducks/users/selectors';

const UserList = ({ users, userGetList }, props) => {
  const [menuOn, setMenu] = useState(false);

  useEffect(() => {
    userGetList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [filter, setFilter] = useState('');
  const filterHandleChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContent = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="userContainer">
      <div className="userMenu">
        {menuOn === true ? (
          <div className="functionsMenu">
            <div className="filterContainer">
              <input
                type="text"
                value={filter}
                className="filterInput"
                onChange={filterHandleChange}
                placeholder="Filter users by name..."
              />
            </div>
          </div>
        ) : null}
        <button
          className="functionsMenuButton"
          onClick={() => setMenu(!menuOn)}
        >
          {menuOn === true ? <p>Hide menu</p> : <p>Show menu</p>}
        </button>
      </div>
      <div className="userList">
        {filteredContent.map((element) => {
          return (
            <div key={element.id} className="tileContainer">
              <div className="userNickname">{element.name}</div>
              <Link to={`/users/${element.id}`}>
                <div className="userProfilePic">{element.name.charAt(0)}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: usersGet(state),
  };
};

const mapDispatchToProps = {
  userGetList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
