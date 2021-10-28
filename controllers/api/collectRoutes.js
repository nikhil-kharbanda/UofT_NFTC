const router = require('express').Router();
const { Collect, Comment } = require('../../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // find all collect for logged in user
  try {
    const newCollect = await Collect.findAll(
    // be sure to include its associated comments
    {include: [{ model: Comment }],
    where: {
        id:req.params.id
    },
    user_id: req.session.user_id, 
  })      
    
    res.status(200).json(newCollect);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newCollect = await Collect.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newCollect);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find all collect for logged in user
    try {
      const newCollect = await Collect.findbyPK(
      // be sure to include its associated comments
      {include: [{ model: Comment }],
      where: {
          id:req.params.id
      },
      user_id: req.session.user_id, 
    })      
      
      res.status(200).json(newCollect);
    } catch (err) {
      res.status(500).json(err);
    }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const newCollect = await Collect.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!newCollect) {
      res.status(404).json({ message: 'No collect found with this id!' });
      return;
    }

    res.status(200).json(newCollect);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
module.exports = router;