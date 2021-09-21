const express = require('express');
const router = express.Router();

const {
  getResourcesList,
  getResource,
  createResource,
  updateResource,
  deleteResource,
} = require('../controllers/resource.controller');

router.route('/resources/:category').get(getResourcesList);
router.route('/resources/:category').post(createResource);
router
  .route('/resources/:category/:_id')
  .get(getResource)
  .put(updateResource)
  .delete(deleteResource);

module.exports = router;
