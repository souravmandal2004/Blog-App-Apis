// importing the model
const Post = require("../models/posts.model.js");
const Comment = require("../models/comments.model.js");

// Business logic
exports.createComment = async (req, res) => {
    try {
        // fetch data from req body
        const { post, user, body } = req.body;

        // Validate input data
        if (!post || !user || !body) {
            return res.status(400).json({
                error: "Invalid input data",
            });
        }

        // Create a comment object
        const comment = new Comment({
            post,
            user,
            body,
        });

        // save the new comment into the db
        const savedComment = await comment.save();

        // We have to make sure when new comment occurs in a post then we have to update the comment array for the post
        // find the post by ID, and add the new comment to the array
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        )
            .populate("comments")       // It means that, pura object return krna na ki sirf id
            .exec();


        res.status(200).json({
            post: updatedPost,
        });

    } 
    catch (error) {
        console.error("Error while creating comment:", error);
        return res.status(500).json({
            error: "Error while creating comment",
        });
    }
};
