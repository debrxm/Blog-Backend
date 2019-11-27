const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: '905958',
    key: 'e57d1047972bccbd25e9',
    secret: '50584abf7c7b27be1467',
    cluster: 'eu',
    encrypted: true
});
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cors());

app.post('/comment', (req, res) => {
    const newComment = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        commented_at: req.body.commented_at
    };
    pusher.trigger('blog', 'comment', newComment);
    res.status(201).json({
        created: true,
        data: newComment
    });
});

module.exports = app;

app.listen(9000, () => {
    console.log('Example app listening on port 9000!');
});