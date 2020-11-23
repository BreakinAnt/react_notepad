const Note = require('../models/note');

exports.getNote = (req, res, next) => {
    Note.findByPk(req.params.noteId)
        .then(note => {
            res.send(note.dataValues);
        }).catch(err => {
            res.send("An error has occurred.");
            console.log(err);
        });
}

exports.getNotes = (req, res, next) => {
    Note.findAll()
        .then(notes => {
            res.send(notes.map(val => {
                return val.dataValues;
                })
            );
        }).catch(err => console.log(err)
        );
}

exports.postNote = (req, res, next) => {
    const body = req.body;

    Note.create({
        title: body.title,
        text: body.text,
        author: body.author
    }).then(val => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
}

exports.putNote = (req, res, next) => {
    const fetchedBody = req.body;

    Note.findByPk(fetchedBody.id)
    .then(note => {
        note.title = fetchedBody.title;
        note.text = fetchedBody.text;
        note.author = fetchedBody.author;
        return note.save();
    }).then(val => {
        res.sendStatus(200);
    })
    .catch(err => {
        res.sendStatus(400);
        console.log(err);
    });
}

exports.deleteNote = (req, res, next) => {
    Note.findByPk(req.params.noteId)
    .then(note => {
        return note.destroy();
    })
    .then(response => {
        res.sendStatus(200);
    })
    .catch(err => {
        res.send("An error has occurred.");
        console.log(err);
    });
}