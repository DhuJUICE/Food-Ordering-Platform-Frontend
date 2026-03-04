import { API_URL } from "./api-base-url";
import { setAccessToken, setRefreshToken } from '../userManagementComponents/tokenManagement/tokenManager';
import {jwtDecode} from 'jwt-decode'; // decode JWT

export const signIn = async (userName, userPassword) => {
  try {
    const response = await fetch(`${API_URL}/api/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, password: userPassword }),
    });

    const data = await response.json();

    if (data.access) {
      // Save tokens
      setAccessToken(data.access);
      setRefreshToken(data.refresh);

      // Decode JWT to get user ID
      const decoded = jwtDecode(data.access);
      const userId = decoded.user_id; // SimpleJWT uses "user_id" by default
      localStorage.setItem('userId', userId); // store it for later
	  console.log(localStorage.getItem('userId', userId));

      return { success: true };
    } else {
      return { success: false, message: 'Login failed. Please check your credentials.' };
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};