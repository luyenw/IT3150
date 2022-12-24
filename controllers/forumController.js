const Forum = require("../models/ForumModel");
const Thread = require("../models/ThreadModel");
const Box = require("../models/BoxModel");
const constant = require("../config/constant");

exports.get_new = (req, res) => {
  Box.find({}).exec((err, boxes) => {
    res.render("pages/forum/new", { boxes: boxes });
  });
};
exports.post_new = (req, res) => {
  const forum = { title: req.body.title };
  const new_forum = new Forum(forum);
  Box.findOne({ slug: req.body.box }).exec((err, box) => {
    box.forumsID.push(new_forum._id);
    box.save();
    new_forum.boxID = box._id
    new_forum.save();
  });
  res.redirect("/");
};
exports.get_slug = (req, res) => {
  const slug_param = req.params.slug;
  let page_param = req.params.page;
  Forum.findOne({ slug: slug_param }).populate('boxID').exec((err, forum) => {
    if (forum) {
      const total_threads = forum.threadsID.length;
      const total_pages = Math.ceil(total_threads / constant.THREADS_PER_PAGE);
      if (!page_param) {
        page_param = 1;
      } else if (
        !constant.isNumeric(page_param) ||
        parseInt(page_param) > total_pages ||
        parseInt(page_param) < 0
      ) {
        res.redirect('/f/'+slug_param + '/')
      } else page_param = parseInt(page_param);
      Thread.find({ forumID: forum._id })
        .limit(constant.THREADS_PER_PAGE)
        .skip((page_param - 1) * constant.THREADS_PER_PAGE)
        .populate("userID")
        .populate({ path: "lastComment", populate: { path: "userID" } })
        .exec((err, threads) => {
          threads = threads.map((thread) => thread.toObject());
          res.render("pages/forum/index", {
            user: req.user,
            forum: forum,
            threads: threads,
            current_page: page_param,
            total_pages: total_pages
          });
        });
    } else {
      res.redirect("/");
    }
  });
};
exports.get_post_thread = (req, res) => {
  Forum.findOne({ slug: req.params.slug }).then((forum) => {
    if (forum) {
      res.render("pages/forum/new_thread", { user: req.user, forum: forum });
    } else {
      res.redirect("/");
    }
  });
};
exports.post_post_thread = (req, res) => {
  Forum.findOne({ slug: req.params.slug }).then((forum) => {
    if (forum) {
      const thread = {
        title: req.body.title,
        body: req.body.body,
        forumID: forum.id,
        userID: req.user._id,
      };
      const new_thread = new Thread(thread);
      forum.threadsID.push(new_thread._id);
      new_thread.save();
      forum.lastThread = new_thread._id;
      forum.save();
      res.redirect("/f/" + req.params.slug);
    }
  });
};
