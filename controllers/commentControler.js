const Itinerary = require("../models/itinerary");

const commentsControllers = {

    addComment: async (req, res) => {
        const { itineraryId, comment } = req.body;
        const user = req.user._id;      
        //console.log(req.body)
        //console.log(comment)
        try {
            const newComment = await Itinerary.findOneAndUpdate(
                { _id: itineraryId },
                { $push: { comments: { comment: comment, userId: user } } },
                { new: true }
            ).populate("comments.userId", { nameUser: 1, photoUser: 1 });
            res.json({
                success: true,
                response: { newComment },
                message: "Thanks for your comments",
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: "Something went wrong please try again in a few seconds",
            });
        }
        //console.log(user);
        //console.log(res.json());
    },

    modifyComment: async (req, res) => {          
        //console.log(req.body)

        try {
            const newComment = await Itinerary.findOneAndUpdate(
                { "comments._id": req.params.id },
                { $set: { "comments.$.comment": req.body.comment } },//seperamos entre campos con '$'
                { new: true }
            );
            //console.log(newComment);
            res.json({
                success: true,
                response: { newComment },
                message: "Your comment has been modified",
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: true,
                message: "Something went wrong please try again in a few seconds",
            });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const deleteComment = await Itinerary.findOneAndUpdate(
                {'comments._id': req.params.id },//buscamos un comment por Id
                {
                    $pull: {//quitamos el comment
                        comments: {
                            _id: req.params.id,
                        },
                    },
                },
                { new: true }
            );
            res.json({
                success: true,
                response: { deleteComment },
                message: "Your comment has been deleted.",
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: "Something went wrong, try it again in some minutes.",
            });
        }
    },
};
module.exports = commentsControllers;