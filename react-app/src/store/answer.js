const GET_ANSWERS = 'answers/get_all';
const ADD_ANSWER = 'answers/add';
const REMOVE_ANSWER = 'answers/remove';

const getAllAnswers = (answers) => ({
  type: GET_ANSWERS,
  payload: answers
})

const addAnswer = (answer) => ({
  type: ADD_ANSWER,
  payload: answer
})

const removedAnswer = (answerId) => ({
  type: REMOVE_ANSWER,
  payload: answerId
})

export const fetchAllAnswers = () => async dispatch => {
  const response = await fetch('/api/answers/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (!data.errors) dispatch(getAllAnswers(data.answers));
  return
}

export const fetchErrorAnswers = (id) => async dispatch => {
  const response = await fetch(`/api/errors/${id}/answers`);
  const data = await response.json();
  if (!data.errors) dispatch(getAllAnswers(data.answers));
  return
};

export const addNewAnswer = (description, user_id, error_id, images) => async dispatch => {
  const formData = new FormData()
  formData.append('description', description)
  formData.append('user_id', user_id)
  formData.append('error_id', error_id)

  images.forEach((img) => formData.append('images[]', img))
  const response = await fetch('/api/answers/', {
    method: "POST",
    body: formData
  })
  const data = await response.json();
  if (data.errors) {
    const err = new Error('Error in creating answer');
    err.errors = data.errors;
    throw err;
  } else dispatch(addAnswer(data.answer));
  return
}

export default function reducer(
  state = { }, action
) {
  switch (action.type) {
    case GET_ANSWERS:
      return { ...action.payload }
    case ADD_ANSWER:
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}