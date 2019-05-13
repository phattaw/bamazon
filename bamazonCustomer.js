// # Node.js & MySQL

// ## Overview

// In this activity, you'll be creating an Amazon-like storefront with the MySQL skills 
// you learned this unit. The app will take in orders from customers and deplete stock 
// from the store's inventory. As a bonus task, you can program your app to track product 
// sales across your store's departments and then provide a summary of the highest-grossing 
// departments in the store.

// ## Submission Guide

// This time, though, you need to include screenshots, a gif, and/or a video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video in a `README.md` file.

// * Include screenshots (or a video) of typical user flows through your application (for the customer and if relevant the manager/supervisor). This includes views of the prompts and the responses after their selection (for the different selection options).

// * Include any other screenshots you deem necessary to help someone who has never been introduced to your application understand the purpose and function of it. This is how you will communicate to potential employers/other developers in the future what you built and why, and to show how it works. 

// * Because screenshots (and well-written READMEs) are extremely important in the context of GitHub, this will be part of the grading.

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Gnimmwis1",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  
  startBamazon();
});

function startBamazon() {
    printEverything();
}

// 5. Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.
function printEverything() {
connection.query(buildSelectQuery("*", "products"), function(err, res) {
    if (err) throw err;
    for(let i = 0; i < res.length; i++) {
        console.log(`Item ID: ${res[i].item_id}`);
        console.log(`Product Name: ${res[i].product_name}`);
        console.log(`Department Name: ${res[i].department_name}`);
        console.log(`Price: ${res[i].price}`);
        console.log(`Stock quantity: ${res[i].stock_quantity}`);
        console.log('-------------------------------------------------------');
    }
    askQuestion(res.length);
});
}

function buildSelectQuery(field, database) {
    return(`SELECT ${field} FROM ${database}`);
}

function processSale(potentialSale, totalItems) {

if(totalItems >= potentialSale.product_id && potentialSale.product_id > 0) {
    connection.query(`SELECT item_id, stock_quantity 
                        FROM products 
                        WHERE item_id=${potentialSale.product_id};`, function(err, res) {
        if (err) throw err;

        // 7. Once the customer has placed the order, your application should check if your 
        // store has enough of the product to meet the customer's request.
        if(res[0].stock_quantity > potentialSale.units && potentialSale.units > 0) {
            // 8. However, if your store _does_ have enough of the product, you should fulfill 
            //      the customer's order.
            //    * This means updating the SQL database to reflect the remaining quantity.
            //    * Once the update goes through, show the customer the total cost of their purchase.
            let updatedQuantity = res[0].stock_quantity - potentialSale.units;

            connection.query(`UPDATE products
                SET stock_quantity = ${updatedQuantity}
                WHERE item_id = ${potentialSale.product_id};`, function(err, res) {
                startBamazon();
            });
        // If not, the app should log a phrase like `Insufficient quantity!`, 
        // and then prevent the order from going through.
        } else {
            if(potentialSale.units > 0) {
                console.log(`Not enough product. Wanted ${potentialSale.units} where only ${res[0].stock_quantity} was available.`);
            } else {
                console.log(`Purchasing requires ordering at least one item.`);
            }
            startBamazon();
        }
    });
} else {
    console.log(`Please enter a valid ID from 1 to ${totalItems}`);
    startBamazon();
}
}

// constructor function used to create programmer objects
function PotentialSale(product_id, units) {
    this.product_id = product_id;
    this.units = units;
}
  
// 6. The app should then prompt users with two messages.
//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.
function askQuestion(totalItems) {
    inquirer.prompt([
      {
        name: "product_id",
        message: "What is the ID of the product you'd like to buy?"
      }, 
      {
        name: "units",
        message: "How many units would you like to buy?",
      }
    ]).then(function(answers) {
        var potentialSale = new PotentialSale(
            answers.product_id,
            answers.units );

        processSale(potentialSale, totalItems);
    });
};

