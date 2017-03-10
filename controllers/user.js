var User = require('../models/user');

exports.postUsers = function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "New user was created!", data: user });
    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    });
};

exports.getUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.putUser = function(req, res) {
    User.update({ "_id": req.user._id }, req.body,
        function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User updated!' });
        });
};

exports.deleteUser = function(req, res) {
    User.remove({
        _id: req.user._id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};

exports.getCurrentUser = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.followUser = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "followings": req.params.following_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following added!' });
        }
    );
};

exports.unfollowUser = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "followings": req.params.following_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following removed!' });
        }
    );
};


exports.addFollower = function(req, res) {
    User.findByIdAndUpdate(
        req.params.user_id, { $addToSet: { "followers": req.user._id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower added!' });
        }
    );
};

exports.removeFollower = function(req, res) {
    User.findByIdAndUpdate(
        req.params.user_id, { $pull: { "followers": req.user._id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower removed!' });
        }
    );
};

exports.followPost = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "following_posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post added!' });
        }
    );
};

exports.unfollowPost = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "following_posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post removed!' });
        }
    );
};

exports.followCategory = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "following_categories": req.params.category_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post added!' });
        }
    );
};

exports.unfollowCategory = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "following_categories": req.params.category_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post removed!' });
        }
    );
};

exports.followTag = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "following_tags": req.params.tag_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post added!' });
        }
    );
};

exports.unfollowTag = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "following_tags": req.params.tag_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post removed!' });
        }
    );
};




