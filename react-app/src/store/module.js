const GET_MODULES = 'modules/get_all';
const ADD_MODULE = 'modules/add';
const REMOVE_MODULE = 'modules/remove';

const getAllModules = (modules) => ({
  type: GET_MODULES,
  payload: modules
})

const addModule = (module) => ({
  type: ADD_MODULE,
  payload: module
})

const removedModule = (moduleId) => ({
  type: REMOVE_MODULE,
  payload: moduleId
})

export const fetchAllModules = () => async dispatch => {
  const response = await fetch('/api/modules/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (!data.errors) dispatch(getAllModules(data.modules));
}

export const addNewModule = (name) => async dispatch => {
  const formData = new FormData();
  formData.append('name', name);
  const response = await fetch('/api/modules/', {
    method: 'POST',
    body: formData,
  })
  const data = await response.json();
  if (!data.errors) dispatch(addModule(data.module));
}

export default function reducer(
  state = { }, action
) {
  switch (action.type) {
    case GET_MODULES:
      return { ...state, ...action.payload }
    case ADD_MODULE:
      const newState = { ...state }
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}