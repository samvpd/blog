import React, { useState } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
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

		// try {
		// 	setLoading(true)
		// 	const data = {
		// 		fields: {
		// 			title: {
		// 				'en-US': formState.title,
		// 			},
		// 			text: {
		// 				'en-US': formState.text,
		// 			},
		// 		},
		// 	}
		// 	const resp = await axios.post<IPostRaw>(
		// 		`https://api.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries`,
		// 		data,
		// 		{
		// 			headers: {
		// 				authorization: `Bearer ${process.env.REACT_APP_API_CREATE_KEY}`,
		// 				'content-type':
		// 					'application/vnd.contentful.management.v1+json',
		// 				'X-Contentful-Content-Type': 'blogPost',
		// 			},
		// 		}
		// 	)
		// 	const respPublish = await axios.request<IPostRaw>({
		// 		url: `https://api.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries/${resp.data.sys.id}/published`,
		// 		method: 'PUT',
		// 		headers: {
		// 			authorization: `Bearer ${process.env.REACT_APP_API_CREATE_KEY}`,
		// 			'X-Contentful-Version': resp.data.sys.version,
		// 		},
		// 	})
		// 	setLoading(false)
		// 	navigate(`../posts/${resp.data.sys.id}`, { replace: true })
		// } catch (err) {
		// 	setError(String(err))
		// }
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
					{/* {errorMessage ? <p>{errorMessage}</p> : null} */}
					{/* {error ? <p>{error}</p> : ''} */}
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
