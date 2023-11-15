const express = require('express');
const app = express();
const port = 1212;



const bodyparser = require('body-parser');
app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));
// app.use(bodyparser.json());

const cors = require('cors');
app.use(cors());

//port no 1212
app.listen(port,(req,res)=>{
    console.log("tge port is listening");
});

//date module
const d = new Date();
const date = (d.getDate())+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
// const date = "28-10-2023";// subs date

const {connectDb} = require('./connection');
connectDb();

const loginschema = require('./loginschema');
//schema load ^



//Login http request by post and i/p is user id i.e, username and password o/p is message and id
app.post('/login',async (req,res)=>{
    try{
    const data = await loginschema.find({$and:[{user:req.body.username},{password:req.body.password}]});//if both works
    if(data.length==1){
      res.json({message:'yes',userid : (data[0]._id).toString()});//only one document thens yes i.e, only one user with tjat name
      }
      else if(data.length>1){
        res.json({message:'more users'});//else message many user
     }
    else{
      res.json(data);//if 0 the {} will pass
    }
}
catch(error){
    res.send(error);//in case of any error
    console.log(error)
}});

//register http request by post i/p is username,passwors o/p is null
app.post('/register',async (req,res)=>{
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
    })//new schema was created
     loginschema.findOne({ user: req.body.username })//if user is already exitsed
    .then(existingUser => {
        if (existingUser) {
        res.json({message:'no'});//o/p as no
        }
        else {
        inserter.save()//else save schema and send res as yes
        .then(() => {
          res.json({message:'yes'});
        })
        .catch(saveError => {
          res.status(500).send('Error saving user');//in case of any error in checking user existence
        });
        }
    })
    .catch(err => {
        res.status(500).send('Internal Server Error');//in case of saving i.e, resgistering data
    });
});


//write load on load of write page it works to retrive written diary wrote on that day
app.post('/writeload',(req,res)=>{
  loginschema.findOne({$and:[{ _id: req.body.login, 'diary.date': date }]})//getting data by date and id
  .then(user => {
    if (!user) {//if data with that date not found than create data by date and diary is "" empty string
      // If user is not found, send a 404 Not Found response
      loginschema.findOneAndUpdate(
        { _id: req.body.login }, // 
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
      .then(user2 => {
        const diaryEntry = user2.diary.find(entry => entry.date === date);
        // console.log();
        res.json({diary:diaryEntry,name:user2.user});//sending data as " " than user can write
      })
    }
    else{
    // Find the specific diary entry by date if and only if the user with that data is existed
    const diaryEntry = user.diary.find(entry => entry.date === date);

    if (!diaryEntry) {
      // If diary entry for the specific date is not found, send a 404 Not Found response
      return res.status(404).send('Diary entry not found for the specified date');//in case of foul
    }

    // If diary entry is found, send it in the response
    res.json({diary:diaryEntry,name:user.user});
  }
  })
  .catch(err => {
    // Handle other errors, for example, by sending an error response
    console.log(err)
    res.status(500).send('Internal Server Error');
  });
  })

//write update updates the the diary after user said save i/p id and diary o/p nothing
app.post('/writeupdate',(req,res)=>{
    loginschema.findOneAndUpdate(
        { _id: req.body.login, 'diary.date': date },//consition
        { $set: { 'diary.$.diary': req.body.diary } }, // Update the diary content
        { new: true, upsert: true } // Return the updated document
      )
        .then(updatedUser => {
          if (!updatedUser) {
            // If user or diary entry for the specified date is not found, send a 404 Not Found response
            loginschema.findOneAndUpdate(
              { _id: req.body.login },
              { $push: { diary: { date: date, diary: req.body.diary } } },
              { new: true, upsert: true } // Return the updated document, and create a new one if not found
              )//some extra need to update
              .then(updatedUser => {
                // // Send the updated user document in the response
                // console.log("work done");
                // res.json(updatedUser.diary);
              })
              .catch(err => {
                  // Handle errors, for example, by sending an error response
                  res.status(500).send('Internal Server Error');
                });
          }
          console.log("work done");
          })
        .catch(err => {
          // Handle errors, for example, by sending an error response
          console.log(err);
          res.status(500).send(err);
        });           
              
})

//reader can read by date and id and o/p is diary of particular date
app.post('/readbydate',(req,res)=>{
    loginschema.findOne({$and:[{ _id: req.body.login, 'diary.date': req.body.date }]})//getting data by condition if consition exist get all data
  .then(user => {
    if (!user) {
      return res.status(404).send('User or diary entry not found');//if data not found
    }

    const diaryEntry = user.diary.find(entry => entry.date === req.body.date);//filter by date

    if (!diaryEntry) {
      return res.status(404).send('Diary entry not found for the specified date');//if diary not found
    }

    res.json(diaryEntry);//res of particular date
  })
  .catch(err => {
    res.status(500).send('Internal Server Error');
  });
})

//reading all duiaries
app.post('/readtop10',(req,res)=>{

    loginschema.findOne({ _id: req.body.login})
  .then(user => {
    if (!user) {
       return res.status(404).send('User or diary entry not found');
    }
    res.json( user.diary.reverse());
  })
  .catch(err => {
    res.status(500).send('Internal Server Error');
  });
})

//profile by id and o/p as user and password
app.post('/Profile',(req,res)=>{
  loginschema.findOne({ _id: req.body.login})
  .then(user => {
    if (!user) {
      return res.status(404).send('User or diary entry not found');
    }
    res.json(user);
  })
  .catch(err => {
    res.status(500).send('Internal Server Error');
  });
});

//updating password by id
app.post('/UserUpdate',async (req,res)=>{
  await loginschema.findOneAndUpdate(
    { _id: req.body.username},  
    { $set: { password:req.body.password} }, // Update the diary content
  ).then(updatedUser => {
      // console.log(updatedUser[0]);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });   
});

//image upload
app.post('/imageupload',async(req,res)=>{

  loginschema.findOneAndUpdate(
    { _id: req.body.login },
    { $push: { Image: { date: date,title:req.body.title,desc:req.body.desc ,image: req.body.image } } },
    { new: true, upsert: true } 
  )
    .then(updatedUser => {
    //  res.json(updatedUser.user);
    })
    .catch(err => {
      res.status(500).send('Internal Server Error');
    });

});

//all images
app.post('/imageBlog',async (req,res)=>{

  loginschema.findOne({ _id: req.body.login})
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

//images by search title
app.post('/imageBysearch',async (req,res)=>{

  const query= req.body.search;
 await loginschema.find({$and:[{_id:req.body.login}, { 'Image.title': { $regex: new RegExp( query, 'i') } }]})
      .then(user => {
       const searchTerm = new RegExp(req.body.search, 'i'); // 'i' flag for case-insensitive search
       const matchingEntries = user[0].Image.filter(entry => searchTerm.test(entry.title));
       res.json(matchingEntries.reverse());
    })
    .catch(err => {
      console.log(err);
       res.status(500).send('Internal Server Error');
    });
});