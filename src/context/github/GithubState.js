import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
	CHANGE_MAINTAINER_CLASS,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		maintainerClass: 'hidden',
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Github Users
	const searchUsers = async (text) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	};

	// Get a single Github user
	const getUser = async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};

	// Get user repos
	const getUserRepos = async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	};

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	// Animate Maintainer Class
	const animateMaintainerClass = () => {
		let flag = true;
		setInterval(() => {
			if (flag) {
				dispatch({
					type: CHANGE_MAINTAINER_CLASS,
					payload: 'badge-success',
				});
			} else {
				dispatch({
					type: CHANGE_MAINTAINER_CLASS,
					payload: 'badge-info',
				});
			}
			flag = !flag;
		}, 2000);
	};

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				maintainerClass: state.maintainerClass,
				searchUsers,
				getUser,
				getUserRepos,
				clearUsers,
				animateMaintainerClass: animateMaintainerClass,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
