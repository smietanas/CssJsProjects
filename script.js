// window.scrollTo({ top: 2000, left: 0, behavior: "smooth" });
// getBoundingClientRect()

// navigation
$("nav ul li a").on("click", function() {
  const goToSection = "#" + $(this).attr("class");

  $("body, html").animate({
    scrollTop: $(goToSection).offset().top
  });
});

//burger
// const burger = document.querySelector(".burger");
// const iconBurger = document.querySelector(".fa-bars");
// const iconX = document.querySelector(".fa-times");

// burger.addEventListener("click", function() {
//   iconBurger.classList.toggle("show");
//   iconX.classList.toggle("show");
//   document.querySelector("nav").classList.toggle("active");
// });
