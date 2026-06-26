const API_URL="https://script.google.com/macros/s/AKfycbyuTXsYUcXtrBlerCXoQDIgDdX4NTniMRn1rHgiPZG_GiSbH6urWRsdTYUIwfTBgSW2/exec";

let db={};

fetch(API_URL)

.then(r=>r.json())

.then(data=>{

db=data;

console.log(data);

console.log("ISCA Database Loaded");

})

.catch(error=>{

console.log(error);

});

function openSection(section){
  const w = document.getElementById("workspace");
  let html = "";

  if(section==="announcements"){

let html="<h1>📢 ANNOUNCEMENTS</h1><br>";

if(!db.announcements || db.announcements.length===0){

html+="No announcements yet.";

}

else{

db.announcements.forEach(item=>{

html+=`<b>${item.TITLE || ""}</b><br>${item.MESSAGE}<br><br>`;

});

}

w.innerHTML=html;

return;

}
if(section==="leaderboard"){

html="<h1>🏆 LEADERBOARD</h1><br>";

if(!db.students || db.students.length===0){

html+="No player data found.";

}else{

const topRuns = [...db.students]
.sort((a,b)=>b.RUNS-a.RUNS)
.slice(0,5);

const topWickets = [...db.students]
.sort((a,b)=>b.WICKETS-a.WICKETS)
.slice(0,5);

const topPotm = [...db.students]
.sort((a,b)=>b.POTM-a.POTM)
.slice(0,5);

html += `<div class="student"><h2>🥇 TOP 5 RUN SCORERS</h2><br>`;

topRuns.forEach((p,i)=>{
html += `${i+1}. ${p.NAME} - ${p.RUNS} Runs<br>`;
});

html += `</div>`;

html += `<div class="student"><h2>🎯 TOP 5 WICKET TAKERS</h2><br>`;

topWickets.forEach((p,i)=>{
html += `${i+1}. ${p.NAME} - ${p.WICKETS} Wickets<br>`;
});

html += `</div>`;

html += `<div class="student"><h2>🏅 TOP 5 POTM WINNERS</h2><br>`;
 
topPotm.forEach((p,i)=>{
html += `${i+1}. ${p.NAME} - ${p.POTM} POTM Awards<br>`;
});

html += `</div>`;

}

}
 
  if(section==="players"){

html="<h1>👥 PLAYER UNIVERSE</h1>";

if(!db.students || db.students.length===0){

html+="No players found.";

}else{

db.students.forEach(player=>{

html+=`
<div class="student" onclick="showPlayer('${player.NAME}')">
${player.NAME}
</div>
`;

});

}

}

 if(section==="tournaments"){

html="<h1>🏆 TOURNAMENT HUB</h1><br>";

if(!db.tournaments || db.tournaments.length===0){

html+="No tournaments available.";

}else{

db.tournaments.forEach(tournament=>{

html+=`

<div class="student">

🏆 <b>${tournament.TOURNAMENT}</b>

<br><br>

📅 Date : ${new Date(tournament.DATE).toLocaleString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})}


<br><br>

📌 Status : ${tournament.STATUS}

</div>

`;

});

}

}
  if(section==="coach"){
    html=`

<h1>👨‍🏫 COACH HQ</h1>

<br><br>

<b>ISHAAN SINGHA</b>

<br>

Former Player Of YSCE Academy Rajarhat Kolkata

<br>

Left Arm Off Spinner

<br>

Right Hand Batter

<br><br>

<b>SHREYAN TEWARY</b>

<br>

Former Player Of YSCE Academy Rajarhat Kolkata

<br>

Right Arm Leg Spinner

<br>

Right Hand Batter

`;
  }

  if(section==="feedback"){
    html=`
<h1>⭐ FEEDBACK</h1>

1 ⭐ Very Bad

<br><br>

2 ⭐ Poor

<br><br>

3 ⭐ Fair

<br><br>

4 ⭐ Good

<br><br>

5 ⭐ Amazing

`;
  }

w.innerHTML=html;
w.style.display="block";
return;
}

function showPlayer(name){

const w=document.getElementById("workspace");

if(!db.students){

w.innerHTML="Database loading...";

return;

}

const player=db.students.find(
s => String(s.NAME).trim().toUpperCase() === name.trim().toUpperCase()
);

if(!player){

w.innerHTML="❌ Player not found";

return;

}

w.innerHTML=`

<h1>${player.NAME}</h1>

<br>

🏏 ${player.BATTING}

<br><br>

⚡ ${player.BOWLING}

<br><br>

📊 Matches : ${player.MATCHES}

<br><br>

🏏 Runs : ${player.RUNS}

<br><br>

🎯 Wickets : ${player.WICKETS}

<br><br>

⭐ Level : ${player.LEVEL}

<br><br>

🏆 Coach Ranking : ${player.RANKING}

<br><br>

📝 Coach Remarks : ${player["COACH REMARKS"]}

`;
}
