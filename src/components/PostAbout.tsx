import React, { FC } from 'react'
import { format } from 'date-fns'

export const PostAbout: FC<IPostRaw> = ({ fields, sys }) => {
	const { title, text } = fields
	const { createdAt } = sys

	return (
		<div className='post-about-card'>
			<h1>{title}</h1>
			<p className='text'>{text}</p>
			<p className='date'>
				{format(new Date(createdAt), 'DD.MM.YYYY, HH:mm')}
			</p>
		</div>
	)
}
