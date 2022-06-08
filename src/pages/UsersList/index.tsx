
import React, { useEffect, useMemo, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom"

import { fetchUsers } from "../../services/users.services"
import { RootStateType } from "../../store"
import { User } from "../../types/users.types"
import { setUsersList } from "./action"
import { usersReducer } from "./reducer"




const UsersList = () => {
	// const [users, setUsers] = useState<User[]>([])
    const dispatch = useDispatch()
    const {users} = useSelector((state:any)=> state.usersReducer)
	const [searchText, setSearchText] = useState("")
	const [isSortAscending, setIsSortAscending] = useState(true)

	// const filteredUsers = useMemo(
	// 	() =>
	// 		users.length && users?.filter(
	// 			(user) =>
	// 				user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
	// 				user.last_name.toLowerCase().includes(searchText.toLowerCase())
	// 		),
	// 	[searchText, users]
	// )

	// const sortedUsers = useMemo(
	// 	() =>
	// 		isSortAscending
	// 			? filteredUsers.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
	// 			: filteredUsers.sort((a, b) => (a.first_name > b.first_name ? -1 : 1)),
	// 	[isSortAscending, filteredUsers]
	// )

	useEffect(() => {
		fetchUsers().then((users) => dispatch(setUsersList(users)))
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
					<th>
						First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</tr>
				{ users?.map((user : User, index : number) => (
					<tr key={user.id}>
						<td>
							<img src={user.avatar} alt={user.first_name} />
						</td>
						<td>
							<Link to={`/users/${user.id}`}>
							{user.first_name} </Link></td>
						<td>{user.last_name}</td>
						<td>{user.email}</td>
					</tr>
				))}
			</table>
		</div>
	)
}

export default UsersList