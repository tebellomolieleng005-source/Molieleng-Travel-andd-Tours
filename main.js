const menuToggle=document.getElementById('menuToggle');
const siteNav=document.getElementById('siteNav');
if(menuToggle&&siteNav){menuToggle.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-filter-group]').forEach(group=>{
 const buttons=group.querySelectorAll('[data-filter]');
 const items=document.querySelectorAll(group.dataset.filterGroup);
 buttons.forEach(button=>button.addEventListener('click',()=>{
  buttons.forEach(b=>b.classList.remove('active'));button.classList.add('active');
  const filter=button.dataset.filter;
  items.forEach(item=>{item.hidden=filter!=='all'&&!item.dataset.category.split(' ').includes(filter);});
 }));
});
const modal=document.getElementById('imageModal');
if(modal){
 const modalImg=modal.querySelector('img');const caption=modal.querySelector('[data-modal-caption]');
 document.querySelectorAll('[data-gallery-image]').forEach(item=>item.addEventListener('click',()=>{
  modalImg.src=item.dataset.full||item.querySelector('img').src;
  modalImg.alt=item.querySelector('img').alt;
  caption.textContent=item.dataset.caption||item.querySelector('figcaption').innerText;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');
 }));
 const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');};
 modal.querySelector('.close-modal').addEventListener('click',close);
 modal.addEventListener('click',e=>{if(e.target===modal)close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
}
document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{
 e.preventDefault();
 if(!form.checkValidity()){form.reportValidity();return;}
 const status=form.querySelector('.form-status');
 if(status){status.textContent='Thank you. Your details have been checked in this demo. Connect this form to an email or booking service before publishing.';status.classList.add('show');}
 form.reset();
}));
const routeButtons=document.querySelectorAll('[data-route]');
const routeResult=document.getElementById('routeResult');
if(routeButtons.length&&routeResult){
 const selected=new Set();
 routeButtons.forEach(button=>button.addEventListener('click',()=>{
  const place=button.dataset.route;
  if(selected.has(place)){selected.delete(place);button.classList.remove('selected');button.setAttribute('aria-pressed','false');}
  else{selected.add(place);button.classList.add('selected');button.setAttribute('aria-pressed','true');}
  routeResult.textContent=selected.size?`Your draft route: ${Array.from(selected).join(' → ')}. Send an enquiry to check travel times and availability.`:'Choose destinations to build a draft route.';
 }));
}
const dateInput=document.querySelector('input[type="date"]');
if(dateInput){const today=new Date();dateInput.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;}
