fetch("topbar.html")
.then(response => response.text())
.then(html => {
    document.body.insertAdjacentHTML("afterbegin",html);
})
.catch(error => {
    console.error("Topbar could not be loaded. Run the website using a local web server (for example Live Server).", error);
});

const button = document.getElementById("changeButton");
const button2 = document.getElementById("themeButton");
const lightmod = document.getElementById("lightmod");
const message = document.getElementById("message");

if (button && message){
    button.addEventListener("click", () => {
    message.textContent = "Výborne!";
    });
}

const nameInput = document.getElementById("nameInput");
const output = document.getElementById("output");

if (nameInput && output){
    nameInput.addEventListener("input", () => {
        const name = nameInput.value;
        output.textContent = `Čauko, ${name}!`;
    });
}
if (button2 && lightmod){
    button2.addEventListener("click", () => {
        lightmod.classList.add("lightmod");
   
    });
}












