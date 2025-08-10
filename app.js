/* theme: persistent manual toggle + time-based fallback */
(function(){
  const saved = localStorage.getItem('theme'); // 'dark' or 'light'
  const root = document.documentElement;
  function applyTheme(name){
    if(name === 'dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem('theme', name);
  }

  if(saved){
    applyTheme(saved);
  } else {
    const h = new Date().getHours();
    applyTheme((h >= 19 || h < 6) ? 'dark' : 'light');
  }

  // attach toggle buttons (header on each page uses slightly different ids)
  ['themeToggle','themeToggleMenu','themeToggleAbout','themeToggleGallery','themeToggleContact'].forEach(id=>{
    const btn = document.getElementById(id);
    if(!btn) return;
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
})();

/* order form handling (client-side): collects and saves to localStorage */
function submitOrder(e){
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const pickup = document.getElementById('pickupDate')?.value;
  const details = document.getElementById('details')?.value.trim();
  if(!name || !phone || !pickup || !details){
    alert('Please fill all required fields.');
    return;
  }
  const orders = JSON.parse(localStorage.getItem('bc_orders') || '[]');
  orders.push({name,phone,pickup,details,created:new Date().toISOString()});
  localStorage.setItem('bc_orders', JSON.stringify(orders));
  alert('Order submitted! We will contact you to confirm.');
  document.getElementById('orderForm')?.reset();
}

/* small enhancement: highlight current nav link */
document.addEventListener('DOMContentLoaded', ()=>{
  const links = document.querySelectorAll('.main-nav .nav-link');
  links.forEach(a=>{
    try{
      const href = a.getAttribute('href');
      if(location.pathname.endsWith(href) || (href === 'index.html' && location.pathname.endsWith('index.html'))) {
        a.classList.add('active');
      }
    }catch(e){}
  });
});
