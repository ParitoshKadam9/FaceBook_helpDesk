const express = require('express')
const router = express.Router()

const {postWebhook, getWebHook, postWeb} = require('../controllers/hook')

router.route('/endpoint').post(postWebhook)
router.route('/getWebHook').get(getWebHook)
router.route("/postWebHook").post(postWeb);

module.exports = router