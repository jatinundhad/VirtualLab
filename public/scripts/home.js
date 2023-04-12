document.getElementById("knock").addEventListener("click", () => {
  document.getElementById("drop").classList.add("drop");
  setTimeout(() => {
    document.getElementById("drop").classList.remove("drop");
  }, 2000);

  const liquid = document.getElementById("liquid");
  setTimeout(() => {
    liquid.style.height = liquid.offsetHeight + 2 + "px";
  }, 500);

  if (liquid.offsetHeight > 30) {
    liquid.style.backgroundColor = "purple";
    document.getElementById("knock").disabled = true;
  }
});
