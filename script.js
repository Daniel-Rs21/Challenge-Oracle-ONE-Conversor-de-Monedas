const symbols = ["$", "$", "€", "£", "¥", "₩"];

const inputs = document.getElementsByClassName("money");
const border = document.getElementsByClassName("border");
const btnConvert = document.getElementsByClassName("convert");

const rate = [1, 0.058562, 0.053185, 0.045935, 8.302447, 76.398639];

// Añadimos un evento 'input' a cada input
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function () {
    adjustInputWidth(this);
  });

  inputs[i].addEventListener("focus", function () {
    resetOtherInputs(this);
    this.select();
    changeBorder(i);
  });

  inputs[i].addEventListener("keypress", function(event){
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("convBtn").click();
    }
  });
}

// Función para poner en cero los demás inputs
function resetOtherInputs(activeInput) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] !== activeInput) {
      var symbol = symbols[i];
      inputs[i].value = "00.00";
      adjustInputWidth(inputs[i])
    }
  }
}

function adjustInputWidth(input) {
  input.style.width = input.value.length + "ch";
}

function currencyFormat(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function changeBorder(input) {
  for (let i = 0; i < border.length; i++) {
    if (i == input) {
      border[i].style.border = "1px solid #7e9aff";
    } else {
      border[i].style.border = "1px solid #fff";
    }
  }
}

function exchange() {
  for (var i = 0; i < inputs.length; i++) {
    let valor = inputs[i].value;

    if (valor != 0) {
      for (let j = 0; j < inputs.length; j++) {
        inputs[j].value = currencyFormat(valor * (rate[j] / rate[i]));
        adjustInputWidth(inputs[j]);
      }
      break;
    }
  }
}
