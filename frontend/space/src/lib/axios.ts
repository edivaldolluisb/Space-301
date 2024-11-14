const API_BASE_URL = 'http://localhost:8080/auth';

// Função para requisições GET
async function get(endpoint: string) {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		}
	});
	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}
	return await response.json();
}

// Função para requisições POST
async function post(endpoint: string, data: object, requiresAuth: boolean = false) {
	const headers: HeadersInit = {
		'Content-Type': 'application/json'
	};

	if (requiresAuth) {
		const token = localStorage.getItem('token');
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}
	}

	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		method: 'POST',
		headers,
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error(`Error posting data: ${response.statusText}`);
	}
	return await response.json();
}

// Função para requisições PUT
async function put(endpoint: string, id: number, data: object) {
	const response = await fetch(`${API_BASE_URL}${endpoint}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error(`Error updating data: ${response.statusText}`);
	}
	return await response.json();
}

// Função para requisições DELETE
async function del(endpoint: string) {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		}
	});
	if (!response.ok) {
		throw new Error(`Error deleting data: ${response.statusText}`);
	}
	return response.text();
}

// Funções específicas para o controlador de autenticação

// Registrar um novo usuário
async function registerUser(user: object) {
	return await post('/register', user);
}

// Login de usuário
async function loginUser(credentials: object) {
	const response = await post('/login', credentials);
	if (response.token) {
		localStorage.setItem('token', response.token);
	}
	return response;
}

// Logout do usuário
function logoutUser() {
	localStorage.removeItem('token');
}

export {
	get,
	post,
	put,
	del,
	registerUser,
	loginUser,
	logoutUser
};
