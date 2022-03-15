import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Navigate, useNavigate } from 'react-router'
import { useActions } from '../hooks/useActions'

const validationSchema = yup.object().shape({
	title: yup.string().required(),
	text: yup.string().required(),
})

interface FormState {
	title: string
	text: string
}
const initialValues: FormState = {
	title: '',
	text: '',
}

export const Create = () => {
	const isAuthorized = useTypedSelector((state) => state.login.isAuthorized)

	let navigate = useNavigate()

	const { createPost } = useActions()

	const { loading } = useTypedSelector((state) => ({
		loading: state.posts.loading,
	}))

	if (!isAuthorized) {
		return <Navigate to='/login' />
	}

	const onSubmit = async (formState: FormState) => {
		createPost({
			title: formState.title,
			text: formState.text,
			cb: (id) => {
				navigate(`../posts/${id}`, { replace: true })
			},
		})
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
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
					<h1 className='create-title'>Create post</h1>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='title'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.title}
							placeholder='Title'
						/>
						<p>{errors.title && touched.title && errors.title}</p>
						<textarea
							rows={4}
							name='text'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.text}
							placeholder='Text'
						/>
						<p>{errors.text && touched.text && errors.text}</p>
						<button
							type='submit'
							disabled={Boolean(
								Object.values(errors).length && loading
							)}
						>
							Create
						</button>
					</form>
					{loading ? (
						<p className='create-loading'>Loading...</p>
					) : (
						''
					)}
				</div>
			)}
		</Formik>
	)
}
