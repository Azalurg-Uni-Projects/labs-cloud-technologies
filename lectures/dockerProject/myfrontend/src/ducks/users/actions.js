import types from './types';

export const userActionGetList = (users) => ({
  type: types.USER_LIST,
  payload: users,
});

export const userActionCreate = (userCreated) => ({
  type: types.USER_CREATE,
  payload: userCreated,
});

export const userActionEdit = (userEdited) => ({
  type: types.USER_EDIT,
  payload: userEdited,
});

export const userActionDelete = (userDeleted) => ({
  type: types.USER_DELETE,
  payload: userDeleted,
});
