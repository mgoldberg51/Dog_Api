import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res) =>{
    //const searchId = req.body.id;
    try {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      //const carousel = await axios.get(`https://dog.ceo/api/breeds/image/random/3`);
      //console.log(result.data.message);
      //console.log(req.body.numOfPictures);
      res.render("index.ejs", { 
        content: result.data.message,
      });
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});
app.post("/get-picture", async (req, res) => {
    try {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      //const nextResult = JSON.stringify(result.message)
      
      res.render("index.ejs", { content: result.data.message});
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
  });
  app.post("/get-more", async (req, res) => {
    const numOfPictures = req.body.num;
    try {
      const result = await axios.get(`https://dog.ceo/api/breeds/image/random/${numOfPictures}`);
      //const nextResult = JSON.stringify(result.message);

      //console.log(JSON.stringify(result.data.message));
      
      res.render("pictures.ejs", { content: result.data.message});
    } catch (error) {
      res.render("pictures.ejs", { content: JSON.stringify(error.response.data) });
    }
  });



 app.post("/get-breed", async (req, res) => {
    const searchId = req.body.breed;
    //console.log(searchId);
    try{
      const result = await axios.get(`https://dog.ceo/api/breed/${searchId}/images/random`);
      console.log(result.data.message);
      //res.render("index.ejs",{content: JSON.stringify(result.data.message)});
      
      res.render("index.ejs", { content: result.data.message});
      //res.render("index.ejs", {content: result.data.message[Math.floor(Math.random()*result.data.message.length)]});
    } catch (error){
      res.render("index.ejs",{ content: JSON.stringify(error.response.data)});
    }
  });
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})