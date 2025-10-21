const express = require('express');

const {authMiddleware} = require('../middlewares/auth-middleware');
const dogController = require('../controllers/dog-controller');
const validate = require('../middlewares/validate');
const {
  createDogSchema,
  getAllDogsSchema,
  getDogByIdSchema,
  editDogSchema,
  deleteDogSchema,
  reactivateDogSchema,
  deleteDogImageSchema
} = require('../schemas/dogValidatorSchemas');

const router = express.Router();

router.post('/', validate(createDogSchema), authMiddleware(['user', 'company']), async (req, res) => dogController.createDog(req, res));
router.get('/', validate(getAllDogsSchema), authMiddleware(['user', 'company']), async (req, res) => dogController.getAllDogs(req, res));
router.get('/:uuid', validate(getDogByIdSchema), authMiddleware(['user', 'company']), async (req, res) => dogController.getDogById(req, res));
router.patch('/:uuid', validate(editDogSchema), authMiddleware(['user', 'company']), async (req, res) => dogController.editDog(req, res));
router.delete('/:uuid', validate(deleteDogSchema), authMiddleware(['user', 'company']), async (req, res) => dogController.deleteDog(req, res));
router.patch('/:uuid/reactivate-dog', validate(reactivateDogSchema), authMiddleware(['user', 'company']), async (req, res) => dogController.reactivateDog(req, res));

router.delete('/dogs-image/:uuid', validate(deleteDogImageSchema), authMiddleware(['user', 'company']), async (req, res) => dogController.deleteDogImage(req, res));

module.exports = router;