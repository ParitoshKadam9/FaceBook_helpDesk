const express = require('express')
const router = express.Router()

const {postWebhook, getWebHook, postWeb} = require('../controllers/hook')

router.route('/test').post(postWebhook)
router.route('/getWebHook').get(getWebHook)
router.route("/getWebHook").post(postWeb);

module.exports = router