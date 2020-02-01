const express = require('express');
const { getSites, addSite } = require('../controllers/sites');

const router = express.Router();
module.exports = router;

router.route('/').get(getSites).post(addSite); 
router.get('/', (req, res)=> {
    res.send('Hello');

});
