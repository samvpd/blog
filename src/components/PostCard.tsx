import React, { FC } from 'react'
import { format } from 'date-fns'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface Props {
	id: string
}
export const PostCard: FC<Props> = ({ id }) => {
	const { fields, sys } = useTypedSelector((state) => state.posts.map[id])
	const { title, text } = fields
	const { createdAt } = sys

	const subString = (str: string, n: number): string => {
		return str && str.length > n ? str.substr(0, n - 1) + '...' : str
	}
	return (
		<div className='post-card'>
			<h1>{title}</h1>
			<p className='text'>{subString(text, 200)}</p>
			<p className='date'>
				{format(new Date(createdAt), 'DD.MM.YYYY, HH:mm')}
			</p>
		</div>
	)
}
