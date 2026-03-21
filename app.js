function cleanVendor(text){

text = text.replace(/"/g,"");
text = text.toUpperCase();

text = text.replace(/CARD.*$/,"");
text = text.replace(/VALUE DATE.*$/,"");
text = text.replace("7-ELEVEN","SEVEN-ELEVEN");
text = text.replace(/\d+/g,"");

text = text.replace("SQ *","");
text = text.replace("SP ","");

text = text.replace("AU AUS","");
text = text.replace("AU","");

text = text.trim();

let words = text.split(" ");
return words[0];

}

let vendorMemory = JSON.parse(localStorage.getItem("vendorMemory")) || {};

async function learnVendor(vendor){

if(vendorMemory[vendor]){
return vendorMemory[vendor];
}

return await askUserForCategory(vendor);

}

function saveVendor(vendor, category){
vendorMemory[vendor] = category;
localStorage.setItem("vendorMemory", JSON.stringify(vendorMemory));
}

function askUserForCategory(vendor){

return new Promise(resolve => {

const popup = document.getElementById("categoryPopup");
const title = document.getElementById("vendorTitle");

title.innerText = `Assign category: ${vendor}`;
popup.style.display = "block";

const buttons = document.querySelectorAll(".catBtn");

buttons.forEach(btn => {

btn.onclick = () => {

const category = btn.innerText;

saveVendor(vendor, category);

popup.style.display = "none";

resolve(category);

};

});

});

}

function editCategory(vendor){

askUserForCategory(vendor).then(newCategory => {

vendorMemory[vendor] = newCategory;
localStorage.setItem("vendorMemory", JSON.stringify(vendorMemory));

location.reload();

});

}

function animateForge(target){

let current = 0;
let step = target / 30;

let interval = setInterval(() => {

current += step;

if((step > 0 && current >= target) || (step < 0 && current <= target)){
current = target;
clearInterval(interval);
}

document.getElementById("forgeAmount").innerText =
"$" + current.toFixed(0);

}, 30);

}

function drawPieChart(survival, lifestyle, wealth){

const canvas = document.getElementById("pieChart");
const ctx = canvas.getContext("2d");

const total = survival + lifestyle + wealth;

let startAngle = 0;

function drawSlice(value, color){
    let sliceAngle = (value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.arc(150,150,150,startAngle,startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    startAngle += sliceAngle;
}

// clear first
ctx.clearRect(0,0,300,300);

// draw slices
drawSlice(survival, "#FF5252");   // red
drawSlice(lifestyle, "#FFC107");  // yellow
drawSlice(wealth, "#4CAF50");     // green

}
