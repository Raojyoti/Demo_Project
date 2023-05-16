import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import bcrypt from "bcrypt";

//create new user or register user
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