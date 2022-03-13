import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PostsActionCreators from '../store/action-creators/posts'

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(PostsActionCreators, dispatch)
}
