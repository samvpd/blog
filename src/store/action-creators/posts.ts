import { PostAction, PostActionTypes } from '../../types/posts'
import { Dispatch } from 'redux'
import axios from 'axios'

export const fetchPosts = () => {
	return async (dispatch: Dispatch<PostAction>, getState: () => AppState) => {
		try {
			dispatch({ type: PostActionTypes.FETCH_POSTS_INIT })
			const currentState = getState()
			const skip = currentState.posts.items.length

			const response = await axios.get(
				`https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries?access_token=${process.env.REACT_APP_API_KEY}&limit=5&skip=${skip}`
			)
			dispatch({
				type: PostActionTypes.FETCH_POSTS_DONE,
				payload: response.data,
			})
		} catch (e) {
			dispatch({
				type: PostActionTypes.FETCH_POSTS_FAIL,
				payload: 'Error',
			})
		}
	}
}

export const append = (payload: IPostRaw) => ({
	type: 'APPEND',
	payload,
})
