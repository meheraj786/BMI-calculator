const mode = document.querySelector("#main .top .mode");
const usBtn = document.querySelector("#main .top .mode .us");
const metricBtn = document.querySelector("#main .top .mode .metric");
const errMsg = document.querySelector("#main .errMsg");
const weightInput = document.querySelector("#main .input .weight");
const heightFeet = document.querySelector("#main .input .height .feet");
const heightInch = document.querySelector("#main .input .height .inch");
const heightCm = document.querySelector("#main .input .height .cm");
const hNum = document.querySelector("#main .result .hNum");
const wNum = document.querySelector("#main .result .wNum");
const calc = document.querySelector("#main .result .calc h2");
const comment = document.querySelector("#main .result .comment");
const indicator = document.querySelector("#main .result .indicator");
const tips= document.querySelector("#main .tips .tipsText");

let format = true;

usBtn.addEventListener("click", function method() {
  if (format !== true) {
    usBtn.classList.add("active");
    metricBtn.classList.remove("active");
    format = true;
    weightInput.placeholder = "Pounds";
    heightInch.style.display = "";
    heightFeet.style.display = "";
    heightCm.style.display = "none";
    weightInput.value = "";
    heightFeet.value = "";
    heightInch.value = "";
    heightCm.value = "";
    hNum.innerHTML = "_ _";
    wNum.innerHTML = "_ _";
    calc.innerHTML = "_ _";
    comment.innerHTML = "_ _";
    tips.innerHTML = "_ _";
    comment.style.backgroundColor="#D6FFDD"
    indicator.style.display="none"
  }
});

metricBtn.addEventListener("click", function method() {
  if (format === true) {
    metricBtn.classList.add("active");
    usBtn.classList.remove("active");
    format = false;
    weightInput.placeholder = "KG";
    heightInch.style.display = "none";
    heightFeet.style.display = "none";
    heightCm.style.display = "block";
    weightInput.value = "";
    heightFeet.value = "";
    heightInch.value = "";
    heightCm.value = "";
    hNum.innerHTML = "_ _";
    wNum.innerHTML = "_ _";
    calc.innerHTML = "_ _";
    comment.innerHTML = "_ _";
    tips.innerHTML = "_ _";
    comment.style.backgroundColor="#D6FFDD"
    indicator.style.display="none"
  }
});

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

function calculate() {
  // on click function
  if (format === true) {
    if (weightInput.value === "") {
      errMsg.innerHTML = "Add your weight";
    } else if (heightFeet.value === "" || heightInch.value === "") {
      errMsg.innerHTML = "Add your height";
    } else {
      errMsg.innerHTML = "";
      if (format === true) {
        const weight = weightInput.value;
        const feet = heightFeet.value;
        const inch = heightInch.value;
        const result = usCalc(weight, feet, inch);
        calc.innerHTML = result.toFixed(1);
        hNum.innerHTML = `${Math.round(
        heightFeet.value * 30.48 + heightInch.value * 2.54
        )} cm`;
      }
      wNum.innerHTML = `${Math.round(weightInput.value / 2.205)} kg`;
      if (calc.innerHTML < 15) {
        indicator.style.display = "none";
        comment.innerHTML = "Severely underweight";
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Focus on gaining weight healthily with advice from a healthcare provider.</li>" +
        "<li><strong>Food:</strong> Incorporate nutrient-dense foods like avocados, nuts, whole grains, and lean proteins.</li>" +
        "<li><strong>Tip:</strong> Consider nutritional supplements or shakes under medical guidance.</li>" +
    "</ul>";
    comment.style.backgroundColor = "#B3D4F0";
      } else if (calc.innerHTML >= 15 && calc.innerHTML <= 18.5) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Maintain regular meals and engage in light strength training to build muscle.</li>" +
        "<li><strong>Food:</strong> Add calorie-rich yet nutritious items like smoothies, peanut butter, and sweet potatoes.</li>" +
        "<li><strong>Tip:</strong> Avoid drinking water before meals to ensure enough food intake.</li>" +
    "</ul>";
        indicator.style.display = "inline-block";
        indicator.style.left = "0";
        indicator.style.width = "27%";
        comment.innerHTML = "You're Underweight";
        comment.style.backgroundColor = "#96DEE4";
      } else if (calc.innerHTML > 18.5 && calc.innerHTML <= 30) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Keep up regular physical activity like walking, yoga, or swimming.</li>" +
        "<li><strong>Food:</strong> Stick to balanced meals with a mix of protein, carbohydrates, and healthy fats.</li>" +
        "<li><strong>Tip:</strong> Practice mindful eating to maintain this healthy range.</li>" +
    "</ul>";
        indicator.style.display = "inline-block";
        indicator.style.left = "25%";
        indicator.style.width = "50%";
        comment.innerHTML = "You're Healthy";
        comment.style.backgroundColor = "#A4DEBD";
      } else if (calc.innerHTML > 30 && calc.innerHTML <= 40) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Increase physical activity – aim for at least 30 minutes daily.</li>" +
        "<li><strong>Food:</strong> Choose fiber-rich foods and reduce sugar and processed food intake.</li>" +
        "<li><strong>Tip:</strong> Keep a food diary to monitor eating habits.</li>" +
    "</ul>";
        indicator.style.display = "inline-block";
        indicator.style.left = "73%";
        indicator.style.width = "27%";
        comment.innerHTML = "You're Obese";
        comment.style.backgroundColor = "#E5A789";
      } else if (calc.innerHTML > 40) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Prioritize mobility exercises to reduce joint strain.</li>" +
        "<li><strong>Food:</strong> Gradually reduce portion sizes and focus on balanced meals with vegetables and healthy fats.</li>" +
        "<li><strong>Tip:</strong> Explore medical weight loss programs if recommended by a doctor.</li>" +
    "</ul>";
        indicator.style.display = "none";
        comment.innerHTML = "Severely obese";
        comment.style.backgroundColor = "#E3828D";
      }
    }
  } else {
    if (weightInput.value === "") {
      errMsg.innerHTML = "Add your weight";
    } else if (heightCm.value === "") {
      errMsg.innerHTML = "Add your height";
    } else {
      errMsg.innerHTML = "";
      const weight = weightInput.value;
      const cm = heightCm.value;
      const result = metricCalc(weight, cm);
      calc.innerHTML = result.toFixed(1);
      hNum.innerHTML = `${cm} cm`;
      wNum.innerHTML = `${weight} kg`;
      if (result < 15) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Focus on gaining weight healthily with advice from a healthcare provider.</li>" +
        "<li><strong>Food:</strong> Incorporate nutrient-dense foods like avocados, nuts, whole grains, and lean proteins.</li>" +
        "<li><strong>Tip:</strong> Consider nutritional supplements or shakes under medical guidance.</li>" +
    "</ul>";
        indicator.style.display = "none";
        comment.innerHTML = "Severely underweight";
        comment.style.backgroundColor = "#B3D4F0";
      } else if (result >= 15 && result <= 18.5) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Maintain regular meals and engage in light strength training to build muscle.</li>" +
        "<li><strong>Food:</strong> Add calorie-rich yet nutritious items like smoothies, peanut butter, and sweet potatoes.</li>" +
        "<li><strong>Tip:</strong> Avoid drinking water before meals to ensure enough food intake.</li>" +
    "</ul>";
        indicator.style.display = "inline-block";
        indicator.style.left = "0";
        indicator.style.width = "27%";
        comment.innerHTML = "You're Underweight";
        comment.style.backgroundColor = "#96DEE4";
      } else if (result > 18.5 && result <= 30) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Keep up regular physical activity like walking, yoga, or swimming.</li>" +
        "<li><strong>Food:</strong> Stick to balanced meals with a mix of protein, carbohydrates, and healthy fats.</li>" +
        "<li><strong>Tip:</strong> Practice mindful eating to maintain this healthy range.</li>" +
    "</ul>";
        indicator.style.display = "inline-block";
        indicator.style.left = "25%";
        indicator.style.width = "50%";
        comment.innerHTML = "You're Healthy";
        comment.style.backgroundColor = "#A4DEBD";
      } else if (result > 30 && result <= 40) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Increase physical activity – aim for at least 30 minutes daily.</li>" +
        "<li><strong>Food:</strong> Choose fiber-rich foods and reduce sugar and processed food intake.</li>" +
        "<li><strong>Tip:</strong> Keep a food diary to monitor eating habits.</li>" +
    "</ul>";
        indicator.style.display = "inline-block";
        indicator.style.left = "73%";
        indicator.style.width = "27%";
        comment.innerHTML = "You're Obese";
        comment.style.backgroundColor = "#E5A789";
      } else if (result > 40) {
        tips.innerHTML = "<ul>" +
        "<li><strong>Lifestyle:</strong> Prioritize mobility exercises to reduce joint strain.</li>" +
        "<li><strong>Food:</strong> Gradually reduce portion sizes and focus on balanced meals with vegetables and healthy fats.</li>" +
        "<li><strong>Tip:</strong> Explore medical weight loss programs if recommended by a doctor.</li>" +
    "</ul>";
        indicator.style.display = "none";
        comment.innerHTML = "Severely obese";
        comment.style.backgroundColor = "#E3828D";
      }
    }
  }
}
