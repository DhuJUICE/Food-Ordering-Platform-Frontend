import { API_URL } from "./api-base-url";

// Since JWT is now HttpOnly, we no longer save it manually
// You just store userId from backend response
export const signIn = async (userName, userPassword) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({ username: userName, password: userPassword }),
	  credentials: "include"
    });

    const data = await response.json();

    if (data.message === "Login successful" && data.user_id) {
      // Save userId in localStorage for frontend usage
      localStorage.setItem('userId', data.user_id);
      console.log("Logged in userId:", localStorage.getItem('userId'));

      return { success: true };
    } else {
      return { success: false, message: 'Login failed. Please check your credentials.' };
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};