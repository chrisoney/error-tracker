const CREATE_SESSION = 'session/create';
const DESTROY_SESSION = 'session/delete';

const createSession = user = ({
  type: CREATE_SESSION,
  user
})

const destroySession = ({
  type: DESTROY_SESSION
})

export const authenticate = () => async dispatch => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (data.errors) {
    const err = new Error('Unauthorized');
    err.errors = data.errors;
    throw err;
  } else dispatch(createSession(data));
}

export const login = (email, password) => async dispatch => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  if (data.errors) {
    const err = new Error('Unauthorized');
    err.errors = data.errors;
    throw err;
  } else dispatch(createSession(data));
}

export const logout = () => async dispatch => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  dispatch(destroySession())
};


export const signUp = (username, email, password) => async dispatch => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    const err = new Error('Unauthorized');
    err.errors = data.errors;
    throw err;
  } else dispatch(createSession(data));
}

export default function reducer(
  state = { user: null, loading: false }, action
) {
  switch (action.type) {
    case CREATE_SESSION:
      return { ...state, user: action.user, loaded: true}
    case DESTROY_SESSION:
      return { ...state, user: null, loaded: true }
    default:
      return state;
  }
}