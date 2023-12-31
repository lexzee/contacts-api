const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Get all users
// @route GET /api/users
// @access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Create a user
// @route POST /api/users
// @access public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fields Should not be empty");
  }
  if(password !== confirmPassword){
    res.status(400);
    throw new Error("Passwords do not match");
  }
  const isRegistered = User.findOne({email});
  if (isRegistered) {
    res.status(400);
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${user}`);
  if(user){
    res.status(201).json({_id: user.id, email: user.email});
  } else {
    res.status(400);
    throw new Error("Invalid User Details");
  }
});

// @desc Get a user
// @route GET /api/users/:id
// @access public
const getUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});

// @desc Update a user
// @route PUT /api/users/:id
// @access public
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedUser);
}
);

// @desc Delete a user
// @route DELETE /api/users/:id
// @access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.remove();
  res.status(200).json({ message: "User removed" });
}
);


// @desc Login a user
// @route DELETE /api/users/:id
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("All fields are required!");
  }

  const user = await User.findOne({email});

  // compare password with hashed
  if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
      user: {
        username: user.name,
        email: user.email,
        // id: user.id
      }
    },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );
    res.status(200).json({accessToken})
  } else {
    res.status(401);
    throw new Error("email or password incorrect")
  }
  res.json({message: "Login User"});
})

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
};