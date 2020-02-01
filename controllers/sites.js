const Site = require('../models/Site');

// @desc get sites of all heritage locations
// @route get /api/v1/sites
// @access public

exports.getSites = async (req, res, next) => {
    try {
      const sites = await Site.find();
  
      return res.status(201).json({
        success: true,
        count: sites.length,
        data: sites
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

// @desc create a site
// @route POST /api/v1/sites
// @access public

exports.addSite = async (req, res, next) => {
    try{
        const site = await Site.create(req.body);
        return res.status(200).json({
            success: true,
            data: site
        })
    }
    catch (error){
        console.error(error);
        if(error.code === 11000){
            return res.status(400).json({error: 'This site already exists'});
        }
        res.status(500).json({error: 'Server Error'});
    }
};