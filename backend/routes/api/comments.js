const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Comment, Album, Song, User } = require('../../db/models');


// Update and return an existing comment.
// authenticate: yes
// authorize: yes
router.put('/:commentId', requireAuth, async (req, res) => {
    const {userId} = req.user.id;
    const {body} = req.body;
    const { commentId } = req.params

    const edit = await Comment.findByPk(commentId, {
        attributes: ['id', 'userId', 'songId', 'body', 'createdAt', 'updatedAt']
    });

    // error handling
    if (!edit) {
        res.status(404);
        res.json({
            message: "Comment couldn't be found",
            statusCode: 404
        });
    }

    // authorization - only current user can edit songs that belong to the user
    if (edit.userId !== req.user.id) {
       res.status(403);
       res.json({
        message: "You do not have authorization to edit this comment",
        statusCode: 403
       });
    }

    // error handling
    if (!edit.body) {
        res.status(400);
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                body: "Comment body text is needed"
            }
        });
    }
    ///////////////////////

    // redundant - but good practice
    if (edit.userId === req.user.id) {
        edit.body = body;
    }

    await edit.save();
    res.json(edit);
});

// Delete an existing comment.
// authenticate: yes
// authorize: yes
router.delete('/:commentId', requireAuth, restoreUser, async (req, res) => {
    const { commentId } = req.params
    const deleteComment = await Comment.findByPk(commentId);

    // error handling
    if (!deleteComment) {
        res.status(404);
        res.json({
            message: "Comment couldn't be found",
            statusCode: 404
        });
    }

    // authorization check - current user only
    if (deleteComment.userId !== req.user.id) {
        res.status(403);
        res.json({
            message: "You do not have authorization to delete this comment",
            statusCode: 403
        });
    }
    //////////////////

    deleteComment.destroy()
    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MY USE ONLY
// get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.findAll()
    res.json(comments)
});











module.exports = router
