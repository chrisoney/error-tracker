const GET_ERRORS = 'errors/get_all';
const ADD_ERROR = 'errors/add';
const REMOVE_ERROR = 'errors/remove';

const getAllErrors = (errors) => ({
  type: GET_ERRORS,
  payload: errors
})

const addError = (error) => ({
  type: ADD_ERROR,
  payload: error
})

const removedError = (errorId) => ({
  type: REMOVE_ERROR,
  payload: errorId
})

export const fetchAllErrors = () => async dispatch => {
  const response = await fetch('/api/errors/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (!data.errors) dispatch(getAllErrors(data.errorsArray));
  return
}

export const addNewError = (title, description, user_id, module_id) => async dispatch => {
  const response = await fetch('/api/errors/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      user_id,
      module_id
    }),
  })
  const data = await response.json();
  if (data.errors) {
    const err = new Error('Unauthorized');
    console.log(data.errors)
    err.errors = data.errors;
    throw err;
  } else dispatch(addError(data.error));
  return
}

export default function reducer(
  state = { }, action
) {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, ...action.payload }
    case ADD_ERROR:
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}