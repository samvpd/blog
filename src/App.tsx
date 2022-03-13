import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Post, Create } from './pages'
import { Header } from './components/Header'

import './App.scss'

const App: FC = () => {
	return (
		<div className='App'>
			<Header />
			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/posts/:id' element={<Post />} />
					<Route path='/login' element={<Login />} />
					<Route path='/create' element={<Create />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
