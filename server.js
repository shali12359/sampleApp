const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();

const route = require('./routes/api');

const PORT = process.env.PORT || 5000;



// HTTP REQUEST LOGGER
app.use(morgan('tiny'));

// CONNECT MONGO
const MONGO_URI = 'mongodb+srv://shali12359:kjksz263@mernyoutube-zhbdf.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/mern_youtube', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is Connected..!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// SAVE DATA
// const data = {
//   title: 'Post 1',
//   body: 'This is Post 1'
// };

// INSTANT OF THE MODEL
// const newBlogPost = new BlogPost(data);

// ERROR HANDLING

// newBlogPost.save((error) => {
//   if (error) {
//     console.log('Can not Save..!');
//   }
//
//   else {
//       console.log('Data has been Saved..');
//   }
// })

app.use('/api', route);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}



app.listen(PORT, console.log(`Server running on ${PORT}`));
