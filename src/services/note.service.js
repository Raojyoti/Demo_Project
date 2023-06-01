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
        throw new Error(`Details of id => ${id} is not present `);
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

// archeive note
export const archiveNote = async (id) => {
  const data = await Note.findByPk(id);
  console.log("Before archived ================>",data);
  data.isArchived == false ? data.update({isArchived: true}) :data.update({isArchived: false})
  console.log("After archived ================>",data);
  return data;
};

// trashed note
export const trashNote = async (id) => {
  const data = await Note.findByPk(id);
  console.log("Before trash ================>",data);
  data.isDeleted == false ? data.update({isDeleted: true}) :data.update({isDeleted: false})
  console.log("After trash ================>",data);
  return data;
};