const mysql = require("mysql");
const {
    table
} = require("table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "trif3ktac0dekta",
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
            console.log(answers);
            connection.end();
        })
    };