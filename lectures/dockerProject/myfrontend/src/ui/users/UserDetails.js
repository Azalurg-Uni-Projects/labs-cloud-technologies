import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { userDelete } from '../../ducks/users/operations';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { userGetList } from '../../ducks/users/operations';
import { usersGet } from '../../ducks/users/selectors';

const UserDetails = ({ idLink, userDelete, userGetList }, props) => {
  const history = useHistory();

  function ConfirmDelete(itemToDelete) {
    const x = window.confirm('Do you want to banish this user?');
    if (x) userDelete(itemToDelete).then(history.goBack());
    else return false;
  }

  useEffect(() => {
    userGetList();
    console.log(idLink);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="userDetails">
      {idLink.map((user) => (
        <div key={user.id} className="userDataColumn">
          <div className="userData">
            <div className="userImageAndName">
              <p>{user.name}</p>
              <div className="userButtonsAndText">
                <div className="userText">
                  <p>
                    {'Favourite color: '} {user.color}
                  </p>
                </div>
                <div className="userButtons">
                  <div>
                    <Link to={`/users/form/${user.id}`}>
                      <button> {'Edit user'} </button>
                    </Link>
                    <button onClick={() => ConfirmDelete(user)}>
                      {'Delete user'}
                    </button>
                  </div>

                  <button className="button" onClick={() => history.goBack()}>
                    {'Go back'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  const idLink = state.users.filter((x) => x.id.toString() === id);
  return {
    idLink: idLink,
    users: usersGet(state),
  };
};

const mapDispatchToProps = {
  userDelete,
  userGetList,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDetails)
);
