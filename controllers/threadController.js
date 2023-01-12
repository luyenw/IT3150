const Thread = require("../models/ThreadModel");
const Comment = require("../models/CommentModel");
const constant = require("../config/constant");
const Forum = require("../models/ForumModel");

controller = {};
module.exports = (io) => {
    controller.get_slug = (req, res) => {    
        const slug_param = req.params.slug;
        let page_param = req.params.page;
        Thread.findOne({ slug: slug_param })
            .populate("userID")
            .populate({ path: "forumID", populate: { path: "boxID" } })
            .exec((err, thread) => {
                if (thread) {
                    const total_comments = thread.commentsID.length-1;
                    const total_pages = Math.ceil(
                        total_comments / constant.COMMENTS_PER_PAGE
                    );
                    if (!page_param) {
                        page_param = 1;
                    } else if (
                        !constant.isNumeric(page_param) ||
                        parseInt(page_param) > total_pages ||
                        parseInt(page_param) < 0
                    ) {
                        res.redirect("/t/" + slug_param + "/");
                    } else page_param = parseInt(page_param);
                    Comment.find({ threadID: thread._id })
                        .limit(constant.COMMENTS_PER_PAGE)
                        .skip((page_param - 1) * constant.COMMENTS_PER_PAGE)
                        .populate("userID")
                        .exec((err, cmts) => {
                            if (err) console.log(err);
                            res.render("pages/thread/index", {
                                user: req.user,
                                thread: thread,
                                comments: cmts,
                                current_page: page_param,
                                total_pages: total_pages,
                            });
                        });
                } else {
                    res.redirect("/");
                }
            });
    };
    controller.post_add_reply = (req, res) => {
        Thread.findOne({ slug: req.params.slug }).populate('userID').exec((err, thread) => {
            if (thread) {
                const comment = {
                    userID: req.user._id,
                    threadID: thread._id,
                    body: req.body.body,
                };
                const new_comment = new Comment(comment);
                new_comment.save();
                thread.commentsID.push(new_comment._id);
                thread.lastComment = new_comment._id;
                thread.save();
                Forum.findOne({ _id: thread.forumID }, (err, forum) => {
                    forum.total_messages += 1;
                    forum.save();
                });
                io.to(thread.userID.username).emit('new-notification', 'co thong bao moi')
                console.log(req.user.username + ' send to ' + thread.userID.username)
                res.redirect("/t/" + req.params.slug);
            } else {
                return res.redirect("/");
            }
        });
    };
    return controller;
};
