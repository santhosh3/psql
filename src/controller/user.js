const User = require("../model/user");
const bcrypt = require('bcrypt')

// ---------------------------------------------------------TASK 1------------------------------------------------
exports.createUser = async function (req, res){
    try{
        const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10)

        const userData = {
            USERNAME: req.body.USERNAME,
            CONTACT_NUMBER : req.body.CONTACT_NUMBER,
            PASSWORD : hashedPassword,
        }
        let saveUser = await User.create(userData);
        res.status(201).send({status : true, message : "data Inserted Successfully", data : saveUser})

    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}


exports.findUser = async function(req, res){
    try{
      
          let getUser = await User.findAll({
            order : [["CREATE_DATE_TIME", "DESC"]] 
          });

        res.status(200).send({status : true, data : getUser})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------
const jwt = require("jsonwebtoken");
const { and } = require("sequelize");

//---------------------------------------------TASK 2-------------------------------------------------------------------------------------------------

exports.loginUser = async function(req, res){
    try{
        let {USERNAME, PASSWORD} = req.body
        let check = await User.findOne({
            where : {USERNAME : USERNAME}
        });
        if(check == null) return res.status(404).send({status : false , message : "No such user, Please enter valid credential"});

        let compare = await bcrypt.compare(PASSWORD, check.PASSWORD);
        if (!compare) return res.status(404).send({ status: false, message: "Password is incorrect" })

        let token = jwt.sign({ USER_ID: check.USER_ID }, "HIMPACT", { expiresIn: '3600s' });
        res.status(200).send({ status: true, message: "User login successfully", bearerToken: token });


    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, err : err.message})
    }
}


//------------------------------------------------TASK 3----------------------------------------------------------------------------------------------

exports.deleteUsers = async function(req, res) {
    try{
        
        await User.destroy({where : {USER_ID : req.body.USER_ID}})
        res.status(200).send({status : true , message : `User_Id => [${req.body.USER_ID}] deleted Successfully`})

    }catch(err){
        console.log(err)
        return res.status(500).send({status : false , err : err.message})
    }
}