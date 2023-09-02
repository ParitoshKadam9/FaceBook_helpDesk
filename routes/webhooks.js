const express = require('express')
const router = express.Router()

const {postWebhook, getWebHook, postWeb, Alltxt} = require('../controllers/hook')

router.route('/test').post(postWebhook)
router.route('/getWebHook').get(getWebHook)
router.route("/getWebHook").post(postWeb);
router.route("/getMessages").get(Alltxt);

module.exports = router