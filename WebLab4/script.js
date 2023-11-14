function toggleMenu() {
    var dropdown = document.getElementById("dropdownMenu");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

document.addEventListener("click", function(event) {
    var dropdown = document.getElementById("dropdownMenu");
    var button = document.querySelector(".nav-button");

    var isClickInside = button.contains(event.target) || dropdown.contains(event.target);

    if (!isClickInside && !event.target.classList.contains('dropdown-item')) {
        dropdown.style.display = "none";
    }
});
