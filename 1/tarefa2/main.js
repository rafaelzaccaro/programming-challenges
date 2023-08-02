let board, gen = 0, width, height, interval
function init(x, y) {
    if (!!document.querySelector('#game-board')) {
        document.querySelector("#board").removeChild(document.querySelector('#game-board'))
    }
    x = parseInt(x)
    y = parseInt(y)
    width = x
    height = y
    let rows = []
    board = Array(x).fill(null).map(() => Array(y).fill(0))
    let table = document.createElement("table")
    table.setAttribute("class", "game-board")
    table.setAttribute("id", "game-board")
    let tbody = document.createElement("tbody")
    for (let i = 0; i < x; i++) {
        let tr = document.createElement("tr")
        rows.push(tr)
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            var td = document.createElement("td")
            td.setAttribute("class", "dead")
            td.setAttribute("onclick", "this.classList.toggle(\"alive\"); this.classList.toggle(\"dead\"); cellClicked()")
            td.setAttribute("row", i)
            td.setAttribute("col", j)
            td.setAttribute("neighbours", 0)
            rows[i].appendChild(td)
        }
        tbody.appendChild(rows[i])
    }
    table.appendChild(tbody)
    document.querySelector("#board").appendChild(table);
}

function cellClicked() {
    document.querySelectorAll(".alive").forEach(cell => {
        board[cell.attributes.row.nodeValue][cell.attributes.col.nodeValue] = 1
    })
    document.querySelectorAll(".dead").forEach(cell => {
        board[cell.attributes.row.nodeValue][cell.attributes.col.nodeValue] = 0
    })
}

function start() {
    startButton = document.querySelector("#start-button")
    if (startButton.textContent === "Iniciar") {
        interval = self.setInterval(gameStep, 250)
        startButton.textContent = "Parar"
    } else {
        window.clearInterval(interval)
        startButton.textContent = "Iniciar"
    }
    
}

function gameStep() {
    gen++
    document.querySelector("#gen-display").value = "Geração: " + gen
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    if ((k != 0 || l != 0) && i+k > -1 && j+l > -1 && i+k < board.length && j+l < board[0].length && board[i+k] != undefined && board[i+k][j+l] != undefined && board[i+k][j+l] == 1) {
                        document.querySelector("[row=\""+i+"\"][col=\""+j+"\"]").attributes.neighbours.nodeValue++
                    }
                }
            }
        }
    }
    document.querySelectorAll("td").forEach(cell => {
        let neighbours = cell.attributes.neighbours.nodeValue
        let i = cell.attributes.row.nodeValue
        let j = cell.attributes.col.nodeValue
        if (neighbours == 3 && cell.className == "dead") {
            board[i][j] = 1
            cell.className = "alive"
        } else if (neighbours > 3 || neighbours < 2) {
            board[i][j] = 0
            cell.className = "dead"
        }
        cell.attributes.neighbours.nodeValue = 0
    })
}

function reset() {
    gen = 0
    document.querySelector("#gen-display").value = "Geração: " + gen
    board = Array(width).fill(null).map(() => Array(height).fill(0))
    console.log(board)
    document.querySelectorAll("td").forEach(cell => {
        cell.className = "dead"
        cell.attributes.neighbours.nodeValue = 0
    })
    window.clearInterval(interval)
    document.querySelector("#start-button").textContent = "Iniciar"
}