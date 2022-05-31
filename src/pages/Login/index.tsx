import React, { useEffect, useMemo, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom"

import { postLogin } from "../../services/login.services"
import { RootStateType } from "../../store"
import { setToken } from "./action"

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
	// const [token, setToken] = useState<string>("")

 
    const {token} = useSelector((state:RootStateType) => state.loginReducer)
    console.log(token)
    const reduxDispatch = useDispatch()
    
	const [loginFormState, dispatch] = useReducer(loginFormReducer, {
		email: { value: "eve.holt@reqres.in", error: "", touched: false },
		password: { value: "cityslicka", error: "", touched: false },
	})

	const handleSubmit = () => {
		postLogin({ email: loginFormState.email.value, password: loginFormState.password.value })
			.then((data) => {
                reduxDispatch(setToken(data.token))
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

export default Login