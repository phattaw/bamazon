
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

connection.connect(function (err) {
    if (err) throw err;

    startBamazon();
});

function startBamazon() {
    askQuestion();
}

function buildSelectQuery(field, database) {
    return (`SELECT ${field} FROM ${database}`);
}

function processSale(potentialSale) {
    connection.query(`SELECT item_id, stock_quantity 
                    FROM products 
                    WHERE item_id=${potentialSale.product_id};`, function (err, res) {
            if (err) throw err;

            // 7. Once the customer has placed the order, your application should check if your 
            // store has enough of the product to meet the customer's request.
            if (res[0].stock_quantity > potentialSale.units) {
                // 8. However, if your store _does_ have enough of the product, you should fulfill 
                //      the customer's order.
                //    * This means updating the SQL database to reflect the remaining quantity.
                //    * Once the update goes through, show the customer the total cost of their purchase.
                let updatedQuantity = res[0].stock_quantity - potentialSale.units;

                connection.query(`UPDATE products
            SET stock_quantity = ${updatedQuantity}
            WHERE item_id = ${potentialSale.product_id};`, function (err, res) {
                        startBamazon();
                    });
                // If not, the app should log a phrase like `Insufficient quantity!`, 
                // and then prevent the order from going through.
            } else {
                console.log(`Not enough product. Wanted ${potentialSale.units} where only ${res[0].stock_quantity} was available.`)
                startBamazon();
            }
        });
}

// 6. The app should then prompt users with two messages.
//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.
function askQuestion() {
    //   * List a set of menu options:

    inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Select which action you would like to take.",
            choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    ]).then(function (answers) {
        switch (answers.selection) {
            case "View Products for Sale":
                viewProducts().then(() => {
                    askQuestion();
                });
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            default:
                console.log(`Add support for ${answers.selection}`)
                break;
        }
    });
};

//   * If a manager selects `View Products for Sale`, the app should list every 
//      available item: the item IDs, names, prices, and quantities.
function viewProducts() {
    return new Promise(resolve => {
        connection.query(buildSelectQuery("*", "products"), function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                console.log(`Item ID: ${res[i].item_id}`);
                console.log(`Product Name: ${res[i].product_name}`);
                console.log(`Price: ${res[i].price}`);
                console.log(`Stock quantity: ${res[i].stock_quantity}`);
                console.log('-------------------------------------------------------');
            }
            resolve();
        });
    });
}


//   * If a manager selects `View Low Inventory`, then it should list all items 
//      with an inventory count lower than five.
let lowInventoryValue = 5;

function viewLowInventory() {
    connection.query(`SELECT * 
                    FROM products 
                    WHERE stock_quantity<${lowInventoryValue};`, function (err, res) {
            if (err) throw err;

            for (let i = 0; i < res.length; i++) {
                console.log(`Item ID: ${res[i].item_id}`);
                console.log(`Product Name: ${res[i].product_name}`);
                console.log(`Price: ${res[i].price}`);
                console.log(`Stock quantity: ${res[i].stock_quantity}`);
                console.log('-------------------------------------------------------');
            }

            startBamazon();
        });
}

// constructor function used to create programmer objects
function AddedInventory(product_id, units) {
    this.product_id = product_id;
    this.units = units;
}


//   * If a manager selects `Add to Inventory`, your app should display a prompt 
//      that will let the manager "add more" of any item currently in the store.
function addInventory() {
inquirer.prompt([
    {
        name: "product_id",
        message: "What is the ID of the product you'd like to add inventory for?"
    },
    {
        name: "units",
        message: "How many units would you like to add for this item?",
    }
]).then(function (answers) {
    var inventoryToAdd = new AddedInventory(
        answers.product_id,
        answers.units);

    modifyInventory(inventoryToAdd);
});
}

function modifyInventory(inventoryToAdd) {
connection.query(buildSelectQuery("*", "products"), function (err, res) {
    if (err) throw err;

    let totalItems = res.length;
    if(totalItems >= inventoryToAdd.product_id && inventoryToAdd.product_id > 0) {
        connection.query(`SELECT item_id, stock_quantity 
        FROM products 
        WHERE item_id=${inventoryToAdd.product_id};`, function (err, res) {
            if (err) throw err;

            let totalStock = parseInt(res[0].stock_quantity) + parseInt(inventoryToAdd.units);

            connection.query(`UPDATE products
                SET stock_quantity = ${totalStock}
                WHERE item_id = ${inventoryToAdd.product_id};`, function (err, res) {
                    startBamazon();
            });
        });
    } else {
        console.log(`Please select a valid product ID between 1 and ${totalItems}`)
        startBamazon();
    }
});
}

// constructor function used to create programmer objects
function NewProduct(productName, departmentName, price, units) {
    this.productName = productName;
    this.departmentName = departmentName;
    this.price = price;
    this.units = units;
}

//   * If a manager selects `Add New Product`, it should allow the manager to add 
//      a completely new product to the store.
function addProduct() {
inquirer.prompt([
    {
        name: "productName",
        message: "What is the new products name?"
    },
    {
        name: "departmentName",
        message: "What department does this belong to?"
    },
    {
        name: "price",
        message: "What is the new products price?"
    },
    {
        name: "units",
        message: "How many units are available for this item?",
    }
]).then(function (answers) {
    var newProductInfo = new NewProduct(
        answers.productName,
        answers.departmentName,
        parseFloat(answers.price),
        parseInt(answers.units)
        );

    addNewProduct(newProductInfo);
});
}

function addNewProduct(newProductInfo) {
    connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("${newProductInfo.productName}", "${newProductInfo.departmentName}", ${newProductInfo.price}, ${newProductInfo.units});
    `, function(err, res) {
        if (err) throw err;

        startBamazon();            
    });
}



