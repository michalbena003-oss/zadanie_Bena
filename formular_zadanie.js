document.getElementById("meno").addEventListener("input", function() {
    document.getElementById("nahladMeno").textContent = this.value;
});
document.getElementById("email").addEventListener("input", function() {
    document.getElementById("nahladEmail").textContent = this.value;
});
document.getElementById("kurz").addEventListener("input", function() {
    document.getElementById("nahladKurz").textContent = this.value;
});
document.getElementById("beginner").addEventListener("change", function() {
    document.getElementById("nahladUroven").textContent = this.value;
});
document.getElementById("intermediate").addEventListener("change", function() {
    document.getElementById("nahladUroven").textContent = this.value;
});
document.getElementById("advanced").addEventListener("change", function() {
    document.getElementById("nahladUroven").textContent = this.value;
});
document.getElementById("poznamka").addEventListener("input", function() {
    document.getElementById("nahladPoznamka").textContent = this.value;
});

document.getElementById("form").addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Formulár bol úspešne odoslaný.");

});