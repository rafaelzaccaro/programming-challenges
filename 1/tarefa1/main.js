function convert(value) {
    let result = ''
    let arr = []
    let invalid = ['VV', 'LL', 'DD', 'IIII', 'XXXX', 'CCCC', 'MMMM', 'CMD', 'XCL', 'IXV']
    if (!isNaN(value)) {
        for (let i = 0; i < value.length; i++) {
            if (value[i+3] != undefined) {
                switch (value[i]) {
                    case '1':
                        result += 'M'
                        break
                    case '2': 
                        result += 'MM'
                        break
                    case '3':
                        result += 'MMM'
                        break
                }
            } else if (value[i+2] != undefined) {
                switch (value[i]) {
                    case '1':
                        result += 'C'
                        break
                    case '2': 
                        result += 'CC'
                        break
                    case '3':
                        result += 'CCC'
                        break
                    case '4':
                        result += 'CD'
                        break
                    case '5':
                        result += 'D'
                        break
                    case '6':
                        result += 'DC'
                        break
                    case '7':
                        result += 'DCC'
                        break
                    case '8':
                        result += 'DCCC'
                        break
                    case '9':
                        result += 'CM'
                        break
                }
            } else if (value[i+1] != undefined) {
                switch (value[i]) {
                    case '1':
                        result += 'X'
                        break
                    case '2': 
                        result += 'XX'
                        break
                    case '3':
                        result += 'XXX'
                        break
                    case '4':
                        result += 'XL'
                        break
                    case '5':
                        result += 'L'
                        break
                    case '6':
                        result += 'LX'
                        break
                    case '7':
                        result += 'LXX'
                        break
                    case '8':
                        result += 'LXXX'
                        break
                    case '9':
                        result += 'XC'
                        break
                }
            } else {
                switch (value[i]) {
                    case '1':
                        result += 'I'
                        break
                    case '2': 
                        result += 'II'
                        break
                    case '3':
                        result += 'III'
                        break
                    case '4':
                        result += 'IV'
                        break
                    case '5':
                        result += 'V'
                        break
                    case '6':
                        result += 'VI'
                        break
                    case '7':
                        result += 'VII'
                        break
                    case '8':
                        result += 'VIII'
                        break
                    case '9':
                        result += 'IX'
                        break
                }
            }
        }
    } else {
        for (let i = 0; i < invalid.length; i++) {
            if (value.includes(invalid[i])) {
                alert("Número em algarismos romanos inválido!")
                return
            }
        }
        for (let i = 0; i < value.length; i++) {
            switch (value[i]) {
                case 'M':
                    arr[i] = 1000
                    break
                case 'D':
                    if (value[i+1] == 'M') {
                        alert("Número em algarismos romanos inválido!")
                        return
                    } else {
                        arr[i] = 500
                    }
                    break
                case 'C':
                    if (value[i+1] == 'D' || value[i+1] == 'M') {
                        arr[i] = -100
                    } else {
                        arr[i] = 100
                    }
                    break
                case 'L':
                    if (value[i+1] == 'C' || value[i+1] == 'D' || value[i+1] == 'M') {
                        alert("Número em algarismos romanos inválido!")
                        return
                    } else {
                        arr[i] = 50
                    }
                    break
                case 'X':
                    if (value[i+1] == 'L' || value[i+1] == 'C') {
                        arr[i] = -10
                    } else if (value[i+1] == 'D' || value[i+1] == 'M') {
                        alert("Número em algarismos romanos inválido!")
                        return
                    } else {
                        arr[i] = 10
                    }
                    break
                case 'V':
                    if (value[i+1] == 'X' || value[i+1] == 'L' || value[i+1] == 'C' || value[i+1] == 'D' || value[i+1] == 'M') {
                        alert("Número em algarismos romanos inválido!")
                        return
                    } else {
                        arr[i] = 5
                    }
                    break
                case 'I':
                    if (value[i+1] == 'V' || value[i+1] == 'X') {
                        arr[i] = -1
                    } else if (value[i+1] == 'L' || value[i+1] == 'C' || value[i+1] == 'D' || value[i+1] == 'M') {
                        alert("Número em algarismos romanos inválido!")
                        return
                    } else {
                        arr[i] = 1
                    }
                    break
            }
            result = arr.reduce((a, b) => a + b, 0)
        }
    }
    document.querySelector('#final').value = result
}

function reverse() {
    let temp = document.querySelector('#source').value
    document.querySelector('#source').value = document.querySelector('#final').value
    document.querySelector('#final').value = temp
}

// - Algarismos de menor ou igual valor à direita são somados ao algarismo de maior valor;
// - Algarismos de menor valor à esquerda são subtraídos do algarismo de maior valor.
// Assim, XI representa 10 + 1 = 11, enquanto XC representa 100-10 = 90.
// - Um algarismo não pode ser repetido lado a lado por mais de três vezes. Assim, para
// representar 300, podemos usar CCC; para representar 400, entretanto, precisamos escrever CD.
// - A letra I é utilizada somente antes do V e do X, por exemplo: IV = 4; IX = 9;
// - A letra X é utilizada somente antes do L e do C, por exemplo: XL = 40; XC = 90;
// - A letra C é utilizada somente antes do D e do M, por exemplo, CD = 400; CM = 900.

// 990 -> 900 + 90 -> CM + XC -> CMXC
// max: 3999

// DCLXVI -> [D, C, L, X, V, I] -> [500, 100, 50, 10, 5, 1] -> 
// CMXL -> [C, M, X, L] -> [100, 1000, 10, 50] -> 