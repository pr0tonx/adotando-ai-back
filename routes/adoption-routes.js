const express = require('express');

const adoptionController = require('../controllers/adoption-controller');
const validate = require('../middlewares/validate');
const {
  createAdoptionSchema,
  getAllAdoptionsSchema,
  returnAdoptionSchema
} = require('../schemas/adoptionValidatorSchemas');

const router = express.Router();

router.post('/', validate(createAdoptionSchema), async (req, res) => adoptionController.createAdoption(req, res));
router.get('/', validate(getAllAdoptionsSchema), async (req, res) => adoptionController.getAllAdoptions(req, res));
router.patch('/:uuid', validate(returnAdoptionSchema), async (req, res) => adoptionController.returnAdoption(req, res))

module.exports = router;