const BASE_URL = 'http://localhost:3001';
const TOKEN_KEY = 'jwt';

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

//const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Error ${res.statusText}`);
const checkResponse = (response, data) => {
  if (!response.ok) {
    return Promise.reject(data || new Error(`Error: ${response.statusText}`));
  }
  return data;
};

const request = (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return fetch(`${BASE_URL}${url}`, { ...options, headers })
    .then(async (response) => {
      if (response.status === 204) {
        // Handle empty response (204 No Content)
        return null;
      }
      const data = await response.json();
      return checkResponse(response, data);
    });
};

export const register = (email, password, name) => 
  request('/api/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });

export const login = (email, password) => 
  request('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }).then(data => {
    setToken(data.token); 
    return data;
  });

  export const logout = () => {
    console.log('Making logout request');
    return request('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      removeToken(); 
    });
  };

export const getUser = () => request('/api/users/me', { method: 'GET' });

export const saveArticle = (article) => 
  request('/api/articles', {
    method: 'POST',
    body: JSON.stringify(article),
  });

export const deleteArticle = (id) => 
  request(`/api/articles/${id}`, { method: 'DELETE' });

export const getArticles = () => 
  request('/api/articles', { method: 'GET' });

