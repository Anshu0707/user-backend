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

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
