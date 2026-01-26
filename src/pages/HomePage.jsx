import React, { useEffect, useReducer } from "react";
import { initialState, postReducer } from "../reducers/PostReducer";
import useAxios from "../hooks/useAxios";
import { actions } from "../actions";
import PostList from "../components/posts/PostList";

function HomePage() {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { api } = useAxios();
  console.log("state", state);
  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        );
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchPost();
  }, [dispatch, api]);

  if (state.loading) return <div>Loading....</div>;
  return <div>{<PostList posts={state.posts} />}</div>;
}

export default HomePage;
