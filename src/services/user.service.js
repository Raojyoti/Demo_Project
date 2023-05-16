import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import bcrypt from "bcrypt";
import  jwt  from 'jsonwebtoken';

//create new user 
export const registerUser = async (body) => {
  const saltRounds=10;
  const existingdata = await User.findOne({ where: { email: body.email } });
  if(existingdata){
    throw new Error("User already present");
   }
   const hashPassword = bcrypt.hashSync(body.password, saltRounds);
    body.password=hashPassword;
    const data = await User.create(body);
     const showData= await User.findOne({
      attributes: ['firstName', 'lastName', 'email']
     });
   if(body.existingdata == body.showData){
    return showData;
   }
};

//user login 
export const userlogin = async ( userdetails) => {
  const data = await User.findOne({ where: { email: userdetails.email } });
  if(!data){
    throw new Error( "User not found");
  }
  const result= bcrypt.compareSync(userdetails.password, data.password);
  var token = jwt.sign({ email: data.email, id : data.id }, process.env.SECRET_KEY);
  if(!result){
    throw new Error("Invalid Credentials");
  }
  return token;
};