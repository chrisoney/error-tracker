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
}

export default function reducer(
  state = { }, action
) {
  console.log("HIT HIT HIT HIT HIT")
  switch (action.type) {
    case GET_ERRORS:
      console.log('------------------TADOW-----------------')
      return { ...state, ...action.payload}
    default:
      console.log('WHAT ABOUT THIS HUH')
      return state;
  }
}