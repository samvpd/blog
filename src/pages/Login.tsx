import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { login } from '../store/action-creators/login'
import { useTypedSelector } from '../hooks/useTypedSelector'

import * as yup from 'yup'
import { Navigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
	login: yup.string().required(),
	password: yup.string().min(5).max(20).required(),
})

interface FormState {
	login: string
	password: string
}
const initialValues: FormState = {
	login: '',
	password: '',
}

export const Login = () => {
	const dispatch = useDispatch()
	const { isAuthorized, errorMessage } = useTypedSelector((state) => ({
		isAuthorized: state.login.isAuthorized,
		errorMessage: state.login.error,
	}))

	if (isAuthorized) {
		return <Navigate to='/create' />
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				dispatch(login(values))
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<div className='login-container'>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='login'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.login}
							placeholder='Login'
						/>
						<p>{errors.login && touched.login && errors.login}</p>
						<input
							type='password'
							name='password'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							placeholder='Password'
						/>
						<p>
							{errors.password &&
								touched.password &&
								errors.password}
						</p>
						<button
							type='submit'
							disabled={Boolean(Object.values(errors).length)}
						>
							Log in
						</button>
					</form>
					{errorMessage ? <p>{errorMessage}</p> : null}
				</div>
			)}
		</Formik>
	)
}
