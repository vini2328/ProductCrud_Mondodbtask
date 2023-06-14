import express from 'express'
import connectDB from './db/connectdb.js'
import productModel from './db/models/Products.js'

const  app =express()
const port =process.env.port || '3000'
const DATABASE_URL = "mongodb://localhost:27017/Products"




connectDB(DATABASE_URL)

// 1.Find all the information about each products

//  productModel.find().select('-_id').then((res)=>{
//     console.log("Find all the information about each products",res)
// })

// 2. Find the product price which are between 400 to 800
// productModel.find(  {product_price: { $gte: 400, $lte: 800 }}).then((res)=>{
//     console.log('between 400 and 800',res)
// })
// // 3.Find the product price which are not between 400 to 600
// productModel.find( {  product_price: {
//     $not: {
//       $gte: 400,
//       $lte: 600
//     }}}).then((res)=>{
//     console.log(' 3.Find the product price which are not between 400 to 600',res)
// })

// 4. List the four product which are grater than 500 in price 
// productModel.find({ product_price: { $gt: 500 } }).limit(4).then((res) => {
//     console.log('4. List the four product which are grater than 500 in price', res);
//   });


// 5. Find the product name and product material of each products

//   productModel.find({}, { product_name: 1, product_material: 1 }).then((res) => {
//     console.log('Product Name and Material:');
//     res.forEach((product) => {
//       console.log(`Product Name: ${product.product_name}`);
//       console.log(`Product Material: ${product.product_material}`);
//       console.log('---------------------');
//     });
//   }).catch((err)=>console.log(err));

// 6.Find the product with a row id of 10
//   productModel.findOne({ id: '10' }).then((product) => {
//     console.log('6.Find the product with a row id of 10', product);
//   }).catch((err)=>{
//     console.log('yooooooo',err)
//   })


// 7.Find only the product name and product material
//   productModel.find({}, { product_name: 1, product_material: 1 }).then((products) => {
//     console.log('Product Names and Materials:');
//     products.forEach((product) => {
//       console.log(`Product Name: ${product.product_name}`);
//       console.log(`Product Material: ${product.product_material}`);
//       console.log('---------------------');
//     });
//   });


// 8.Find all products which contain the value of soft in product material 
//   productModel.find({ product_material: { $regex: /soft/i } }).then((products) => {
//     console.log('Products with "soft" in Product Material:');
//     products.forEach((product) => {
//       console.log(`Product Name: ${product.product_name}`);
//       console.log(`Product Material: ${product.product_material}`);
//       console.log('---------------------');
//     });
//   });
  
// 9.Find products which contain product color indigo  and product price 492.00
//   productModel.find({ $and: [{ product_color: 'indigo' }, { product_price: 492 }] }).then((products) => {
//     console.log('Products with Color "Indigo" and Price 492.00:');
//     products.forEach((product) => {
//       console.log(`Product Name: ${product.product_name}`);
//       console.log(`Product Material: ${product.product_material}`);
//       console.log('---------------------');
//     });
//   });

//   10.Delete the products which product price value are same
  
productModel.aggregate([
    {
      $group: {
        _id: "$product_price",
        products: { $push: "$_id" },
        count: { $sum: 1 }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    }
  ]).then((duplicateProducts) => {
    const productIdsToDelete = duplicateProducts.flatMap((product) => product.products);
    productModel.deleteMany({ _id: { $in: productIdsToDelete } }).then((result) => {
      console.log(`${result.deletedCount} products deleted.`);
    });
  });
  
  
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})