const express = require("express");
const User = require('../models/User');
const request = require('request');
const config = require('../config/production');
const Post = require('../models/Post');
const validatePostInput = require("../validators/postValidator");



exports.createPost = async function(req, res){

    try{
        debugger;
        userid = req.user.id; 

        const user = await User.findById(req.user.id).select('-password')

        const {errors,isValid} = validatePostInput(req.body);
        console.log(errors,isValid);
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        const  newPost = new Post({
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        })

        const post = await newPost.save()
        console.log(post)
        return res.json(post)

    }
    catch(err){
        console.log(err)
        return res.status(500).json({"msg":"server error"})
    }
}


exports.createComment = async function(req, res){

    try{
        userid = req.user.id; 
        const user = await User.findById(req.user.id).select('-password')
        const {errors,isValid} = validatePostInput(req.body);
        console.log(errors,isValid);
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({"msg": "Not Found."})
        } 
        const  newComment = new Post({
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        })

        post.comments.unshift(newComment)
        await post.save()
        console.log(post.comments)
        return res.json(post.comments)

    }
    catch(err){
        console.log(err)
        return res.status(500).json({"msg":"server error"})
    }

}



exports.removeComment = async function(req, res){

    try{
        userid = req.user.id; 

        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({"msg": "Not Found."})
        } 
        
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        if(!comment){
            res.status(400).json({"msg": "comment Not Found."})
        }
        if(comment.user.toString()!== req.user.id){
            return res.status(401).json({"msg": "Not Authorized."})
        }


        removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex,1)
        await post.save()
        return res.json({"msd": "message has been removed"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({"msg":"server error"})
    }

}




exports.getPosts = async function(req, res){

    try{
        posts = await Post.find().sort({date:-1})
        return res.json(posts)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"msg":"server error"})
    }
}


exports.getPostById = async function(req, res){

    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({"msg": "Not Found."})
        } 
        return res.json(post)
    }
    catch(err){
        if(err.kind=='ObjectId'){
            return res.status(400).json({"msg": "Not Found."})
        }
        console.log(err)
        return res.status(500).json({"msg":"server error"})
    }
}

exports.deletePostById = async function(req, res){

    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({"msg": "Not Found."})
        } 

        if(post.user.toString()!== req.user.id){
            return res.status(401).json({"msg": "Not Authorized."})
        }
        await post.remove()
        return res.json({"msg": "Post removed"})
    }
    catch(err){
        if(err.kind=='ObjectId'){
           return  res.status(400).json({"msg": "Not Found."})
        }
        console.log(err)
        return res.status(500).json({"msg":"server error"})
    }
}


exports.postLike = async function(req, res){

    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({"msg": "Not Found."})
        } 

        if(post.likes.filter(like=>like.user.toString() == req.user.id).length>0){
            return res.status(401).json({"msg": "post already liked"})
        }
        post.likes.unshift({user: req.user.id})
        await post.save()

        return res.json(post.likes)
    }
    catch(err){
        if(err.kind=='ObjectId'){
            return res.status(400).json({"msg": "Not Found."})
        }
        console.log(err)
        return res.status(500).json({"msg":"server error"})
    }
}


exports.postUnlike = async function(req, res){

    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({"msg": "Not Found."})
        } 

        if(post.likes.filter(like=>like.user.toString() == req.user.id).length===0){
            return res.status(401).json({"msg": "post is not liked"})
        }
        removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex,1)
        await post.save()

        return res.json(post.likes)
    }
    catch(err){
        if(err.kind=='ObjectId'){
            return res.status(400).json({"msg": "Not Found."})
        }
        console.log(err)
        return res.status(500).json({"msg":"server error"})
    }
}



