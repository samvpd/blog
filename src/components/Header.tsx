import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { logout } from '../store/action-creators/login'

export const Header = () => {
	const dispatch = useDispatch()
	const isAuthorized = useTypedSelector((state) => state.login.isAuthorized)
	let navigate = useNavigate()

	const onLogOut = () => {
		dispatch(logout())
		navigate(`../login`, { replace: true })
	}
	return (
		<header>
			<div className='header-container'>
				<Link to='/'>
					<h1 className='main-title'>{'< Blog />'}</h1>
				</Link>
				{isAuthorized ? (
					<div className='authorized-buttons'>
						<Link to='/create'>
							<h1>{'< Create post />'}</h1>
						</Link>

						<h1 onClick={onLogOut} className='login-title'>
							{'< Log out />'}
						</h1>
					</div>
				) : (
					<Link to='/login'>
						<h1 className='login-title'>{'< Log in />'}</h1>
					</Link>
				)}
			</div>
		</header>
	)
}
