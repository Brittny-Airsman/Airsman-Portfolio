// Set current year in footer
(function () {
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();

// Smooth scroll for internal links (if supported)
document.addEventListener("click", function (e) {
  var target = e.target;
  if (target.tagName === "A" && target.getAttribute("href") && target.getAttribute("href").startsWith("#")) {
    var id = target.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});
