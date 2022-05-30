import React, { useEffect, useMemo, useReducer, useState } from "react"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"

import "./App.css"
import { postLogin } from "./services/login.services"
import { fetchUsers } from "./services/users.services"
import { User } from "./types/users.types"
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

interface LoginFormState {
	email: {
		value: string
		error: string
		touched: boolean
	}
	password: {
		value: string
		error: string
		touched: boolean
	}
}

interface ReducerAction {
	type: string
	payload?: any
}

const loginFormReducer = (state: LoginFormState, action: ReducerAction) => {
	switch (action.type) {
		case "EMAIL_CHANGE":
			let updatedEmailPayload = { value: action.payload, error: "" }
			if (!emailRegEx.test(action.payload)) {
				updatedEmailPayload.error = "Please enter a valid email"
			}
			return { ...state, email: { ...state.email, ...updatedEmailPayload } }
		case "PASSWORD_CHANGE":
			let updatedPasswordPayload = { value: action.payload, error: "" }
			if (action.payload.length < 6) {
				updatedPasswordPayload.error = "Password should be greater than 6 characters"
			}
			return { ...state, password: { ...state.password, ...updatedPasswordPayload } }
		case "SET_EMAIL_TOUCHED":
			return { ...state, email: { ...state.email, touched: true } }
		case "SET_PASSWORD_TOUCHED":
			return { ...state, password: { ...state.password, touched: true } }
		default:
			return state
	}
}

const Login = () => {
	const navigate = useNavigate()
	const [token, setToken] = useState<string>("")
	const [loginFormState, dispatch] = useReducer(loginFormReducer, {
		email: { value: "eve.holt@reqres.in", error: "", touched: false },
		password: { value: "cityslicka", error: "", touched: false },
	})

	const handleSubmit = () => {
		postLogin({ email: loginFormState.email.value, password: loginFormState.password.value })
			.then((data) => {
				setToken(data.token)
				return data
			})
			.then((data) => {
				console.log(data)
				navigate("/users")
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className="App">
			<div>
				<input
					value={loginFormState.email.value}
					placeholder="Email"
					onChange={(e) => {
						dispatch({
							type: "EMAIL_CHANGE",
							payload: e.target.value,
						})
					}}
					onBlur={() => dispatch({ type: "SET_EMAIL_TOUCHED", payload: "email" })}
				/>
				{loginFormState.email.touched && (
					<p style={{ color: "red", fontSize: "10px" }}>{loginFormState.email.error}</p>
				)}
			</div>
			<div>
				<input
					value={loginFormState.password.value}
					placeholder="Password"
					type="password"
					onChange={(e) => dispatch({ type: "PASSWORD_CHANGE", payload: e.target.value })}
					onBlur={() => dispatch({ type: "SET_PASSWORD_TOUCHED", payload: "password" })}
				/>
				{loginFormState.password.touched && (
					<p style={{ color: "red", fontSize: "10px" }}>{loginFormState.password.error}</p>
				)}
			</div>

			<button onClick={handleSubmit}>Submit</button>
			<h4>{token}</h4>
		</div>
	)
}

const UsersList = () => {
	const [users, setUsers] = useState<User[]>([])
	const [searchText, setSearchText] = useState("")
	const [isSortAscending, setIsSortAscending] = useState(true)

	const filteredUsers = useMemo(
		() =>
			users.filter(
				(user) =>
					user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
					user.last_name.toLowerCase().includes(searchText.toLowerCase())
			),
		[searchText, users]
	)

	const sortedUsers = useMemo(
		() =>
			isSortAscending
				? filteredUsers.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
				: filteredUsers.sort((a, b) => (a.first_name > b.first_name ? -1 : 1)),
		[isSortAscending, filteredUsers]
	)

	useEffect(() => {
		fetchUsers().then((users) => setUsers(users))
	}, [])

	return (
		<div>
			<h3>Users List Page</h3>
			<input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
			<button onClick={() => setIsSortAscending((p) => !p)}>
				{isSortAscending ? "Sort: Descending" : "Sort: Ascending"}
			</button>
			<table>
				<tr>
					<th>Avatar</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</tr>
				{sortedUsers.map((user, index) => (
					<tr key={user.id}>
						<td>
							<img src={user.avatar} alt={user.first_name} />
						</td>
						<td>{user.first_name}</td>
						<td>{user.last_name}</td>
						<td>{user.email}</td>
					</tr>
				))}
			</table>
		</div>
	)
}

function App() {
	return (
		<BrowserRouter>
			<div>
				<h1>JOSH REACT TRAINING</h1>
			</div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/users" element={<UsersList />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
