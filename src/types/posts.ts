export interface PostsState {
	posts: any[]
	loading: boolean
	error: null | string
	total: Nullable<number>
}

export enum PostActionTypes {
	FETCH_POSTS_INIT = 'FETCH_POSTS_INIT',
	FETCH_POSTS_DONE = 'FETCH_POSTS_DONE',
	FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL',
}

interface FetchPostsActionInit {
	type: PostActionTypes.FETCH_POSTS_INIT
}

interface FetchPostsActionDone {
	type: PostActionTypes.FETCH_POSTS_DONE
	payload: any;
}

interface FetchPostsActionError {
	type: PostActionTypes.FETCH_POSTS_FAIL
	payload: string
}

export type PostAction =
	| FetchPostsActionInit
	| FetchPostsActionDone
	| FetchPostsActionError
