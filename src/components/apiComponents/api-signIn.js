import { API_URL } from "./api-base-url";

export const signIn = async (userName, userPassword) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ username: userName, password: userPassword }),
	    credentials: "include"
    });

    if (!response.ok){
      return { success: false, message: 'Login failed. Please check your credentials.' };
    }else{
      return { success: true}
    }

  } catch (error) {
    console.error('Error during sign-in:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

export const checkAuth = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth-status`, {
      method: 'GET',
      credentials: 'include', // send HttpOnly cookies
    });
    const data = await res.json();
    return data.loggedIn;
  } catch (err) {
    console.error('Auth check failed', err);
    return false;
  }
};

export const logout = async () => {
  try {
    await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return true;
  } catch (err) {
    console.error('Logout failed', err);
    return false;
  }
};