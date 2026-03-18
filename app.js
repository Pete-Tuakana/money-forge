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
