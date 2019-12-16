const mysql = require("mysql");
const {
    table
} = require("table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as customer id " + connection.threadId + "\n");
    customerDisplay();
});

function customerDisplay() {
    console.log("Listing products for sale....\n");
    const query = connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            const data = res.map((product) => [product.product_id, product.product_name, product.department_name, product.price_customer, product.stock_quantity]);
            const tableData = [
                ["product_id", "product_name", "department_name", "price_customer", "stock_quantity"],
                ...data
            ];
            console.log(table(tableData));
            customerSale();
        });
};

const customerQuestions = [{
        type: "input",
        name: "customerProductSelect",
        message: "What product would you like to buy?",
    },
    {
        type: "input",
        name: "customerPurchaseAmount",
        message: "How much product would you like to buy?",
    }
];

function customerSale() {
        inquirer.prompt(customerQuestions).then(answers =>{
            customerSaleResult(answers);
        })
    };

function customerSaleResult(answers){
    connection.query("SELECT * FROM products", function (err, results){
        if (err) throw err;
        if (parseInt (answers.customerProductSelect) === results.product_id){
            productSale();
        } else {
            console.log("That ID does not match current stock.");
        };
    });
};

function productSale(answers){
    if (parseInt (answers.customerPurchaseAmount) <= results.stock_quantity){
        connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock_quantity - answers.customerPurchaseAmount
            },
            {
                product_id: answers.customerProductSelect
            }
        ],
        function (error){
            if (error) throw err;
            console.log("Item purchased successfully.");
            connection.end();
        })
    } else {
        console.log ("There is not enough product for that purchase.");
        connection.end();
    };
};

//function to output total price of sale to customer
    //closes connection if sale is successful
