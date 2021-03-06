const GET_MESSAGES = 'messages/get_all';
const ADD_MESSAGE = 'messages/add';

const getAllMessages = (messages) => ({
  type: GET_MESSAGES,
  payload: messages
})

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
})

export const fetchAllMessages = () => async dispatch => {
  const response = await fetch('/api/messages/');
  const data = await response.json();
  if (!data.errors) dispatch(getAllMessages(data.messages));
  return
}

export const createNewMessage = (body, recipientId) => async dispatch => {
  const formData = new FormData();
  formData.append('body', body)
  formData.append('recipient_id', recipientId)
  const response = await fetch('/api/messages/', {
    method: 'POST',
    body: formData
  })
  const data = await response.json();
  if (data.errors) {
    const err = new Error('Error with Messages');
    err.errors = data.errors;
    throw err;
  }
  // else dispatch(addMessage(data.message));
  return
}

export const updateMessages = (ids) => async dispatch => {
  const formData = new FormData()
  ids.forEach((id) => formData.append('ids[]', id))

  const response = await fetch('/api/messages/update', {
    method: 'PUT',
    body: formData
  })
  if (response.ok) {
    console.log('success')
  } else console.log("fail lol")
  return
}

export const updateLastMessage = (senderId, recipientId) => async dispatch => {
  const formData = new FormData()
  formData.append('senderId', senderId)
  formData.append('recipientId', recipientId)

  const response = await fetch('/api/messages/last', {
    method: 'PUT',
    body: formData
  })
  if (response.ok) {
    console.log('success')
  } else console.log("fail lol")
  return
}

export default function reducer(
  state = { messages: [] }, action
) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload }
    case ADD_MESSAGE:
      return { messages: [...state.messages, action.payload]}
    default:
      return state;
  }
}