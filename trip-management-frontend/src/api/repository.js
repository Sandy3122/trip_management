import { ApiClient } from "../network/apiClient";
import { userCreation } from "./endPoints";
import { toast } from 'react-toastify'; // Import toast

class UserRepository {
  // Function to handle the register endpoint call
  registerUser = async (formData) => {
    try {
      const url = userCreation.registerUser(); // a function in userCreation for registering users
      const response = await ApiClient.post(url, formData);
      toast.success(response.message)
      return response;
    } catch (error) {
      console.error("Error during registration:", error);
      // Show error in toast
      toast.error(error);
      throw error;
    }
  };

  // Function to handle the login endpoint call
  loginUser = async (credentials) => {
    try {
      const url = userCreation.loginUser(); // a function in userCreation for login users
      const response = await ApiClient.post(url, credentials);
      toast.success("Login successful!");
      return response.result;
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

}

const userRepository = new UserRepository();
export { userRepository as UserRepository };
