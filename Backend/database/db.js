const mongoose = require('mongoose');
const { MONGODB_CONNECTION_STRING } = require('../config/index');

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING); 
    console.log(`Database is connected to host: ${mongoose.connection.host}`);

    const fetch_data = await mongoose.connection.db.collection('food_items');
    const data = await fetch_data.find({}).toArray(); 

    const food_category = await mongoose.connection.db.collection('food_category');
    const catdata = await food_category.find({}).toArray(); 

    global.food_items = data;
    global.food_category = catdata;

    // console.log(global.food_items);
    // console.log(a);

  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = dbConnect;
