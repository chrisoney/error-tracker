const CHANGE_PAGE = "ui/change_page";

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  payload: page
});

const initialState = {
  page: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: action.payload }
    default:
      return state;
  }
}
