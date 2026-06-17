const express = require('express')

const noteController = require('../controllers/note.controller')

const authMiddleware = require('../middlewares/auth.middleware')


const noteRouter = express.Router()


noteRouter.post(
 '/',
 authMiddleware,
 noteController.createNoteController
)


noteRouter.get(
 '/',
 authMiddleware,
 noteController.getNotesController
)


noteRouter.delete(
 '/:id',
 authMiddleware,
 noteController.deleteNoteController
)


noteRouter.patch(
 '/:id',
 authMiddleware,
 noteController.updateNoteController
)



module.exports = noteRouter