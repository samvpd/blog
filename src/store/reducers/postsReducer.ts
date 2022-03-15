import { PostActionTypes, PostAction } from '../../types/posts'

const initialState: AppState['posts'] = {
	items: [],
	total: null,
	loading: false,
	error: null,
	map: {},
}

export const postsReducer = (
	state = initialState,
	action: PostAction
): PostState => {
	switch (action.type) {
		case PostActionTypes.FETCH_POSTS_INIT:
			return {
				...state,
				loading: true,
			}
		case PostActionTypes.FETCH_POSTS_DONE:
			const payload: IEntryResponse<IPostRaw> = action.payload

			const map = payload.items.reduce(
				(acc, curr) => ({
					...acc,
					[curr.sys.id]: curr,
				}),
				state.map
			)

			const newIds = payload.items
				.map((post) => post.sys.id)
				.filter((id) => !state.items.includes(id))

			return {
				...state,
				loading: false,
				error: null,
				items: [...state.items, ...newIds],
				total: action.payload.total,
				map,
			}
		case PostActionTypes.FETCH_POSTS_FAIL:
			return { ...state, loading: false, error: action.payload }
		case PostActionTypes.CREATE_INIT:
			return {
				...state,
				loading: true,
			}
		case PostActionTypes.CREATE_DONE:
			const data = action.payload

			const newData = {
				...data,
				fields: {
					title: data.fields.title['en-US'],
					text: data.fields.text['en-US'],
				},
			}

			return {
				...state,
				loading: false,
				items: [action.payload.sys.id, ...state.items],
				map: {
					[action.payload.sys.id]: newData,
					...state.map,
				},
			}
		default:
			return state
	}
}
