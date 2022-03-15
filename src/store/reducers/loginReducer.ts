const initialState: LoginState = {
	isAuthorized: false,
	error: null,
}

const login: string = process.env.REACT_APP_LOGIN!
const password: string = process.env.REACT_APP_PASSWORD!

if (!login || !password) {
	throw new Error('No login or password')
}

export const loginReducer = (state = initialState, action: any): LoginState => {
	switch (action.type) {
		case 'LOGIN': {
			const payload = action.payload as LoginPayload

			if (payload.login === login && payload.password === password)
				return {
					...state,
					isAuthorized: true,
					error: null,
				}

			return {
				...state,
				isAuthorized: false,
				error: 'Wrong login or password',
			}
		}

		case 'LOGOUT':
			return {
				...state,
				isAuthorized: false,
			}
		default:
			return state
	}
}
