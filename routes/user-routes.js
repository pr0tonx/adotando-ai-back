const express = require('express');

const {authMiddleware} = require('../middlewares/auth-middleware');
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
router.get('/', validate(getAllUsersSchema), authMiddleware(['user', 'company']), async (req, res) => userController.getAllUsers(req, res));
router.get('/:uuid', validate(getUserByIdSchema), authMiddleware(['user', 'company']), async (req, res) => userController.getUserById(req, res));
router.patch('/:uuid', validate(updateUserSchema), authMiddleware(['user', 'company']), async (req, res) => userController.updateUser(req, res));
router.patch('/:uuid/reset-password', validate(updateUserPasswordSchema), authMiddleware(['user', 'company']), async (req, res) => userController.updateUserPassword(req, res));
router.delete('/:uuid', validate(deleteUserSchema), authMiddleware(['user', 'company']), async (req, res) => userController.deleteUser(req, res));
router.patch('/:uuid/reactivate-user', validate(reactivateUserSchema), authMiddleware(['user', 'company']), async (req, res) => userController.reactivateUser(req, res));

module.exports = router;