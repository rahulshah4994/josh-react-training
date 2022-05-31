import React, { useEffect, useMemo, useReducer, useState } from "react"
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom"

import "./App.css"
import UserDetailsComponent from "./components/UserDetailsComponent"
import { postLogin } from "./services/login.services"
import { fetchUsers } from "./services/users.services"
import { User } from "./types/users.types"

import Login from "./pages/Login"

import UsersList from "./pages/UsersList"
import { Provider } from "react-redux"
import { store } from "./store"




function App() {
	return (
		<Provider store={store}>
		<BrowserRouter>
			<div>
				<h1>JOSH REACT TRAINING</h1>
			</div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/users" element={<UsersList />} />
				<Route path="/users/:id" element={<UserDetailsComponent/>}/>
			</Routes>
		</BrowserRouter>
		</Provider>
	)
}

export default App
