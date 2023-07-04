const express=require("express");
const https=require("https");
const port=3000;
const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
   
    
})

app.post('/',(req,res)=>{
       const query=req.body.cityname;
       console.log(query);
       const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=cac905cd77eae3c51d416b7904d4bfc2&units=metric"
    https.get(url , (response)=>{
        
         response.on('data' ,(data)=>{
            const info=JSON.parse(data);
            const temp=info.main.temp;
            const description=info.weather[0].description
            const icon=info.weather[0].icon;
            console.log(icon);
            const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp);
            console.log(description);
            res.send("<centre><h1>The temp in "+query+" is " + temp + " degree celcius</h1></centre>"+"<h1>The weather description is " +description+"</h1>"+"<img src="+iconurl+"></centre>");
         })
    })
})

app.listen(port,()=>{
    console.log("server " +port);
})