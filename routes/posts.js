const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

router.post("/", (req, res) => {
  const { title, description } = req.body

  const post = new Post()
  post.title = title
  post.description = description
  post.save()

  return res.json({ msg: "Post added succesfully", post })
})

// router.get("/title", async (req, res) => {
//   try {
//     const title = req.body.title
//     console.log(title)
//     const post = await Post.findOne({ title: title })
//     return res.status(200).json({ msg: "Post found", post })
//   } catch (e) {
//     return res.status(400).json({ msg: "Could not find that one" })
//   }
// })

// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id)
//     return res.status(200).json(post)
//   } catch (e) {
//     return res.status(400).json({ msg: "Could not get by ID", e })
//   }
// })

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({})
    return res.status(200).json({ msg: "These are your posts", posts })
  } catch (e) {
    return res.status(400).json(e)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    return res.status(200).json({ msg: "Yoooo you deleted it", post })
  } catch (e) {
    return res.status(400).json({ msg: "Could not delete", e })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { title, description } = req.body
    const post = await Post.findByIdAndUpdate(id)
    if (post && title !== "") {
      post.title = title
      post.description = description
      post.save()
      return res
        .status(200)
        .json({ msg: "You have edited your post successfully", post })
    } else {
      return res.status(400).json({ msg: "The post does not exist" })
    }
  } catch (e) {
    return res.status(400).json({ msg: "You can't edit this bro", e })
  }
})

module.exports = router
