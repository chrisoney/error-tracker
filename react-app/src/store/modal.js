const OPEN_MODAL = "modal/open";
const CLOSE_MODAL = "modal/close";
const CURRENT_MODAL = "modal/current";
const MOUNT_MODAL = "modal/mount";
const SET_PROPS = "modal/props";

export const openModal = () => ({
  type: OPEN_MODAL
});
export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const setCurrent = (current) => ({
  type: CURRENT_MODAL,
  current
});
export const setProps = (props) => ({
  type: SET_PROPS,
  props
});

export const setModalMount = (mount) => ({
  type: MOUNT_MODAL,
  mount
});

export default function reducer(
  state = { mount: null, current: null, props: null, display: false }, action
) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, display: true };
    case CLOSE_MODAL:
      return { ...state, display: false}
    case CURRENT_MODAL:
      return { ...state, current: action.current }
    case SET_PROPS:
      return { ...state, props: action.props }
    case MOUNT_MODAL:
      return { ...state, mount: action.mount}
    default:
      return state;
  }
}