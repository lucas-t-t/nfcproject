var urlParams = new URLSearchParams(window.location.search);
var ciphertext = urlParams.get("d");

var key = "00000000000000000000000000000000";
var iv = "00000000000000000000000000000000";

var ciphertextWA = CryptoJS.enc.Hex.parse(ciphertext);
var keyWA = CryptoJS.enc.Hex.parse(key);
var ivWA = CryptoJS.enc.Hex.parse(iv);
var ciphertextCP = { ciphertext: ciphertextWA };

var decrypted = CryptoJS.AES.decrypt(
ciphertextCP,
keyWA,
{ iv: ivWA, padding: CryptoJS.pad.NoPadding }
);

var plainText = decrypted.toString(CryptoJS.enc.Hex);

console.log(plainText);

var PICCDataTag = plainText.substring(0, 2);
var UID = plainText.substring(2, 16);
var SDMReadCtr = plainText.substring(20, 22) + plainText.substring(18, 20) + plainText.substring(16, 18);

document.getElementById("CipherText").innerHTML = "<p><b>Cipher Text: </b>"+ ciphertext +"</p>"; 
document.getElementById("UID").innerHTML = "<p><b>UID: </b>"+ UID +"</p>";
document.getElementById("PICCDataTag").innerHTML = "<p><b>PICCDataTag: </b>"+ PICCDataTag +"</p>";
document.getElementById("Counter").innerHTML = "<p><b>Counter: </b>"+ SDMReadCtr +"</p>";


if(UID == "044e1b12aa6180"){
    document.getElementById("BalancaID").innerHTML = "<p><b>Modelo da Balança:</b> Prix 3 Fit</p><p><b>Número de Série:</b> 10150590</p>"; 
}
else{
    document.getElementById("BalancaID").innerHTML = "<h3><b>BALANÇA NÃO IDENTIFICADA</b></h3>"; 
}
