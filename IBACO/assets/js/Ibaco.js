
/* =====================================================
   PRICE MAPS + RANDOM PRICING
===================================================== */
let flavourPrices = {};
let toppingPrices = {};
let servingPrices = {
  "Cup": 8,
  "Cone": 13,
  "Waffle Bowl": 19,
  "Ice Cream Cake": 28
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- FLAVOURS PRICING ---------------- */
  document
    .querySelectorAll("#customization .custom-group:nth-child(1) .option")
    .forEach(opt => {
      const name = opt.innerText.trim();
      const price = random(20, 50);
      flavourPrices[name] = price;
      opt.innerHTML = `${name}<br><small>$${price}</small>`;
    });

  /* ---------------- TOPPINGS PRICING ---------------- */
  document
    .querySelectorAll("#customization .custom-group:nth-child(2) .option")
    .forEach(opt => {
      const name = opt.innerText.trim();
      const price = random(20, 35);
      toppingPrices[name] = price;
      opt.innerHTML = `${name}<br><small>$${price}</small>`;
    });

  /* ---------------- SERVING DESIGN DISPLAY ---------------- */
  document
    .querySelectorAll("#customization .custom-group:nth-child(4) .option")
    .forEach(opt => {
      const name = opt.innerText.trim();
      const price = servingPrices[name] || 0;
      opt.innerHTML = `${name}<br><small>$${price}</small>`;
    });

});

/* =====================================================
   SELECTION + SUMMARY + CALCULATION
===================================================== */
document.addEventListener("DOMContentLoaded", function () {

  const groups = document.querySelectorAll(".custom-group");

  const flavourOptions = groups[0].querySelectorAll(".option");
  const toppingOptions = groups[1].querySelectorAll(".option");
  const scoopOptions   = groups[2].querySelectorAll(".option");
  const designOptions  = groups[3].querySelectorAll(".option");

  let selectedFlavours = [];
  let selectedToppings = [];
  let selectedScoops = 0;
  let selectedDesign = "";
  let pricePerScoop = 3;

  /* ---------- SUMMARY + PRICE BOX ---------- */
  const summaryBox = document.createElement("div");
  summaryBox.style.marginTop = "2rem";
  summaryBox.style.padding = "1.5rem";
  summaryBox.style.background = "#FFF7EC";
  summaryBox.style.borderRadius = "16px";
  summaryBox.style.fontSize = ".9rem";

  const priceBox = document.createElement("h3");
  priceBox.style.marginTop = "1rem";

  groups[3].appendChild(summaryBox);
  groups[3].appendChild(priceBox);

  /* ---------- PRICE CALCULATION ---------- */
  function updatePrice() {
    let total = 0;

    selectedFlavours.forEach(f => {
      total += flavourPrices[f] || 0;
    });

    selectedToppings.forEach(t => {
      total += toppingPrices[t] || 0;
    });

    total += selectedScoops * pricePerScoop;

    if (selectedDesign) {
      total += servingPrices[selectedDesign] || 0;
    }

    priceBox.innerText = "Total Price: $" + total;
  }

  function updateSummary() {
    summaryBox.innerHTML = `
      <strong>YOUR CUSTOM ICE CREAM ORDER:</strong><br><br>
      <strong>🍧 Flavours:</strong> ${selectedFlavours.join(", ") || "None"}<br><br>
      <strong>🍪 Toppings:</strong> ${selectedToppings.join(", ") || "None"}<br><br>
      <strong>🍨 Scoops:</strong> ${selectedScoops || "Not selected"}<br><br>
      <strong>🧁 Serving:</strong> ${selectedDesign || "Not selected"}
    `;
  }

  /* ---------- FLAVOURS (MULTI SELECT) ---------- */
  flavourOptions.forEach(option => {
    option.addEventListener("click", () => {
      option.classList.toggle("active");

      const value = option.innerText.split("\n")[0];
      if (selectedFlavours.includes(value)) {
        selectedFlavours = selectedFlavours.filter(f => f !== value);
      } else {
        selectedFlavours.push(value);
      }

      updateSummary();
      updatePrice();
    });
  });

  /* ---------- TOPPINGS (MULTI SELECT) ---------- */
  toppingOptions.forEach(option => {
    option.addEventListener("click", () => {
      option.classList.toggle("active");

      const value = option.innerText.split("\n")[0];
      if (selectedToppings.includes(value)) {
        selectedToppings = selectedToppings.filter(t => t !== value);
      } else {
        selectedToppings.push(value);
      }

      updateSummary();
      updatePrice();
    });
  });

  /* ---------- SCOOPS (SINGLE SELECT) ---------- */
  scoopOptions.forEach(option => {
    option.addEventListener("click", () => {
      scoopOptions.forEach(o => o.classList.remove("active"));
      option.classList.add("active");

      selectedScoops = parseInt(option.innerText);
      updateSummary();
      updatePrice();
    });
  });

  /* ---------- SERVING DESIGN (SINGLE SELECT) ---------- */
  designOptions.forEach(option => {
    option.addEventListener("click", () => {
      designOptions.forEach(o => o.classList.remove("active"));
      option.classList.add("active");

      selectedDesign = option.innerText.split("\n")[0];
      updateSummary();
      updatePrice();
    });
  });

  updateSummary();
  updatePrice();
});

