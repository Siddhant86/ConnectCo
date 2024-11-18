import express from 'express';
import mongoose from 'mongoose';
//import Connection from './db.js';
import 'dotenv/config'
import User from './Schema/User.js';
import Blog from './Schema/Blog.js';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import admin from 'firebase-admin';
//import serviceAccountKey from './react-js-blog-website-yt-86e29-firebase-adminsdk-eovop-6e77711d08.json' assert { type: "json" }
import { getAuth } from "firebase-admin/auth";
import fs from 'fs';
const serviceAccountKey = JSON.parse(fs.readFileSync('./react-js-blog-website-yt-86e29-firebase-adminsdk-eovop-6e77711d08.json', 'utf8'));
import aws from 'aws-sdk';

import Comment from "./Schema/Comment.js";


const server = express();
let PORT = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
})

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

const s3 = new aws.S3({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})


const generateUploadURL = async () => {

    const date = new Date();
    const imageName = `${nanoid}-${date.getTime()}.jpeg`;

    return await s3.getSignedUrlPromise('putObject', {
        Bucket: 'connectco-bucket',
        Key: imageName,
        Expires: 1000,
        ContentType: "image/jpeg"
    })
}

server.use(express.json()); //Middle ware
server.use(cors())

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const generateUsername = async (email) => {
    let username = email.split("@")[0];
    let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result)
    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";
    return username;
}

const formatDatatoSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname
    }
}

server.get('/get-upload-url', (request, response) => {
    generateUploadURL().then(url => response.status(200).json({ uploadURL: url }))
        .catch(err => {
            console.log(err.message);
            return response.status(500).json({ error: err.message })
        })
})

server.post("/signup", (req, res) => {

    console.log(req.body);
    let { fullname, email, password } = req.body;

    if (fullname.length < 3) {
        return res.status(403).json({ "error": "Fullname must be atleast 3 letters long" })
    }
    if (!email.length) {
        return res.status(403).json({ "error": "Enter Email" })
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" })
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter" })
    }
    bcrypt.hash(password, 10, async (err, hashed_password) => {
        let username = await generateUsername(email);
        let user = new User({
            personal_info: { fullname, email, password: hashed_password, username }
        })
        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u))
        })
            .catch(err => {
                if (err.code == 11000) {
                    return res.status(500).json({ "error": "Email already exists - " + err.message });
                }
                return res.status(500).json({ "error": err.message })
            })
    })
    //return res.status(200).json({"status": "Loggend In"})
})

server.post("/signin", (req, res) => {
    let { email, password } = req.body;
    User.findOne({ "personal_info.email": email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ "error": "Email not found" })
            }

            if (!user.google_auth) {
                bcrypt.compare(password, user.personal_info.password, (err, result) => {

                    if (err) {
                        return res.status(403).json({ "error": "Error occured while login please try again" });
                    }

                    if (!result) {
                        return res.status(403).json({ "error": "Incorrect password" })
                    } else {
                        return res.status(200).json(formatDatatoSend(user))
                    }

                })
            }
            else {
                return res.status(403).json({ "error": "Account was created using google.Try logging in with google." })
            }

        })
        .catch(err => {
            console.log(err.message);
            return res.status(500).json({ "error": err.message })
        })
})

server.post("/google-auth", async (req, res) => {

    let { access_token } = req.body;

    getAuth()
        .verifyIdToken(access_token)
        .then(async (decodedUser) => {

            let { email, name, picture } = decodedUser;

            picture = picture.replace("s96-c", "s384-c");

            let user = await User.findOne({ "personal_info.email": email }).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
                return u || null
            })
                .catch(err => {
                    return res.status(500).json({ "error": err.message })
                })

            if (user) { // login
                if (!user.google_auth) {
                    return res.status(403).json({ "error": "This email was signed up without google. Please log in with password to access the account" })
                }
            }
            else { // sign up

                let username = await generateUsername(email);

                user = new User({
                    personal_info: { fullname: name, email, username },
                    google_auth: true
                })

                await user.save().then((u) => {
                    user = u;
                })
                    .catch(err => {
                        return res.status(500).json({ "error": err.message })
                    })

            }

            return res.status(200).json(formatDatatoSend(user))

        })
        .catch(err => {
            return res.status(500).json({ "error": "Failed to authenticate you with google. Try with some other google account" })
        })

})

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ error: "No Access Token" })
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Access Token Invalid" })
        }

        req.user = user.id;
        next();
    })
}

// Fetch the latest published blogs, limited to 5
server.post('/latest-blogs', (req, res) => {
    
    let { page } = req.body ; 
    
    let maxLimit = 5; // Maximum number of blogs to return

    Blog.find({ draft: false }) // Filter out drafts

        .populate(
            "author",
            "personal_info.profile_img personal_info.username personal_info.fullname -_id"
        ) // Include author details

        .sort({ "publishedAt": -1 }) // Sort by the latest publish date
        
        .select("blog_id title des banner activity tags publishedAt -_id") // Select only required fields
        
        .skip((page-1)*maxLimit)

        .limit(maxLimit) // Limit results

        .then(blogs => res.status(200).json({ blogs })) // Return blogs in response

        .catch(err => res.status(500).json({ error: err.message })); // Handle errors
});

// Fetch top 5 trending blogs based on reads, likes, and publish date
server.get("/trending-blogs", (req, res) => {

    Blog.find({ draft: false }) // Filter out drafts

        .populate(
            "author",
            "personal_info.profile_img personal_info.username personal_info.fullname -_id"
        ) // Include author details

        .sort({
            "activity.total_read": -1, // Priority: Most reads
            "activity.total_likes": -1, // Secondary: Most likes
            "publishedAt": -1 // Tertiary: Latest publish date
        })

        .select("blog_id title publishedAt -_id") // Select only required fields

        .limit(5) // Limit results

        .then(blogs => res.status(200).json({ blogs })) // Return blogs in response

        .catch(err => res.status(500).json({ error: err.message })); // Handle errors
});

// Search blogs by tag, query, or author
server.post("/search-blogs", (req, res) => {

    let { tag, query, author, page, limit, eliminate_blog } = req.body; // Extract search parameters

    // Determine the query conditions dynamically based on provided parameters
    let findQuery;

    if(tag){   // Filter by tags
        findQuery = { tags: tag, draft: false, blog_id: { $ne: eliminate_blog } };
    } 
    
    else if(query){     // Search by queries given
        findQuery = { draft: false, title: new RegExp(query, 'i') } 
    } 
    
    else if(author) {    // Search by Author
        findQuery = { author, draft: false }
    }

    let maxLimit = limit ? limit : 2; // Default to 2 results per page if no limit is provided

    Blog.find(findQuery)

        .populate(
            "author",
            "personal_info.profile_img personal_info.username personal_info.fullname -_id"
        ) // Include author details

        .sort({ "publishedAt": -1 }) // Sort by latest publish date

        .select("blog_id title des banner activity tags publishedAt -_id") // Select only required fields

        .skip((page - 1) * maxLimit) // Skip for pagination

        .limit(maxLimit) // Limit results

        .then(blogs => res.status(200).json({ blogs })) // Return blogs in response

        .catch(err => res.status(500).json({ error: err.message })); // Handle errors
});

// Search for users by username with a maximum limit of 50 results
server.post("/search-users", (req, res) => {

    let { query } = req.body; // Extract search query from the request body

    User.find({ "personal_info.username": new RegExp(query, 'i') }) // Case-insensitive search on usernames

        .limit(50) // Restrict results to a maximum of 50 users

        .select(
            "personal_info.fullname personal_info.username personal_info.profile_img -_id"
        ) // Include only specific user details

        .then(users => res.status(200).json({ users })) // Return the matched users

        .catch(err => res.status(500).json({ error: err.message })); // Handle errors with a 500 status
});

// Get the total count of all non-draft blogs
server.post("/all-latest-blogs-count", (req, res) => {

    Blog.countDocuments({ draft: false }) // Count non-draft blogs

        .then(count => {
            return res.status(200).json({ totalDocs: count }); // Return the total count of blogs
        })

        .catch(err => {
            console.log(err.message); // Log error to the console
            return res.status(500).json({ error: err.message }); // Return error response
        });

});

// Get the count of blogs based on search criteria (tag, query, or author)
server.post("/search-blogs-count", (req, res) => {

    let { tag, author, query } = req.body; // Extract search parameters

    let findQuery; // Initialize the query object

    // Build the search query dynamically based on provided parameters
    if (tag) {
        findQuery = { tags: tag, draft: false }; // Filter by tag
    }

    else if (query) {
        findQuery = { draft: false, title: new RegExp(query, 'i') }; // Search by query in titles
    }

    else if (author) {
        findQuery = { author, draft: false }; // Filter by author
    }

    // Count the number of documents matching the search query
    Blog.countDocuments(findQuery)

        .then(count => {
            return res.status(200).json({ totalDocs: count }); // Return the total count of blogs
        })

        .catch(err => {
            console.log(err.message); // Log the error message to the console
            return res.status(500).json({ error: err.message }); // Return error response
        });

});

// Handle POST request to fetch user profile based on the username
server.post("/get-profile", (req, res) => {

    let { username } = req.body; // Extract username from the request body

    // Find user by username and exclude sensitive or unnecessary fields
    User.findOne({ "personal_info.username": username })

        .select("-personal_info.password -google_auth -updatedAt -blogs")

        .then(user => {
            return res.status(200).json(user); // Send user details in the response
        })

        .catch(err => {
            console.error(err); // Log error for debugging
            return res.status(500).json({ error: err.message }); // Send error response
        });
});

// Endpoint to update the user's profile image
server.post("/update-profile-img", verifyJWT, (req, res) => {

    let { url } = req.body; // Extract new profile image URL from the request body

    // Update the user's profile image based on their authenticated user ID
    User.findOneAndUpdate(
        { _id: req.user }, // Match the user by ID from the verified token
        { "personal_info.profile_img": url } // Update the profile image field
    )

        .then(() => {
            return res.status(200).json({ profile_img: url }); // Respond with the updated profile image
        })

        .catch(err => {
            return res.status(500).json({ error: err.message }); // Handle any errors
        });
});

// Endpoint to update user's profile details
server.post("/update-profile", verifyJWT, (req, res) => {

    let { username, bio, social_links } = req.body; // Extract data from the request body

    let bioLimit = 150; // Define the bio character limit

    // Validate username length
    if (username.length < 3) {
        return res.status(403).json({ error: "Username should be at least 3 letters long" });
    }

    // Validate bio length
    if (bio.length > bioLimit) {
        return res.status(403).json({ error: `Bio should not be more than ${bioLimit} characters` });
    }

    let socialLinksArr = Object.keys(social_links); // Extract social link keys for validation

    try {
        // Validate each social link's format
        for (let i = 0; i < socialLinksArr.length; i++) {

            if (social_links[socialLinksArr[i]].length) {

                let hostname = new URL(social_links[socialLinksArr[i]]).hostname; // Parse URL

                // Check if hostname matches the expected format
                if (!hostname.includes(`${socialLinksArr[i]}.com`) && socialLinksArr[i] !== 'website') {

                    return res.status(403).json({ error: `${socialLinksArr[i]} link is invalid. You must enter a full link` });

                }

            }

        }
    }

    catch (err) {
        // Handle invalid URL formatting
        return res.status(500).json({ error: "You must provide full social links with http(s) included" });
    }

    // Construct the object to update
    let updateObj = {
        "personal_info.username": username,
        "personal_info.bio": bio,
        social_links
    };

    // Update user profile in the database
    User.findOneAndUpdate({ _id: req.user }, updateObj, { runValidators: true })

        .then(() => {
            return res.status(200).json({ username }); // Respond with the updated username
        })

        .catch(err => {
            // Handle duplicate username error
            if (err.code == 11000) {
                return res.status(409).json({ error: "Username is already taken" });
            }
            // Handle other errors
            return res.status(500).json({ error: err.message });
        });
});

server.post('/create-blog', verifyJWT, (request, response) => {

    let authorId = request.user;

    let { title, des, banner, tags, content, draft } = request.body

    if (!title.length) {
        return response.status(403).json({ error: "Provide a title" })
    }

    if (!draft) {
        if (!des.length || des.length > 200) {
            return response.status(403).json({ error: "Provide a description in maximum of 200 characters" })
        }

        if (!banner.length) {
            return response.status(403).json({ error: "Provide a blog image" })
        }

        if (!content.blocks.length) {
            return response.status(403).json({ error: "Provide some blog content" })
        }

        if (!tags.length || tags.length > 7) {
            return response.status(403).json({ error: "Select some relatable tags, at max 7" })
        }
    }

    tags = tags.map(tag => tag.toLowerCase());

    let blog_id = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-').trim() + nanoid();
    console.log(blog_id);

    let blog = new Blog({
        title, des, banner, content, tags, author: authorId, blog_id, draft: Boolean(draft)
    })

    blog.save().then(blog => {

        let incrementVal = draft ? 0 : 1;

        User.findOneAndUpdate({ _id: authorId }, { $inc: { "account_info.total_posts": incrementVal }, $push: { "blogs": blog._id } })
            .then(user => {
                return response.status(200).json({ id: blog.blog_id })
            })
            .catch(err => {
                return response.status(500).json({ error: "Failed to update post count" })
            })
    })
        .catch(err => {
            return response.status(500).json({ error: err.message })
        })

})

server.post("/get-blog", (req, res) => {

    let { blog_id, draft, mode } = req.body;

    let incrementVal = mode != 'edit' ? 1 : 0;

    Blog.findOneAndUpdate({ blog_id }, { $inc : { "activity.total_reads": incrementVal } })
    .populate("author", "personal_info.fullname personal_info.username personal_info.profile_img")
    .select("title des content banner activity publishedAt blog_id tags")
    .then(blog => {

        User.findOneAndUpdate({ "personal_info.username": blog.author.personal_info.username }, { 
            $inc : { "account_info.total_reads": incrementVal }
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })

        if(blog.draft && !draft){
            return res.status(500).json({ error: 'you can not access draft blogs' })
        }

        return res.status(200).json({ blog });

    })
    .catch(err => {
        return res.status(500).json({ error: err.message });
    })

})

server.post("/like-blog", verifyJWT, (req, res) => {

    let user_id = req.user;

    let { _id, islikedByUser } = req.body;

    let incrementVal = !islikedByUser ? 1 : -1;

    Blog.findOneAndUpdate({ _id }, { $inc: { "activity.total_likes": incrementVal } })
    .then(blog => {

        if(!islikedByUser){
            let like = new Notification({
                type: "like",
                blog: _id,
                notification_for: blog.author,
                user: user_id
            })

            like.save().then(notification => {
                return res.status(200).json({ liked_by_user: true })
            })
        } else{

            Notification.findOneAndDelete({ user: user_id, blog: _id, type: "like" })
            .then(data => {
                return res.status(200).json({ liked_by_user: false })
            })
            .catch(err => {
                return res.status(500).json({ error: err.message });
            })

        }

    })

})
server.post("/isliked-by-user", verifyJWT, (req, res) => {
    
    let user_id = req.user;

    let { _id } = req.body;

    Notification.exists({ user: user_id, type: "like", blog: _id })
    .then(result => {
        return res.status(200).json({ result }) 
    })
    .catch(err => {
        return res.status(500).json({ error: err.message })
    })

}) 
server.post("/add-comment", verifyJWT, (req, res) => {

    let user_id = req.user;

    let { _id, comment, blog_author, replying_to, notification_id } = req.body;

    if(!comment.length) {
        return res.status(403).json({ error: 'Write something to leave a comment' });
    }

    // creating a comment doc
    let commentObj = {
        blog_id: _id, blog_author, comment, commented_by: user_id,
    }

    if(replying_to){
        commentObj.parent = replying_to;
        commentObj.isReply = true;
    }

    new Comment(commentObj).save().then(async commentFile => {

        let { comment, commentedAt, children } = commentFile;

        Blog.findOneAndUpdate({ _id }, { $push: { "comments": commentFile._id }, $inc : { "activity.total_comments": 1, "activity.total_parent_comments": replying_to ? 0 : 1 },  })
        .then(blog => { console.log('New comment created') });

        let notificationObj = {
            type: replying_to ? "reply" : "comment",
            blog: _id,
            notification_for: blog_author,
            user: user_id,
            comment: commentFile._id
        }

        if(replying_to){

            notificationObj.replied_on_comment = replying_to;

            await Comment.findOneAndUpdate({ _id: replying_to }, { $push: { children: commentFile._id } })
            .then(replyingToCommentDoc => { notificationObj.notification_for = replyingToCommentDoc.commented_by })

            if(notification_id){
                Notification.findOneAndUpdate({ _id: notification_id }, { reply: commentFile._id })
                .then(notificaiton => console.log('notification updated'))
            }

        }

        new Notification(notificationObj).save().then(notification => console.log('new notification created'));

        return res.status(200).json({
            comment, commentedAt, _id: commentFile._id, user_id, children
        })

    })


}) 

server.post("/get-blog-comments", (req, res) => {

    let { blog_id, skip } = req.body;

    let maxLimit = 5;

    Comment.find({ blog_id, isReply: false })
    .populate("commented_by", "personal_info.username personal_info.fullname personal_info.profile_img")
    .skip(skip)
    .limit(maxLimit)
    .sort({
        'commentedAt': -1
    })
    .then(comment => {
        console.log(comment, blog_id, skip)
        return res.status(200).json(comment);
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({ error: err.message })
    })

})

server.post("/get-replies", (req, res) => {

    let { _id, skip } = req.body;

    let maxLimit = 5;

    Comment.findOne({ _id })
    .populate({
        path: "children",
        options: {
            limit: maxLimit,
            skip: skip,
            sort: { 'commentedAt': -1 }
        },
        populate: {
            path: 'commented_by',
            select: "personal_info.profile_img personal_info.fullname personal_info.username"
        },
        select: "-blog_id -updatedAt"
    })
    .select("children")
    .then(doc => {
        console.log(doc);
        return res.status(200).json({ replies: doc.children })
    })
    .catch(err => {
        return res.status(500).json({ error: err.message })
    })

})

const deleteComments = ( _id ) => {
    Comment.findOneAndDelete({ _id })
    .then(comment => {

        if(comment.parent){
            Comment.findOneAndUpdate({ _id: comment.parent }, { $pull: { children: _id } })
            .then(data => console.log('comment delete from parent'))
            .catch(err => console.log(err));
        }

        Notification.findOneAndDelete({ comment: _id }).then(notification => console.log('comment notification deleted'))

        Notification.findOneAndUpdate({ reply: _id }, { $unset: { reply: 1 } }).then(notification => console.log('reply notification deleted'))

        Blog.findOneAndUpdate({ _id: comment.blog_id }, { $pull: { comments: _id }, $inc: { "activity.total_comments": -1 }, "activity.total_parent_comments": comment.parent ? 0 : -1 })
        .then(blog => {
            if(comment.children.length){
                comment.children.map(replies => {
                    deleteComments(replies)
                })
            }   
        })

    })
    .catch(err => {
        console.log(err.message);
    })
}

server.post("/delete-comment", verifyJWT, (req, res) => {

    let user_id = req.user;

    let { _id } = req.body;

    Comment.findOne({ _id })
    .then(comment => {

        if( user_id == comment.commented_by || user_id == comment.blog_author ){

            deleteComments(_id)

            return res.status(200).json({ status: 'done' });

        } else{
            return res.status(403).json({ error: "You can not delete this commet" })
        }

    })

})


server.listen(PORT, () => {
    console.log('listening on port-> ' + PORT);
})  