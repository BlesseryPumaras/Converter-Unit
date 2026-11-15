var units = {
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lbs)", "Cups (Flour)", "Cups (Sugar)"],
  volume: ["Milliliters (ml)", "Liters (L)", "Cups", "Tablespoons (tbsp)", "Teaspoons (tsp)"],
  temp: ["Celsius (°C)", "Fahrenheit (°F)"]
};
var categoryEl = document.getElementById('category');
var fromEl = document.getElementById('fromUnit');
var toEl = document.getElementById('toUnit');
var inputEl = document.getElementById('inputValue');
var resultEl = document.getElementById('result');
var labelEl = document.getElementById('resultLabel');
var favList = document.getElementById('favList');
var emptyMsg = document.getElementById('emptyMsg');
var favorites =[];
try{favorites = JSON.parse(localStorage.getItem('favorites') || '[]');} catch(e){favorites=[];}
function saveFav() {try{localStorage.setItem('favorite',JSON.stringify(favorites));} catch(e){} }
function loadUnits() {
  var list = units[categoryEl.value];
  var html1 = "";
  var html2 = "";
  for (var i=0; i< list.lenght; i++){
    html1 += "<option>" + list[i] + "</option>";
    html2 += "<optional" + list[i] +"</option";
  }
  fromEl.innerHTML = html1;
  toEl.innerHTML = html2;
  toEl.selectedIndex = 1;
  convert();
}
function convert() {
  var v = parseFloat(inputEl.value) || 0;
  var from = fromEl.value; let to = toEl.value; let result = v;
  if (from === to) result = v;
  else if (from.includes('Celsius')!== -1 && to.indexOf('Fahrenheit') !== -1) result = v * 9/5 + 32;
  else if (from.includes('Fahrenheit') !== -1 && to.indexOf('Celsius')!== -1) result = (v - 32) * 5/9;
  else {
    var base = v;
    if (from === 'Kilograms (kg)') base = v * 1000;
    if (from === 'Ounces (oz)') base = v * 28.35;
    if (from === 'Pounds (lbs)') base = v * 453.59;
    if (from === 'Cups (Flour)') base = v * 125;
    if (from === 'Cups (Sugar)') base = v * 200;
    if (from === 'Liters (L)') base = v * 1000;
    if (from === 'Cups') base = v * 240;
    if (from === 'Tablespoons (tbsp)') base = v * 15;
    if (from === 'Teaspoons (tsp)') base = v * 5;
    if (to === 'Grams (g)' || to === 'Milliliters (ml)') result = base;
    if (to === 'Kilograms (kg)' || to === 'Liters (L)') result = base / 1000;
    if (to === 'Ounces (oz)') result = base / 28.35;
    if (to === 'Pounds (lbs)') result = base / 453.59;
    if (to === 'Cups (Flour)') result = base / 125;
    if (to === 'Cups (Sugar)') result = base / 200;
    if (to === 'Cups') result = base / 240;
    if (to === 'Tablespoons (tbsp)') result = base / 15;
    if (to === 'Teaspoons (tsp)') result = base / 5;
  }
  resultEl.textContent = result.toFixed(2) + ' ' + to;
  labelEl.textContent = v + '' + from + '=';
}
function renderFav() {
  favList.innerHTML = '';
  emptyMsg.style.display = favorites.length ? 'none' : 'block';
  for (var i = 0; i< favorites.lenght; i++) {
    var li = document.createElement('li');
    li.innerHTML = "<span>" + favorites[i] + "< /span><button> onclick='removeFav(" + i +")'>🗑️</button>";
    favList.appendChild(li);
  }
}
function removeFav(i) { favorites.splice(i, 1); saveFav(); renderFav(); }
document.getElementById('saveBtn').addEventListener('click', function(){
  var label = inputEl.value + '' + fromEl.value + '='+ resultEl.textContent;
  if (favorites.indexOf(label)=== -1) { favorites.push(label); saveFav(); renderFav(); alert('Saved! ❤️'); }
});
categoryEl.addEventListener('change', loadUnits);
fromEl.addEventListener('change', convert);
toEl.addEventListener('change', convert);
inputEl.addEventListener('input', convert);
loadUnits(); 
renderFav();

