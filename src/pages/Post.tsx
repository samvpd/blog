import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Skeleton } from '../components/Skeleton'

import { PostAbout } from '../components/PostAbout'

export const Post: FC = () => {
	const [data, setData] = useState<Nullable<IPostRaw>>(null)
	const [loading, setLoading] = useState(true)

	const { id } = useParams()

	const getData = async () => {
		try {
			const resp = await axios.get<IPostRaw>(
				`https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries/${id}?access_token=${process.env.REACT_APP_API_KEY}`
			)
			setData(resp.data)
			setLoading(false)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	if (loading || !data) {
		return (
			<div className='post-about-container'>
				<Skeleton />
			</div>
		)
	}
	return (
		<div className='post-about-container'>
			<PostAbout {...data} />
		</div>
	)
}
