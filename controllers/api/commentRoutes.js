const router = require('express').Router();
const { Collect, Comment } = require('../../models');

router.get('/', withAuth, async(req,res) => {
    try {
        const newComment = await Comment.findAll();
        
    }
})