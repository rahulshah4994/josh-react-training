import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { postLogin } from "./services/login.services"
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
function App() {
	const [email, setEmail] = useState<string>("eve.holt@reqres.in")
	const [password, setPassword] = useState<string>("cityslicka")
	const [emailError, setEmailError] = useState<string>("")
	const [passwordError, setPasswordError] = useState<string>("")
	const [token, setToken] = useState<string>("")

	const handleSubmit = () => {
		if (!emailRegEx.test(email)) {
			setEmailError("Please enter a valid email")
		}
		if (password.length < 6) {
			setPasswordError("Password should be greater than 6 characters")
			return
		}
		postLogin({ email, password }).then((data) => setToken(data.token))
	}

	return (
		<div className="App">
			<div>
				<input
					value={email}
					placeholder="Email"
					onChange={(e) => {
						setEmail(e.target.value)
					}}
				/>
				<p style={{ color: "red", fontSize: "10px" }}>{emailError}</p>
			</div>
			<div>
				<input
					value={password}
					placeholder="Password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<p style={{ color: "red", fontSize: "10px" }}>{passwordError}</p>
			</div>

			<button onClick={handleSubmit}>Submit</button>
			<h4>{token}</h4>
		</div>
	)
}

export default App
