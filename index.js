const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key")


// application/x-www-form-urlencoded 형식의 데이터를 분석해서 가져온다 
app.use(bodyParser.urlencoded({extended:true}));

// application/json 형식의 데이터를 분석해서 가져온다 
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, 
    useUnifiedTopology : true, 
    // useCreateIndex : true, 
    // useFindAndModify : false
}).then(() => console.log("MongoDB Connnected..."))
  .catch(err => console.log(err))


app.get("/",(req, res) => res.send("Hello World!~~ 반갑습니다!!"));


app.post("/register", (req, res) => {

    // 회원 가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
    const user = new User(req.body);
    
    // 이전 버전 (save가 더이상 콜백을 허용하지 않는다!)
    // user.save((err, userInfo) => { 
    //     if(err) return res.json({success:false, err})
    //     return res.status(200).json({
    //         success: true
    //     })
    // }) 

    // 최신 버전 
    // save는 몽고DB 메서드 
    user.save().then(() => {
        res.status(200).json({
            success: true
        })
    }).catch((err)=>{
        res.json({success:false, err})
    }) 

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));



