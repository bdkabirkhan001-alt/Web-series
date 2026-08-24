const demoSeries=[
 {id:"sample-series",title:"Sample Hindi Series",genre:"Drama",year:"2026",image:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",description:"Replace this demo entry with your own legally published or licensed series information.",seasons:[{name:"Season 1",episodes:[{name:"Episode 1",description:"Episode guide placeholder."},{name:"Episode 2",description:"Episode guide placeholder."}]}]},
 {id:"sample-thriller",title:"Sample Thriller",genre:"Thriller",year:"2026",image:"https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80",description:"Demo catalog item.",seasons:[{name:"Season 1",episodes:[{name:"Episode 1",description:"Episode guide placeholder."}]}]}
];

function getData(){return demoSeries}
function card(s){return `<a class="card" href="series.html?id=${encodeURIComponent(s.id)}"><img class="poster" src="${s.image}" alt="${s.title}"><div class="card-body"><h3>${s.title}</h3><div class="muted">${s.genre} · ${s.year}</div></div></a>`}
function renderHome(){
 const grid=document.getElementById("seriesGrid"); if(!grid)return;
 const data=getData(); grid.innerHTML=data.map(card).join("");
 document.getElementById("trendingGrid").innerHTML=data.slice(0,4).map(card).join("");
 const genres=[...new Set(data.map(x=>x.genre))];
 document.getElementById("genresList").innerHTML=genres.map(g=>`<span class="chip">${g}</span>`).join("");
 const search=document.getElementById("search");
 search.addEventListener("input",()=>{const q=search.value.toLowerCase();grid.innerHTML=data.filter(s=>(s.title+s.genre).toLowerCase().includes(q)).map(card).join("")});
}
function renderDetail(){
 const el=document.getElementById("detail"); if(!el)return;
 const id=new URLSearchParams(location.search).get("id"); const s=getData().find(x=>x.id===id)||getData()[0];
 document.title=s.title+" — SeriesHub";
 el.innerHTML=`<div class="detail-hero"><img src="${s.image}" alt="${s.title}"><div><span class="eyebrow">${s.genre}</span><h1>${s.title}</h1><p class="muted">${s.year}</p><p>${s.description}</p></div></div><div class="episodes"><h2>Episodes</h2>${s.seasons.map(se=>`<h3>${se.name}</h3>`+se.episodes.map((e,i)=>`<div class="episode"><strong>${e.name}</strong><div class="muted">${e.description}</div></div>`).join("")).join("")}</div>`;
}
document.addEventListener("DOMContentLoaded",()=>{
 const gate=document.getElementById("ageGate");
 if(localStorage.getItem("adultConfirmed")==="1") gate?.remove();
 document.getElementById("enterBtn")?.addEventListener("click",()=>{localStorage.setItem("adultConfirmed","1");gate.remove()});
 renderHome();renderDetail();
});