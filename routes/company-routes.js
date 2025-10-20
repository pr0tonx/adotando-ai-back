const express = require('express');

const companyController = require('../controllers/company-controller');
const validate = require('../middlewares/validate');
const {
  createCompanySchema,
  getAllCompaniesSchema,
  getCompanyByIdSchema,
  updateCompanySchema,
  updateCompanyPasswordSchema,
  deleteCompanySchema,
  reactivateCompanySchema,
  getDogsByCompanySchema
} = require('../schemas/companyValidatorSchemas');

const router = express.Router();

router.post('/', validate(createCompanySchema), async (req, res) => companyController.createCompany(req, res));
router.get('/', validate(getAllCompaniesSchema), async (req, res) => companyController.getAllCompanies(req, res));
router.get('/:uuid', validate(getCompanyByIdSchema), async (req, res) => companyController.getCompanyById(req, res));
router.patch('/:uuid', validate(updateCompanySchema), async (req, res) => companyController.updateCompany(req, res));
router.patch('/:uuid/reset-password', validate(updateCompanyPasswordSchema), async (req, res) => companyController.updateCompanyPassword(req, res));
router.delete('/:uuid', validate(deleteCompanySchema), async (req, res) => companyController.deleteCompany(req, res));
router.patch('/:uuid/reactivate-company', validate(reactivateCompanySchema), async (req, res) => companyController.reactivateCompany(req, res));

router.get('/:uuid/dogs', validate(getDogsByCompanySchema), async (req, res) => companyController.getDogsByCompany(req, res));

module.exports = router;