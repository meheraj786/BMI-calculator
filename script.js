const mode = document.querySelector("#main .top .mode")
const usBtn= document.querySelector("#main .top .mode .us")
const metricBtn= document.querySelector("#main .top .mode .metric")
const errMsg= document.querySelector("#main .errMsg")
const weightInput= document.querySelector("#main .input .weight")
const heightFeet= document.querySelector("#main .input .height .feet")
const heightInch= document.querySelector("#main .input .height .inch")
const heightCm= document.querySelector("#main .input .height .cm")
const hNum= document.querySelector("#main .result .hNum")
const wNum= document.querySelector("#main .result .wNum")
const calc= document.querySelector("#main .result .calc h2")
const comment= document.querySelector("#main .result .comment")
const indicator= document.querySelector("#main .result .indicator")

let format=true;
usBtn.addEventListener("click",function method() {
  if (format =true) {
    usBtn.classList.add("active")
  metricBtn.classList.remove("active")
  format =true
  weightInput.placeholder ="Pounds"
  heightInch.style.display=""
  heightFeet.style.display=""
  heightCm.style.display="none"
  }
})
metricBtn.addEventListener("click",function method() {
  if (format =true) {
    metricBtn.classList.add("active")
  usBtn.classList.remove("active")
  format =false;
  weightInput.placeholder ="KG"
  heightInch.style.display="none"
  heightFeet.style.display="none"
  heightCm.style.display="block"
  }
})

function usCalc(weight, feet, inch) {
  const finalWeight = weight / 2.205;
  const cm1 = feet * 30.48;
  const cm2 = inch * 2.54;
  const cm = cm1 + cm2;
  return finalWeight / ((cm / 100) * (cm / 100)); 
}
function metricCalc(weight, cm) {
  return weight / ((cm / 100) * (cm / 100)); 
}

function calculate() {  // on click function
if (format===true) {
  if (weightInput.value === "") {
    errMsg.innerHTML = "add your weight";
  } else if (heightFeet.value === "" || heightInch.value === "") {
    errMsg.innerHTML = "add your height";
  } else {
    errMsg.innerHTML = "";
    if (format === true) {
      const weight = weightInput.value;
      const feet = heightFeet.value;
      const inch = heightInch.value;
      const result = usCalc(weight, feet, inch);
      calc.innerHTML=(Math.round(result));
      hNum.innerHTML= `${Math.round((heightFeet.value* 30.48)+(heightInch.value * 2.54))} cm`
    } 
    wNum.innerHTML= `${Math.round(weightInput.value/ 2.205)} kg`
  }
}else{
  if (weightInput.value === "") {
    errMsg.innerHTML = "add your weight";
  } else if (heightCm.value === ""){
    errMsg.innerHTML = "add your height";
  } else {
    errMsg.innerHTML = "";
      const weight = weightInput.value;
      const cm = heightCm.value;
      const result = metricCalc(weight, cm);
      calc.innerHTML=(Math.round(result));
      hNum.innerHTML= `${cm} cm`
      wNum.innerHTML= `${weight} kg`
    } 
}
}