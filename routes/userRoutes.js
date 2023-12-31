const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');
const validateToken = require('../middleware/validationHandler');

// router.route('/').get(getUsers).post(createUser);
// router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/current', validateToken, getUser);

module.exports = router;