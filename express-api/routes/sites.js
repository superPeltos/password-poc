var express = require('express');
var router = express.Router();
var SiteService = require('../services/service.site');

/* GET customer listing. */
router.get('/', async function(req, res, next)
{
  res.json({error: "Invalid Customer UID."});
});

/* adds a new customer to the list */
router.post('/', async (req, res, next) =>
{
  const body = req.body;

  try
  {
    const site = await SiteService.create(body);

    if(body.guid != null)
    {
      site.guid = body.guid;
    }

    res.cookie('guid', site.guid, { maxAge: 900000, httpOnly: true });

    // created the site!
    return res.status(201).json({ site: site });
  }
  catch(err)
  {
    if (err.name === 'ValidationError')
    {
      return res.status(400).json({ error: err.message });
    }

    // unexpected error
    return next(err);
  }
});

/* retrieves all sites */
router.get('/all', async (req, res, next) =>
{
  try
  {
    const sites = await SiteService.retrieveAll();
    console.log('pass Here !',sites);
    return res.json({ sites: sites });
  }
  catch(err)
  {
    // unexpected error
    return next(err);
  }
});

/* retrieves a site by uid */
router.get('/:id', async (req, res, next) =>
{
  try
  {
    const site = await SiteService.retrieve(req.params.id);
    console.log('pass Here !',site);
    return res.json({ site: site });
  }
  catch(err)
  {
    // unexpected error
    return next(err);
  }
});

/* updates the site by uid */
router.put('/:id', async (req, res, next) =>
{
  try
  {
    const site = await SiteService.update(req.params.id, req.body);

    return res.json({ site: site });
  }
  catch(err)
  {
    // unexpected error
    return next(err);
  }
});

/* removes the site from the site list by uid */
router.delete('/:id', async (req, res, next) =>
{
  try
  {
    const site = await SiteService.delete(req.params.id);

    return res.json({success: true});
  }
  catch(err)
  {
    // unexpected error
    return next(err);
  }
});

module.exports = router;
