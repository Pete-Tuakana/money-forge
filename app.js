function cleanVendor(text){

text = text.replace(/"/g,"");   // remove quotes

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

function getVendorMemory(){

let memory = localStorage.getItem("vendorMemory");

if(memory){
return JSON.parse(memory);
}

return {};

}

function saveVendorMemory(memory){

localStorage.setItem("vendorMemory", JSON.stringify(memory));

}

function learnVendor(vendor){

return new Promise(resolve => {

let memory = getVendorMemory();

if(memory[vendor]){
resolve(memory[vendor]);
return;
}

let popup = document.getElementById("categoryPopup");
let title = document.getElementById("vendorTitle");

title.textContent = "Assign category for " + vendor;

popup.style.display = "block";

document.querySelectorAll(".catBtn").forEach(button => {

button.onclick = function(){

let category = this.textContent;

memory[vendor] = category;

saveVendorMemory(memory);

popup.style.display = "none";

resolve(category);

};

});

});

}
