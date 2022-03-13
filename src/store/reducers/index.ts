import { combineReducers } from 'redux'
import { postsReducer } from './postsReducer'
import { loginReducer } from './loginReducer'

export const rootReducer = combineReducers<AppState>({
	posts: postsReducer,
	login: loginReducer,
})
