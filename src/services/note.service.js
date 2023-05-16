import sequelize, { DataTypes } from '../config/database';
const Note = require('../models/note.model')(sequelize, DataTypes);

//get all users
export const getAllNotes = async () => {
  const data = await Note.findAll();
  return data;
};

//get single user
export const getNote = async (id) => {
    const findId = await Note.findOne({ where: { id: id }});
    if(!findId){
        throw new Error(`$Details of ide => {id} is not present `);
       }
  const data = await Note.findByPk(id);
  return data;
};

//create new user
export const addNotes = async (body) => {
  const existDetails = await Note.findOne({ where: { title: body.title }});
  if(existDetails){
    throw new Error("Details already present");
   }
  const data = await Note.create(body);
  return data;
};

//update single user
export const updateNote = async (id, body) => {
  await Note.update(body, {
    where: { id: id }
  });
  return body;
};

//delete single user
export const deleteNote = async (id) => {
  await Note.destroy({ where: { id: id } });
  return '';
};

