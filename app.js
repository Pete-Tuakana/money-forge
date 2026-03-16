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

let memory = getVendorMemory();

if(memory[vendor]){
return memory[vendor];
}

let category = prompt("Assign category for: " + vendor);

memory[vendor] = category;

saveVendorMemory(memory);

return category;

}
