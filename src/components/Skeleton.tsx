import React, { memo } from 'react'

export const Skeleton = memo(() => (
	<div className='post-card skeleton'>
		<div className='skeleton-title skeleton-box ' />
		<div className='skeleton-text skeleton-box ' />
		<div className='skeleton-text2 skeleton-box ' />
		<div className='skeleton-date skeleton-box ' />
	</div>
))

export const SkeletonGroup = memo(
	() => (
		<>
			{Array(5)
				.fill(null)
				.map((_, i) => (
					<Skeleton key={`skeleton-${i}`} />
				))}
		</>
	),
	() => true
)
