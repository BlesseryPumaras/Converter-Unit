const recipes=[
{name:"Chicken Adobo",emoji:"🍗",time:"45 min",level:"Easy",cat:"Main Dish",desc:"Classic Filipino adobo — soy sauce, vinegar, garlic, bay leaves.",ing:"Chicken, soy sauce, vinegar, garlic, bay leaves, peppercorn, cooking oil"},
{name:"Chicken Tinola",emoji:"🐔",time:"40 min",level:"Easy",cat:"Soup",desc:"Ginger chicken soup with papaya and malunggay.",ing:"Chicken, ginger, papaya, malunggay, fish sauce, onion, water"},
{name:"Pork Sinigang",emoji:"🍲",time:"60 min",level:"Medium",cat:"Soup",desc:"Sour soup with pork, sampalok, labanos, kangkong and tomatoes.",ing:"Pork, sampalok mix, labanos, kangkong, tomatoes, onion, sitaw"},
{name:"Pakbet",emoji:"🥦",time:"35 min",level:"Easy",cat:"Main Dish",desc:"Ilocos mixed vegetables with bagoong and pork.",ing:"Kalabasa, okra, talong, ampalaya, sitaw, bagoong, pork, onion, garlic"},
{name:"Pancit Bihon",emoji:"🍜",time:"30 min",level:"Easy",cat:"Noodles",desc:"Stir-fried rice noodles with chicken, vegetables and calamansi.",ing:"Bihon noodles, chicken, carrots, cabbage, celery, soy sauce, calamansi"},
{name:"Tortang Talong",emoji:"🍆",time:"25 min",level:"Easy",cat:"Main Dish",desc:"Grilled eggplant omelet — crispy outside, soft inside.",ing:"Talong, eggs, onion, garlic, salt, cooking oil"},
{name:"Lumpiang Shanghai",emoji:"🥟",time:"45 min",level:"Medium",cat:"Snack",desc:"Crispy spring rolls with pork and vegetables.",ing:"Ground pork, carrots, lumpia wrapper, garlic, soy sauce, egg"},
{name:"Lumpiang Gulay",emoji:"🥬",time:"35 min",level:"Easy",cat:"Snack",desc:"Fresh vegetable lumpia with togue and sauce.",ing:"Togue, carrots, cabbage, kamote, lumpia wrapper, garlic sauce"},
{name:"Champorado",emoji:"🍫",time:"30 min",level:"Easy",cat:"Dessert",desc:"Chocolate rice porridge — best with tuyo and milk.",ing:"Malagkit rice, tablea / cocoa, sugar, evaporated milk, tuyo"},
{name:"Leche Flan",emoji:"🍮",time:"60 min",level:"Medium",cat:"Dessert",desc:"Creamy caramel custard — smooth and sweet.",ing:"Egg yolks, condensed milk, evaporated milk, sugar, vanilla, calamansi"},
{name:"Halo-Halo",emoji:"🍧",time:"15 min",level:"Easy",cat:"Dessert",desc:"Filipino shaved ice dessert with milk, beans and ube.",ing:"Shaved ice, evaporated milk, ube halaya, beans, sago, leche flan"},
{name:"Ube Halaya",emoji:"💜",time:"50 min",level:"Medium",cat:"Dessert",desc:"Purple yam jam — creamy, sweet and pang-handaan.",ing:"Ube, condensed milk, evaporated milk, butter, sugar"},
{name:"Maruya",emoji:"🍌",time:"20 min",level:"Easy",cat:"Snack",desc:"Banana fritters — crispy, sweet and perfect for merienda.",ing:"Saging na saba, flour, egg, sugar, milk, cooking oil"},
{name:"Bibingka",emoji:"🍰",time:"45 min",level:"Medium",cat:"Dessert",desc:"Rice cake with salted egg, cheese and coconut.",ing:"Rice flour, coconut milk, salted egg, cheese, sugar, banana leaves"},
{name:"Kare-Kare",emoji:"🥜",time:"90 min",level:"Hard",cat:"Main Dish",desc:"Oxtail stew in peanut sauce with vegetables and bagoong.",ing:"Oxtail / beef, peanut butter, eggplant, string beans, pechay, bagoong"},
{name:"Spaghetti",emoji:"🍝",time:"35 min",level:"Easy",cat:"Noodles",desc:"Filipino sweet spaghetti with hotdog and cheese.",ing:"Spaghetti noodles, ground pork, tomato sauce, hotdog, cheese, sugar"},
{name:"Sisig",emoji:"🔥",time:"60 min",level:"Medium",cat:"Main Dish",desc:"Sizzling pork with calamansi, chili and egg.",ing:"Pork face / belly, calamansi, chili, onion, egg, mayo, soy sauce"},
{name:"Bicol Express",emoji:"🌶️",time:"50 min",level:"Medium",cat:"Main Dish",desc:"Spicy pork in coconut milk with chili and bagoong.",ing:"Pork, coconut milk, chili, bagoong, garlic, onion"},
{name:"Fish Paksiw",emoji:"🐟",time:"30 min",level:"Easy",cat:"Main Dish",desc:"Fish simmered in vinegar, ginger and ampalaya.",ing:"Bangus, vinegar, ginger, ampalaya, onion, garlic, water"},
{name:"Salad",emoji:"🥗",time:"15 min",level:"Easy",cat:"Snack",desc:"Fresh Filipino salad — crunchy, healthy and light.",ing:"Lettuce, cucumber, tomatoes, carrots, egg, mayo / dressing, salt"}
];
let favorites=JSON.parse(localStorage.getItem('hc_fav')||'[]');
let shopping=JSON.parse(localStorage.getItem('hc_shop')||'["Chicken","Garlic","Soy Sauce","Vinegar","Onion","Cooking Oil"]');
let convFavs=JSON.parse(localStorage.getItem('hc_conv_fav')||'[]');
let currentFilter='All';
let timerInterval=null;
let timerSeconds=0;
let timerRunning=false;

function showPage(id){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById(id).classList.add('active');
document.querySelectorAll('.b-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
if(id==='recipes') renderRecipes();
if(id==='favorites') renderFavs();
if(id==='shopping') renderShop();
if(id==='converter') renderConvFavs();
updateCounts();
}
document.querySelectorAll('.b-btn').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
function cardHTML(r,i){
const isFav=favorites.includes(i)?'⭐':'☆';
return `<div class="recipe-card"><button class="fav-btn" onclick="event.stopPropagation();toggleFav(${i})">${isFav}</button><div onclick="openRecipe(${i})"><div class="emoji">${r.emoji}</div><b>${r.name}</b><span>${r.time} • ${r.level} • ${r.cat}</span><p>${r.desc}</p></div></div>`;
}
function renderRecipes(){
const q=(document.getElementById('searchInput').value||'').toLowerCase();
const filtered=recipes.filter(r=>(currentFilter==='All'||r.cat===currentFilter)&&r.name.toLowerCase().includes(q));
document.getElementById('recipeList').innerHTML=filtered.map(r=>cardHTML(r,recipes.indexOf(r))).join('')||'<p>No recipe found. Try All.</p>';
}
function renderFavs(){
const el=document.getElementById('favList');
if(!favorites.length){el.innerHTML='<p>No favorites yet. Tap ☆ on any recipe.</p>';}
else{el.innerHTML=favorites.map(i=>cardHTML(recipes[i],i)).join('');}
const cel=document.getElementById('favConvList');
if(!convFavs.length){cel.innerHTML='<p>No saved conversions yet.</p>';}
else{cel.innerHTML=convFavs.map((c,idx)=>`<div class="conv-fav"><b>⚖️ ${c}</b><span style="cursor:pointer" onclick="removeConvFav(${idx})">✕</span></div>`).join('');}
}
function renderConvFavs(){
const el=document.getElementById('convFavList');
if(!convFavs.length){el.innerHTML='<p style="color:#888;font-size:14px">No saved conversions yet. Convert then tap Save.</p>';return;}
el.innerHTML=convFavs.map((c,idx)=>`<div class="conv-fav"><b>⚖️ ${c}</b><span style="cursor:pointer" onclick="removeConvFav(${idx})">✕</span></div>`).join('');
}
function formatTime(s){
let m=Math.floor(s/60); let sec=s%60;
return String(m).padStart(2,'0')+":"+String(sec).padStart(2,'0');
}
function updateTimerDisplay(){
let el=document.getElementById('timerDisplay');
if(el) el.innerText=formatTime(timerSeconds);
}
function setTimerMinutes(){
let inp=document.getElementById('timerInput');
let mins=parseInt(inp.value||0);
if(isNaN(mins)||mins<0) mins=0;
if(mins>180) mins=180;
timerSeconds=mins*60;
stopTimerOnly();
updateTimerDisplay();
}
function startTimer(){
if(timerSeconds<=0){alert('Lagyan mo muna ng minutes! Hal. 45');return;}
if(timerRunning) return;
timerRunning=true;
document.getElementById('timerBtn').innerText='⏸️ Pause';
timerInterval=setInterval(()=>{
timerSeconds--;
updateTimerDisplay();
if(timerSeconds<=0){
clearInterval(timerInterval);
timerRunning=false;
document.getElementById('timerBtn').innerText='▶️ Start';
alert('⏰ Luto na! Tapos na yung timer!');
}
},1000);
}
function pauseTimer(){
if(!timerRunning) { startTimer(); return; }
clearInterval(timerInterval);
timerRunning=false;
document.getElementById('timerBtn').innerText='▶️ Start';
}
function stopTimerOnly(){
clearInterval(timerInterval);
timerRunning=false;
let btn=document.getElementById('timerBtn');
if(btn) btn.innerText='▶️ Start';
}
function resetTimer(){
stopTimerOnly();
setTimerMinutes();
}

function openRecipe(i){
const r=recipes[i];const isFav=favorites.includes(i);
let mins=parseInt(r.time) || 30;
stopTimerOnly();
timerSeconds=mins*60;
document.getElementById('modalBody').innerHTML=`
<div style="font-size:50px">${r.emoji}</div>
<h2>${r.name}</h2><p>${r.time} • ${r.level} • ${r.cat}</p><p>${r.desc}</p>
<h3>Ingredients</h3><p>${r.ing}</p>

<div class="timer-box">
<div style="font-weight:800">⏰ Cooking Timer</div>
<div style="font-size:12px">Ilan minutes mo lulutuin? Type mo dito</div>
<div class="timer-display" id="timerDisplay">${formatTime(timerSeconds)}</div>
<div class="timer-row">
<input type="number" id="timerInput" value="${mins}" min="1" max="180" placeholder="Minutes" onchange="setTimerMinutes()">
<button class="timer-btn" style="background:#1a1a1a;color:#fff" onclick="setTimerMinutes()">Set</button>
</div>
<div class="timer-row">
<button class="timer-btn" id="timerBtn" style="background:#e67e22;color:#fff" onclick="pauseTimer()">▶️ Start</button>
<button class="timer-btn" style="background:#fff;color:#333" onclick="resetTimer()">🔄 Reset</button>
</div>
<div style="font-size:12px;margin-top:6px">Quick: <span style="cursor:pointer;text-decoration:underline" onclick="document.getElementById('timerInput').value=5;setTimerMinutes()">5 min</span> • <span style="cursor:pointer;text-decoration:underline" onclick="document.getElementById('timerInput').value=10;setTimerMinutes()">10 min</span> • <span style="cursor:pointer;text-decoration:underline" onclick="document.getElementById('timerInput').value=30;setTimerMinutes()">30 min</span> • <span style="cursor:pointer;text-decoration:underline" onclick="document.getElementById('timerInput').value=45;setTimerMinutes()">45 min</span></div>
</div>

<button class="btn-orange" onclick="toggleFav(${i});closeModal()">${isFav?'Remove from Favorites':'Add to Favorites ⭐'}</button>
<button class="btn-light" onclick="addShopItem('${r.name} ingredients');closeModal()">Add to Shopping List</button>`;
document.getElementById('modal').style.display='block';
}
function closeModal(){stopTimerOnly();document.getElementById('modal').style.display='none';}
function toggleFav(i){
favorites=favorites.includes(i)?favorites.filter(x=>x!==i):[...favorites,i];
localStorage.setItem('hc_fav',JSON.stringify(favorites));renderRecipes();renderFavs();updateCounts();
}
function addShop(){const inp=document.getElementById('shopInput');if(!inp.value.trim())return;addShopItem(inp.value.trim());inp.value='';}
function addShopItem(v){shopping.push(v);localStorage.setItem('hc_shop',JSON.stringify(shopping));renderShop();updateCounts();}
function renderShop(){document.getElementById('shopList').innerHTML=shopping.map((item,idx)=>`<li>${item} <span style="cursor:pointer" onclick="removeShop(${idx})">✕</span></li>`).join('')||'<li>No items yet</li>';}
function removeShop(idx){shopping.splice(idx,1);localStorage.setItem('hc_shop',JSON.stringify(shopping));renderShop();updateCounts();}
function clearShop(){shopping=[];localStorage.setItem('hc_shop','[]');renderShop();updateCounts();}
function setFilter(f,btn){document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));btn.classList.add('active');currentFilter=f;renderRecipes();}
function convert(){
const val=parseFloat(document.getElementById('convAmount').value||0);
const from=document.getElementById('convFrom').value;const to=document.getElementById('convTo').value;
const toMl={cup:240,tbsp:15,tsp:5,g:1,ml:1};
const result=(val*toMl[from]/toMl[to]).toFixed(2);
document.getElementById('convResult').innerText=`${val} ${from} = ${result} ${to}`;
}
function saveConverterFav(){
const text=document.getElementById('convResult').innerText;
if(convFavs.includes(text)){alert('Already in favorites!');return;}
convFavs.push(text);
localStorage.setItem('hc_conv_fav',JSON.stringify(convFavs));
renderConvFavs();renderFavs();updateCounts();
alert('Saved to Favorites! ⭐ '+text);
}
function removeConvFav(idx){convFavs.splice(idx,1);localStorage.setItem('hc_conv_fav',JSON.stringify(convFavs));renderConvFavs();renderFavs();updateCounts();}
function setTheme(mode){
if(mode==='dark'){document.body.classList.add('dark');localStorage.setItem('hc_theme','dark');}
else{document.body.classList.remove('dark');localStorage.setItem('hc_theme','light');}
updateThemeUI();
}
function toggleTheme(){
if(document.body.classList.contains('dark')) setTheme('light');
else setTheme('dark');
}
function updateThemeUI(){
const isDark=document.body.classList.contains('dark');
document.getElementById('themeSwitch').classList.toggle('on',isDark);
document.getElementById('themeLabel').innerText=isDark?'Currently: Dark Mode':'Currently: Light Mode';
document.getElementById('themeBtnText').innerText=isDark?'Light Mode':'Dark Mode';
}
function clearAllData(){
if(!confirm('Delete all favorites and shopping list?'))return;
favorites=[];convFavs=[];shopping=[];
localStorage.removeItem('hc_fav');localStorage.removeItem('hc_conv_fav');localStorage.removeItem('hc_shop');
renderRecipes();renderFavs();renderShop();renderConvFavs();updateCounts();
alert('All data cleared!');
}
document.getElementById('searchInput').addEventListener('input',renderRecipes);
function updateCounts(){
document.getElementById('statRecipes').innerText=recipes.length;
document.getElementById('statFav').innerText=favorites.length+convFavs.length;
document.getElementById('statShop').innerText=shopping.length;
document.getElementById('shopSub').innerText=`${shopping.length} items saved in pantry`;
}
if(localStorage.getItem('hc_theme')==='dark'){document.body.classList.add('dark');}
updateThemeUI();
renderRecipes();renderFavs();renderShop();renderConvFavs();updateCounts();
