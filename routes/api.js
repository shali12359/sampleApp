const express = require('express');
const BlogPost = require('../model/blogPost');

const router = express.Router();

// ROUTES
router.get('/', (req, res) => {
  BlogPost.find({}).
  then((data) => {
    console.log('Data: ', data);
      res.json(data);
  }).
  catch((error) => {
    console.log('Error: ', error);
  });
});

router.post('/save', (req,res) => {
  console.log('Body: ', req.body);

  const data = req.body;

  const newBlogPost = new BlogPost(data);

  // SAVE
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: 'Sorry, Server Error' });
      return;
    }

    return res.json({
        msg: 'Data Received..'
      });

  });
});

router.get('/api/name', (req, res) => {
  const data = {
    username: 'Shalitha',
    age: 25
  };
  res.json(data);
});


module.exports = router;
