const Like = require ("../models/likes.model.js");
const Post = require ("../models/posts.model.js");

exports.likePost = async (req, res) => {
    try {
        const {user, post} = req.body;

        // Creating new like object
        const like = new Like ({
            post, user
        });

        const savedLike = await like.save ();

        // update the post model
        const updatedPost = await Post.findByIdAndUpdate (post, {$push: {likes: savedLike._id}}, {new: true})
                            .populate ("likes"). exec ();

        res.json ({
            post: updatedPost
        });

    }

    catch (error) {
        return res.status (400).json ({
            error: "Error while liking the post"
        });
    }
} 

// Unlike post
exports.unlikePost = async (req, res) => {
    try {

        const {post, like} = req.body;

        // Find and delete from like wala collection
        const deletedLike = await Like.findOneAndDelete ({post: post, _id:like});

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate (post, {$pull: {likes: deletedLike._id}}, {new: true});

        res.json ({
            post: updatedPost,
        });


    }

    catch (error) {
        return res.status (400).json ({
            error: "Error while unliking the post"
        });
    }
}