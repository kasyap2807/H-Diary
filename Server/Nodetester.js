//using only user not id of document

const express = require('express');
const app = express();
const port = 1212;

const bodyparser = require('body-parser');
app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));
const cors = require('cors');
// app.use(bodyparser.json());
app.use(cors());


app.listen(port,(req,res)=>{
    console.log("tge port is listening");
});

const d = new Date();
const date = (d.getDate())+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
// const date = "25-10-2023";

const {connectDb} = require('./connection');
connectDb();

const loginschema = require('./loginschema');


app.post('/login',async (req,res)=>{
    // console.log("i am here");
    // console.log(req.body.username);
    // console.log(req.body.password);
    try{
    const data = await loginschema.find({$and:[{user:req.body.username},{password:req.body.password}]});
    // const data = await loginschema.find({user:req.body.username});
    if(data.length==1){
        // res.send("login successful");
        // login = req.body.username;
        res.json({message:'yes'});
      }
      else if(data.length>1){
        login = req.body.username;
        console.log(data)
        res.json({message:'yes'});
      // res.json({message:"yes"});
    }
    else{
      res.json(data);
    }
}
catch(error){
    res.send(error);
    console.log(error)
}



// const { user, password } = req.body;

//     try {
//         const existingUser = await loginschema.findOne({ user, password });

//         if (existingUser) {
//             // User authenticated successfully
//             return res.status(200).json({ message: 'Login successful!' });
//         } else {
//             // User not found or incorrect password
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
});


app.post('/register',async (req,res)=>{
  // console.log(req.body.username,"   ",req.body.password)
    const inserter = new loginschema({
        user: req.body.username,
        password: req.body.password,
        diary: [
        {
        date: date,
        diary: 'day one'
        },
        ],
        Image: [
        {
          date:date,
          title:"test",
          desc:"firstone",
          image:"idk"
          
        },
        ]
    })
    // inserter.save();
    // res.send("registered sucesfully");
    loginschema.findOne({ user: req.body.username })
    .then(existingUser => {
        if (existingUser) {
      // If user already exists, send a message indicating the username is taken
      res.json({message:'no'});
        }
         else {
      // Save the new user to the database
        inserter.save()
         .then(() => {
          // Send a success response
            res.json({message:'yes'});
            })
         .catch(saveError => {
          // Handle save error, for example, by sending an error response
            res.status(500).send('Error saving user');
        });
        }
    })
    .catch(err => {
    // Handle other errors, for example, by sending an error response
        res.status(500).send('Internal Server Error');
    });
});



app.post('/writeload',(req,res)=>{
  loginschema.findOne({$and:[{ user: req.body.login, 'diary.date': date }]})
  .then(user => {
    if (!user) {
      // If user is not found, send a 404 Not Found response
      loginschema.findOneAndUpdate(
        { user: req.body.login }, // Find the document with iuser:"kasyap"
        {
          $push: {
            diary: {
              date: date,
              diary: " "
            }
          }
        },
        { new: true }
      )
      .then(user => {
        // const diaryEntry = user.diary.find(entry => entry.date === date);
        res.json("  ");
      })
    }
    else{
    // Find the specific diary entry by date
    const diaryEntry = user.diary.find(entry => entry.date === date);

    if (!diaryEntry) {
      // If diary entry for the specific date is not found, send a 404 Not Found response
      return res.status(404).send('Diary entry not found for the specified date');
    }

    // If diary entry is found, send it in the response
    res.json(diaryEntry);
  }
  })
  .catch(err => {
    // Handle other errors, for example, by sending an error response
    console.log(err)
    res.status(500).send('Internal Server Error');
  });
  })

app.post('/writeupdate',(req,res)=>{
    console.log(date);
    loginschema.findOneAndUpdate(
        { user: req.body.login, 'diary.date': date },
        { $set: { 'diary.$.diary': req.body.diary } }, // Update the diary content
        { new: true, upsert: true } // Return the updated document
      )
        .then(updatedUser => {
          if (!updatedUser) {
            // If user or diary entry for the specified date is not found, send a 404 Not Found response
            // return res.status(404).send('User or diary entry not found');
            loginschema.findOneAndUpdate(
                { user: req.body.login },
                { $push: { diary: { date: date, diary: req.body.diary } } },
                { new: true, upsert: true } // Return the updated document, and create a new one if not found
              )
                .then(updatedUser => {
                  // Send the updated user document in the response
                  res.json(updatedUser);
                })
                .catch(err => {
                  // Handle errors, for example, by sending an error response
                  res.status(500).send('Internal Server Error');
                });
          }
          // Send the updated user document in the response
          // res.json(updatedUser);
        })
        .catch(err => {
          // Handle errors, for example, by sending an error response
          console.log(err);
          res.status(500).send(err);
        });           
              
})

app.post('/readbydate',(req,res)=>{
  console.log(req.body.date);
    loginschema.findOne({$and:[{ user: req.body.login, 'diary.date': req.body.date }]})
  .then(user => {
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return res.status(404).send('User or diary entry not found');
    }

    // Find the specific diary entry by date
    const diaryEntry = user.diary.find(entry => entry.date === req.body.date);

    if (!diaryEntry) {
      // If diary entry for the specific date is not found, send a 404 Not Found response
      return res.status(404).send('Diary entry not found for the specified date');
    }

    // If diary entry is found, send it in the response
    // console.log(diaryEntry)
    res.json(diaryEntry);
  })
  .catch(err => {
    // Handle other errors, for example, by sending an error response
    res.status(500).send('Internal Server Error');
  });
})

app.post('/readtop10',(req,res)=>{

    loginschema.findOne({ user: req.body.login})
  .then(user => {
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return res.status(404).send('User or diary entry not found');
    }
    // console.log(user.diary.reverse())
    res.json( user.diary.reverse());
  })
  .catch(err => {
    // Handle other errors, for example, by sending an error response
    res.status(500).send('Internal Server Error');
  });
})

app.post('/signout',(req,res)=>{
  login='';
})

app.post('/Profile',(req,res)=>{
  loginschema.findOne({ user: req.body.login})
  .then(user => {
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return res.status(404).send('User or diary entry not found');
    }
    // console.log(user.diary.reverse())
    res.json(user);
  })
  .catch(err => {
    // Handle other errors, for example, by sending an error response
    res.status(500).send('Internal Server Error');
  });
});

app.post('/UserUpdate',async (req,res)=>{
  console.log(req.body.password,"--",req.body.username);
  await loginschema.findOneAndUpdate(
    { user: req.body.username},  
    { $set: { password:req.body.password} }, // Update the diary content
  ).then(updatedUser => {
      console.log(updatedUser);
  })
  .catch(err => {
    // Handle errors, for example, by sending an error response
    console.log(err);
    res.status(500).send(err);
  });   
});

app.post('/imageupload',async(req,res)=>{

  loginschema.findOneAndUpdate(
    { user: req.body.login },
    { $push: { Image: { date: date,title:req.body.title,desc:req.body.desc ,image: req.body.image } } },
    { new: true, upsert: true } // Return the updated document, and create a new one if not found
  )
    .then(updatedUser => {
      // Send the updated user document in the response
      res.json(updatedUser);
    })
    .catch(err => {
      // Handle errors, for example, by sending an error response
      res.status(500).send('Internal Server Error');
    });

});

app.post('/imageBlog',async (req,res)=>{

  loginschema.findOne({ user: req.body.login})
  .then(user => {
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return res.status(404).send('User or diary entry not found');
    }
    // console.log(user.diary.reverse())
    res.json( user.Image.reverse());
  })
  .catch(err => {
    // Handle other errors, for example, by sending an error response
    res.status(500).send('Internal Server Error');
  });
});

app.post('/imageBysearch',async (req,res)=>{

  const query= req.body.search;
 await loginschema.find({$and:[{user:req.body.login}, { 'Image.title': { $regex: new RegExp( query, 'i') } }]})
      .then(user => {
        // console.log(user[0].Image);
      // const diaryEntry = (user).find({'Image.title':new RegExp(query, 'i')});
      // const diaryEntry = (user[0].Image).find(entry => entry.title === req.body.search);
      // res.json( diaryEntry);
      const searchTerm = new RegExp(req.body.search, 'i'); // 'i' flag for case-insensitive search

      // const diaryEntry = (user[0].Image).find(entry => searchTerm.test(entry.title));
      // res.json(diaryEntry);
      const matchingEntries = user[0].Image.filter(entry => searchTerm.test(entry.title));
res.json(matchingEntries);
      // res.json(user)
    })
    .catch(err => {
      console.log(err);
       res.status(500).send('Internal Server Error');
    });
  // try {
  //   // Using regex to perform a case-insensitive search for titles containing the keyword
  //   const regex = new RegExp(req.body.search, 'i');

  //   // Query the database using user and regex for partial title match
  //   const result = await loginschema.find({
  //     'user': req.body.login,
  //     'Image': {
  //       $elemMatch: {
  //         'title': { $regex: regex }
  //       }
  //     }
  //   });

  //   // Return the matching entries
  //   res.json(result[0].Image);
  // } catch (error) {
  //   // Handle errors
  //   console.error('Error occurred while searching for diary entries:', error);
  //   throw error;
  // }
});