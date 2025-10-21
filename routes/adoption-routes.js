const express = require('express');

const {authMiddleware} = require('../middlewares/auth-middleware');
const adoptionController = require('../controllers/adoption-controller');
const validate = require('../middlewares/validate');
const {
  createAdoptionSchema,
  getAllAdoptionsSchema,
  returnAdoptionSchema
} = require('../schemas/adoptionValidatorSchemas');

const router = express.Router();

router.post('/', validate(createAdoptionSchema), authMiddleware(['user', 'company']), async (req, res) => adoptionController.createAdoption(req, res));
router.get('/', validate(getAllAdoptionsSchema), authMiddleware(['user', 'company']), async (req, res) => adoptionController.getAllAdoptions(req, res));
router.patch('/:uuid', validate(returnAdoptionSchema), authMiddleware(['user', 'company']), async (req, res) => adoptionController.returnAdoption(req, res))

module.exports = router;