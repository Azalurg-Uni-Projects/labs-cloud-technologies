import axios from 'axios';
import * as actions from './actions';

const url = 'http://localhost:8080/users';

export const userGetList = () => async (dispatch, getState) => {
  if (getState().users.length) {
    console.log('Downloading from state');
    dispatch(actions.userActionGetList(getState().users));
  } else {
    console.log('Downloading from API');
    const response = await axios.get(url);
    dispatch(actions.userActionGetList(response.data));
  }
};

export const userAdd = (userToAdd) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(url, userToAdd);
      if (response.status === 200)
        dispatch(actions.userActionCreate(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const userEdit = (userToEdit, editId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${url}/${editId}`, userToEdit);
      if (response.status === 200)
        dispatch(actions.userActionEdit(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const userDelete = (userToDelete) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${url}/${userToDelete.id}`);
      if (response.status === 200)
        dispatch(actions.userActionDelete(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
