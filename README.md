This app is a take on Amazon called Bamazon. Very clever indeed. There are two different servers that can be run, one for the customer and one for a manager. 

Typing 'node bamazonCustomer.js' on the command line will bring you into the customers application. The user will see all of the products that are available to be purchased. E.G.

[Initial screen example](usageInfo/CustomerInitialScreen.png)

The user can then type in the ID of the product they want to buy and a quantity. Once the purchase has been made the user interface will automatically update.

[Buying product example](usageInfo/BuyingProduct.png)

If they type an out of range value such as 0 or a value outside of the range of available products they will be prompted to try again. I provided some examples of bad inputs and the messages provided to the user to help them resolve any issues with purchasing.

[Error examples](usageInfo/CustomerErrorChecking.png)

-------------------------------------------------------------------------------------------------------------------------------------------

The Management app allows a manager to make various changes to products. 

[Management Initial Prompt](usageInfo/ManagerInitialPrompt.png)

The manager can view products to see what's available in the system currently.

[Viewing Products](usageInfo/ViewProducts.png)

There is also an option to see what products are low on inventory.

[Low Inventory](usageInfo/LowInventory.png)

Since product will eventually be sold, there is a need to add more inventory. Selecting 'Add to inventory' will allow you to do just that. There is range checking so that the user can be assisted if any mistakes are made.

[Add Inventory](usageInfo/AddInventory.png)

There may even be new products added to the database and there is support for that with 'Add New Product'.

[Add Product](usageInfo/AddProduct.png)
