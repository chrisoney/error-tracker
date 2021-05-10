const GET_MESSAGES = 'messages/get_all';

const getAllMessages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages
})


export const fetchAllMessages = () => async dispatch => {
  const response = await fetch('/api/messages/');
  const data = await response.json();
  if (!data.errors) dispatch(getAllMessages(data.messages));
  return
}


export default function reducer(
  state = { }, action
) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}