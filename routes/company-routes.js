const express = require('express');

const {authMiddleware} = require('../middlewares/auth-middleware');
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
  getDogsByCompanySchema,
  createPostSchema,
  getAllPostsSchema,
  getPostByIdSchema,
  deletePostSchema,
  getPostsByCompanySchema
} = require('../schemas/companyValidatorSchemas');

const router = express.Router();

router.post('/:uuid/post', validate(createPostSchema), authMiddleware(['user', 'company']), async (req, res) => companyController.createPost(req, res));
router.get('/posts', validate(getAllPostsSchema), authMiddleware(['user', 'company']), async (req, res) => companyController.getAllPosts(req, res));
router.get('/posts/:uuid', validate(getPostByIdSchema), authMiddleware(['user', 'company']), async (req, res) => companyController.getPostById(req, res));
router.delete('/posts/:uuid', validate(deletePostSchema), authMiddleware(['user', 'company']), async (req, res) => companyController.deletePost(req, res));
router.get('/:uuid/posts', validate(getPostsByCompanySchema), authMiddleware(['user', 'company']), async (req, res) => companyController.getPostsByCompany(req, res));

router.post('/', validate(createCompanySchema), async (req, res) => companyController.createCompany(req, res));
router.get('/', validate(getAllCompaniesSchema), authMiddleware(['user', 'company']), async (req, res) => companyController.getAllCompanies(req, res));
router.get('/:uuid', validate(getCompanyByIdSchema), authMiddleware(['user', 'company']), async (req, res) => companyController.getCompanyById(req, res));
router.patch('/:uuid', validate(updateCompanySchema), authMiddleware(['user', 'company']), async (req, res) => companyController.updateCompany(req, res));
router.patch('/:uuid/reset-password', validate(updateCompanyPasswordSchema), authMiddleware(['user', 'company']), async (req, res) => companyController.updateCompanyPassword(req, res));
router.delete('/:uuid', validate(deleteCompanySchema), authMiddleware(['user', 'company']), async (req, res) => companyController.deleteCompany(req, res));
router.patch('/:uuid/reactivate-company', validate(reactivateCompanySchema), authMiddleware(['user', 'company']), async (req, res) => companyController.reactivateCompany(req, res));

router.get('/:uuid/dogs', validate(getDogsByCompanySchema), authMiddleware(['user', 'company']), async (req, res) => companyController.getDogsByCompany(req, res));

module.exports = router;