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
	CREATE_INIT = 'CREATE_INIT',
	CREATE_DONE = 'CREATE_DONE',
	CREATE_FAIL = 'CREATE_FAIL',
}

interface FetchPostsActionInit {
	type: PostActionTypes.FETCH_POSTS_INIT
}

interface FetchPostsActionDone {
	type: PostActionTypes.FETCH_POSTS_DONE
	payload: any
}

interface FetchPostsActionError {
	type: PostActionTypes.FETCH_POSTS_FAIL
	payload: string
}

interface CreatePostActionInit {
	type: PostActionTypes.CREATE_INIT
}

interface CreatePostActionDone {
	type: PostActionTypes.CREATE_DONE
	payload: any
}

interface CreatePostActionError {
	type: PostActionTypes.CREATE_FAIL
	payload: any
}

export type PostAction =
	| FetchPostsActionInit
	| FetchPostsActionDone
	| FetchPostsActionError
	| CreatePostActionInit
	| CreatePostActionDone
	| CreatePostActionError
