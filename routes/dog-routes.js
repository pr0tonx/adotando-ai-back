const express = require('express');

const dogController = require('../controllers/dog-controller');
const validate = require('../middlewares/validate');
const {
  createDogSchema,
  getAllDogsSchema,
  getDogByIdSchema,
  editDogSchema,
  deleteDogSchema,
  reactivateDogSchema
} = require('../schemas/dogValidatorSchemas');

const router = express.Router();

router.post('/', validate(createDogSchema), async (req, res) => dogController.createDog(req, res));
router.get('/', validate(getAllDogsSchema), async (req, res) => dogController.getAllDogs(req, res));
router.get('/:uuid', validate(getDogByIdSchema), async (req, res) => dogController.getDogById(req, res));
router.patch('/:uuid', validate(editDogSchema), async (req, res) => dogController.editDog(req, res));
router.delete('/:uuid', validate(deleteDogSchema), async (req, res) => dogController.deleteDog(req, res));
router.patch('/:uuid/reactivate-dog', validate(reactivateDogSchema), async (req, res) => dogController.reactivateDog(req, res));

module.exports = router;