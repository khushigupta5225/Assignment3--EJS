const express=require("express")
const path=require("path")
const app=express()
const PORT=8080
app.set('view engine','ejs')

filepath=path.join(__dirname,"/views/welcome.ejs")


app.get('/welcome', (req, res) => {
    let name="John"
   
    const currentHour = new Date().getHours();

   
    res.render(filepath, {name, hour: currentHour });
}); 



// app.get('/',(req,res)=>{
//     let name="John"
//     res.render(filepath,{name});
// }
// );

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening on ${PORT}`)
    }
})