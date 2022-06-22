import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { userAdd, userEdit, userGetList } from '../../ducks/users/operations';
import { usersGet } from '../../ducks/users/selectors';

const UserForm = ({ userAdd, userEdit, userGetList }, props) => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [formHeader, setFormHeader] = useState(`Creating user`);

  useEffect(() => {
    if (id !== 'add' && id !== undefined) {
      axios.get(`http://localhost:8080/users/${id}`).then((answer) => {
        setUser(answer.data);
        setFormHeader(`Editing user: ${answer.data.name}`);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    userGetList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function placeholder(type) {
    if (id !== 'add' && id !== undefined) {
      return user[type];
    }
  }

  const handleSubmit = (payload) => {
    if (id === 'add' || id === undefined) {
      console.log('POST');
      userAdd(payload);
    } else {
      console.log('PUT');
      userEdit(payload, id);
    }
  };

  const history = useHistory();

  return (
    <div className="userForm">
      <h2>{formHeader}</h2>
      <Formik
        initialValues={{
          name: `${placeholder('name') || ''}`,
          color: `${placeholder('color') || ''}`,
        }}
        onSubmit={(payload) => handleSubmit(payload)}
        enableReinitialize={true}
      >
        <Form>
          {`Name: `} <Field name="name" placeholder={placeholder('name')} />
          {`Color: `}
          <Field name="color" placeholder={placeholder('color')} />
          <button type="submit" onClick={() => history.goBack()}>
            {'Submit'}
          </button>
        </Form>
      </Formik>
      <button className="button" onClick={() => history.goBack()}>
        {'Back'}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: usersGet(state),
  };
};

const mapDispatchToProps = {
  userAdd,
  userEdit,
  userGetList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
