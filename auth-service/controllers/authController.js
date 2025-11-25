import axios from "axios";
import { registerUser, loginUser } from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // 1. Call user-creation microservice (port 3000)
    let userResponse;
    try {
      userResponse = await axios.post("http://localhost:3000/users/create", {
        name,
        email,
      });
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({
          success: false,
          message: error.response.data.message || "User creation failed",
        });
      }
      // Fallback for other errors
      return res.status(500).json({
        success: false,
        message: "User creation failed",
      });
    }

    // Extract userId from user-creation-service
    const userId = userResponse.data.data.id;

    // 2. Register auth-user using NEW userId
    const authUser = await registerUser(userId, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId,
      email: authUser.email,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(400).json({
      success: false,
      message: err.message || "Registration failed",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate credentials (from auth_users table)
    const user = await loginUser(email, password);

    // Generate JWT containing userId + email
    const token = generateToken({ id: user.id, email: user.email });

    return res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message || "Invalid credentials",
    });
  }
}
