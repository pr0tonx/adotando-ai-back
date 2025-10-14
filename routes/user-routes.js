const express = require('express');

const userController = require('../controllers/user-controller');
const validate = require('../middlewares/validate');
const {
  createUserSchema,
  getAllUsersSchema,
  getUserByIdSchema,
  updateUserSchema,
  updateUserPasswordSchema,
  deleteUserSchema,
  reactivateUserSchema
} = require('../schemas/userValidatorSchemas');

const router = express.Router();

router.post('/', validate(createUserSchema), async (req, res) => userController.createUser(req, res));
router.get('/', validate(getAllUsersSchema), async (req, res) => userController.getAllUsers(req, res));
router.get('/:uuid', validate(getUserByIdSchema), async (req, res) => userController.getUserById(req, res));
router.patch('/:uuid', validate(updateUserSchema), async (req, res) => userController.updateUser(req, res));
router.patch('/:uuid/reset-password', validate(updateUserPasswordSchema), async (req, res) => userController.updateUserPassword(req, res));
router.delete('/:uuid', validate(deleteUserSchema), async (req, res) => userController.deleteUser(req, res));
router.patch('/:uuid/reactivate-user', validate(reactivateUserSchema), async (req, res) => userController.reactivateUser(req, res));

module.exports = router;