import { actions } from "../actions";
const initialState = {
  loading: false,
  user: null,
  posts: [],
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action?.data?.user,
        posts: action?.data?.posts,
      };
    }
    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }
    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
export { initialState, profileReducer };
