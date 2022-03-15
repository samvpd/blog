import { PostAction, PostActionTypes } from '../../types/posts'
import { Dispatch } from 'redux'
import axios from 'axios'

interface Payload {
	title: string
	text: string
	cb: (id: string) => void
}
export const createPost = ({ title, text, cb }: Payload) => {
	return async (dispatch: Dispatch<PostAction>) => {
		try {
			dispatch({ type: PostActionTypes.CREATE_INIT })

			const data = {
				fields: {
					title: {
						'en-US': title,
					},
					text: {
						'en-US': text,
					},
				},
			}

			const resp = await axios.post<IPostRaw>(
				`https://api.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries`,
				data,
				{
					headers: {
						authorization: `Bearer ${process.env.REACT_APP_API_CREATE_KEY}`,
						'content-type':
							'application/vnd.contentful.management.v1+json',
						'X-Contentful-Content-Type': 'blogPost',
					},
				}
			)
			const respPublish = await axios.request<IPostRaw>({
				url: `https://api.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries/${resp.data.sys.id}/published`,
				method: 'PUT',
				headers: {
					authorization: `Bearer ${process.env.REACT_APP_API_CREATE_KEY}`,
					'X-Contentful-Version': resp.data.sys.version,
				},
			})

			dispatch({
				type: PostActionTypes.CREATE_DONE,
				payload: resp.data,
			})

			cb(resp.data.sys.id)
		} catch (e) {
			dispatch({
				type: PostActionTypes.CREATE_FAIL,
				payload: 'Error',
			})
		}
	}
}

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
