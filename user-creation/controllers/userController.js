import { createUser as createUserService } from "../services/userService.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await createUserService({ name, email });

    res.status(201).json({
      success: true,
      message: "User created",
      data: user,
    });
  } catch (error) {
    console.error(error);

    // Checking for duplicate email error
    if (error.message === "Email already exists") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
