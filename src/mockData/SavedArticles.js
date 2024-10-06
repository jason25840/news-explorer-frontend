// users array to simulate a database of users
let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to register a new user
export const registerUser = (user) => {
  const newUser = { ...user, savedArticles: [] }; // Initialize with empty saved articles array
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users)); // Save users to localStorage
  return newUser;
};

// Function to log in a user (this can be expanded later)
export const loginUser = (email, password) => {
  const user = users.find((user) => user.email === email && user.password === password);
  return user || null;
};

// Function to save an article for the logged-in user
export const saveUserArticle = (email, article) => {
  const userIndex = users.findIndex((user) => user.email === email);
  if (userIndex !== -1) {
    users[userIndex].savedArticles.push(article);
    localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
    console.log("Article saved for user:", email, article);
    return users[userIndex].savedArticles;
  }
  return [];
};

// Function to fetch saved articles for a specific user
export const fetchSavedArticlesForUser = (email) => {
  const user = users.find((user) => user.email === email);
  return user ? [...user.savedArticles] : [];
};

// Function to remove an article for the logged-in user
export const deleteUserArticle = (email, url) => {
  const userIndex = users.findIndex((user) => user.email === email);
  if (userIndex !== -1) {
    users[userIndex].savedArticles = users[userIndex].savedArticles.filter(article => article.url !== url);
    localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
    console.log("Article deleted for user:", email, url);
    return users[userIndex].savedArticles;
  }
  return [];
};