import React, { FC, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'

import InfiniteScroll from 'react-infinite-scroll-component'

import { PostCard } from '../components/PostCard'
import { useActions } from '../hooks/useActions'
import { SkeletonGroup } from '../components/Skeleton'

export const Home: FC = () => {
	const { posts, total, error } = useTypedSelector((state) => ({
		posts: state.posts.items,
		total: state.posts.total,
		loading: state.posts.loading,
		error: state.posts.error,
	}))

	const { fetchPosts } = useActions()

	useEffect(() => {
		console.log('posts len: ', posts.length)
		if (!posts.length) {
			fetchPosts()
		}
	}, [posts.length])

	if (error) {
		return <h1>{error}</h1>
	}

	return (
		<div className='posts-container'>
			<InfiniteScroll
				dataLength={posts.length}
				next={fetchPosts}
				hasMore={total !== 0 && !error}
				loader={<SkeletonGroup />}
				endMessage={
					<p className='end-msg' style={{ textAlign: 'center' }}>
						You have seen all posts
					</p>
				}
			>
				{posts.map((id) => (
					<Link key={id} to={`posts/${id}`}>
						<PostCard id={id} />
					</Link>
				))}
			</InfiniteScroll>
		</div>
	)
}
