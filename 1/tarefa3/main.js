class Client {
    name
    order
    tax
    bill = 0
    taxValue = 0

    constructor(name, order, tax) {
        this.name = name
        this.order = order
        this.tax = tax
    }
}
class Product {
    name
    orderedBy
    price
    individual

    constructor(name, orderedBy, price, individual) {
        this.name = name
        this.orderedBy = orderedBy
        this.price = parseInt(price).toFixed(2)
        this.individual = individual
    }
}
let clients = [] 
let products = []
let currentOrder = []
let abort = false
function addProduct() {
    currentOrder = []
    let currentClient = document.querySelector("#client-name").value
    currentOrder.push(document.querySelector("#client-order-name").value)
    currentOrder.push(document.querySelector("#client-order-quantity").value)
    currentOrder.push(document.querySelector("#client-order-price").value)
    let individualCheck = document.querySelector("#ind-check").checked
    if (currentOrder[0] == '' || currentOrder[1] == '' || currentOrder[2] == '') {
        alert("Por favor, insira o nome, quantidade e proço do produto!")
        return
    }
    if (isNaN(currentOrder[1]) || isNaN(currentOrder[2])) {
        alert("Por favor, digite somente números nos campos 'Quantidade' e 'Preço'!")
        return
    }
    products.forEach(product => {
        if (product[0].name == currentOrder[0] && product[0].orderedBy == currentClient) {
            alert("Produto já adicionado!")
            abort = true
        }
    });
    if (abort) {
        return
    }
    let product = new Array(new Product(currentOrder[0], currentClient, currentOrder[2], individualCheck), currentOrder[1])
    products.push(product)
    let row = document.createElement("tr")
    row.setAttribute("temp", "true")
    var productName = document.createElement("td")
    productName.textContent = product[0].name
    row.appendChild(productName)
    var productQuantity = document.createElement("td")
    productQuantity.textContent = product[1]
    row.appendChild(productQuantity)
    var productPrice = document.createElement("td")
    productPrice.textContent = "R$" + product[0].price
    row.appendChild(productPrice)
    var individualProduct = document.createElement("td")
    individualProduct.setAttribute("class", "centralized")
    var check = document.createElement("i")
    if (individualCheck) {
        check.setAttribute("class", "fa-solid fa-check")
    } else {
        check.setAttribute("class", "fa-solid fa-xmark")
    }
    individualProduct.appendChild(check)
    row.appendChild(individualProduct)
    document.querySelector("#products-table-body").appendChild(row);
    document.querySelector("#client-order-name").value = ''
    document.querySelector("#client-order-quantity").value = ''
    document.querySelector("#client-order-price").value = ''
    document.querySelector("#ind-check").checked = false
}

function addClient() {
    let currentClient = document.querySelector("#client-name").value
    if (currentClient == '') {
        alert("Por favor, forneça o nome do cliente.")
        return
    }
    let tax = document.querySelector("#service-tax").checked
    clients.push(new Client(currentClient, products, tax))
    alert("Cliente " + currentClient + " adicionado com sucesso!")
    products = []
    document.querySelector("#client-name").value = ''
    document.querySelector("#service-tax").checked = false
    document.querySelectorAll("[temp=\"true\"]").forEach(row => {
        document.querySelector("#products-table-body").removeChild(row)
    })
}

function calc() {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients.length; j++) {
            if (i != j) {
                for (let k = 0; k < clients[i].order.length; k++) {
                    for (let l = 0; l < clients[j].order.length; l++) {
                        if (clients[i].order[k][0].name == clients[j].order[l][0].name && !(clients[i].order[k][0].orderedBy.includes(clients[j].name)) && !(clients[j].order[l][0].orderedBy.includes(clients[i].name)) && !clients[i].order[k][0].individual) {
                            clients[i].order[k][0].orderedBy += "," + clients[j].name
                            clients[j].order[l][0].orderedBy += "," + clients[i].name
                        }
                    } 
                }
            }
        }
    }
    textarea = document.querySelector('#results')
    textarea.value = ''
    clients.forEach(client => {
        client.order.forEach(product => {
            if (product[0].orderedBy.split(',').includes(client.name)) {
                client.bill += (product[0].price / product[0].orderedBy.split(',').length) * product[1]
            }
        })
        if (client.tax) {
            client.taxValue = (client.bill * 0.1)
            client.bill += client.taxValue
        }
        let tempString = client.name + "R$" + client.bill.toFixed(2) + "\n"
        textarea.value += client.name + ".".repeat(Math.max(0, (33-tempString.length))) + "R$" + client.bill.toFixed(2) + "\n"
        client.order.forEach(product => {
            if (product[1] <= 1) {
                tempString = "└" + product[0].name + "R$" + product[0].price + "\n"
                textarea.value += "└" + product[0].name + ".".repeat(Math.max(0, (33-tempString.length))) + "R$" + (product[0].price / product[0].orderedBy.split(',').length).toFixed(2) + "\n"
            } else {
                tempString = "└" + "(" + product[1] + "x)" + product[0].name + "R$" + product[0].price + "\n"
                textarea.value += "└" + "(" + product[1] + "x)" + product[0].name + ".".repeat(Math.max(0, (33-tempString.length))) + "R$" + ((product[0].price / product[0].orderedBy.split(',').length)*product[1]).toFixed(2) + "\n"
            }
        })
        if (client.tax) {
            tempString = "└Taxa de serviço" + "R$" + client.taxValue.toFixed(2) + "\n"
            textarea.value += "└Taxa de serviço" + ".".repeat(Math.max(0, (33-tempString.length))) + "R$" + client.taxValue.toFixed(2) + "\n"
        }
    })
    clients = []
}