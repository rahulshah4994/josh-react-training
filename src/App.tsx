import React, { useReducer, useState } from "react"

import "./App.css"
import { postLogin } from "./services/login.services"
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
		// case "SET_FIELD_VALUE":
		// 	//Handle errors
		// 	return {
		// 		...state,
		// 		[action.payload.name]: { ...state[action.payload.name], value: action.payload.value },
		// 	}
		// case "SET_FIELD_TOUCHED":
		// 	return state
		// // default:
		// // 	return state
	}
}

function App() {
	const [token, setToken] = useState<string>("")
	const [loginFormState, dispatch] = useReducer(loginFormReducer, {
		email: { value: "", error: "", touched: false },
		password: { value: "", error: "", touched: false },
	})

	const handleSubmit = () => {
		postLogin({ email: loginFormState.email.value, password: loginFormState.password.value }).then(
			(data) => setToken(data.token)
		)
	}

	console.log("HELLO", loginFormState.email, loginFormState.password)

	return (
		<div className="App">
			<div>
				<input
					value={loginFormState.email.value}
					placeholder="Email"
					onChange={(e) => {
						dispatch({
							type: "SET_FIELD_VALUE",
							payload: { name: "email", value: e.target.value },
						})
					}}
					onBlur={() => dispatch({ type: "SET_FIELD_TOUCHED", payload: "email" })}
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
					onChange={(e) =>
						dispatch({ type: "SET_FIELD_VALUE", payload: { name: "password", value: e.target.value } })
					}
					onBlur={() => dispatch({ type: "SET_FIELD_TOUCHED", payload: "password" })}
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

export default App
