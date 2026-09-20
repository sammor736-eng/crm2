const form=document.getElementById('estimate-request');
const nyParts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).filter(x=>x.type!=='literal').map(x=>[x.type,Number(x.value)]));
const start=new Date(Date.UTC(nyParts.year,nyParts.month-1,nyParts.day));
const dates=[];
for(let i=1;dates.length<10&&i<=20;i++){
  const d=new Date(start.getTime()+i*86400000);
  if(d.getUTCDay()===0||d.getUTCDay()===6)continue;
  const value=d.toISOString().slice(0,10);
  const label=new Intl.DateTimeFormat('en-US',{timeZone:'UTC',weekday:'long',month:'long',day:'numeric'}).format(d);
  dates.push({value,label});
}
for(const select of document.querySelectorAll('[data-weekdays]'))for(const d of dates)select.add(new Option(d.label,d.value));
form?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(form), error=document.getElementById('request-error');
  if(data.get('date1')===data.get('date2')){error.textContent='Please select two different weekdays.';error.hidden=false;return;}
  error.hidden=true;
  const label=value=>dates.find(d=>d.value===value)?.label||value;
  const message=['Hi Prime Mold Removal, I would like to request a free estimate.','Name: '+data.get('name'),'Phone: '+data.get('phone'),'Property: '+data.get('location'),'Service: '+data.get('service'),'First option: '+label(data.get('date1'))+', '+data.get('window1'),'Second option: '+label(data.get('date2'))+', '+data.get('window2'),'Details: '+(data.get('details')||'Not provided'),'I understand the appointment is not booked until Prime confirms it.'].join('\n');
  window.location.href='https://wa.me/19297324244?text='+encodeURIComponent(message);
});
