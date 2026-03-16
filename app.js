function cleanVendor(text){

text = text.toUpperCase();

text = text.replace(/CARD.*$/,"");
text = text.replace(/VALUE DATE.*$/,"");
text = text.replace(/\d+/g,"");

text = text.replace("SQ *","");
text = text.replace("SP ","");

text = text.replace("AU AUS","");
text = text.replace("AU","");

text = text.trim();

let words = text.split(" ");

return words[0];

}
