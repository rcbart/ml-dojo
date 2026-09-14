/* ============================== BOOT ============================== */
renderHome();refreshBelt();

// --- Mobile nav toggle, ported from the shared engine. Off-canvas below
// 760px; the scrim and choosing a lesson both close it. ---
(function(){
  var t=document.getElementById('navToggle'), sc=document.getElementById('navScrim'),
      nv=document.getElementById('nav'), b=document.body;
  if(!t||!nv) return;
  function set(open){ b.classList.toggle('navOpen', open); t.setAttribute('aria-expanded', String(open)); }
  t.addEventListener('click', function(){ set(!b.classList.contains('navOpen')); });
  if(sc) sc.addEventListener('click', function(){ set(false); });
  nv.addEventListener('click', function(e){
    var el=e.target && e.target.closest ? e.target.closest('.lessonLink') : null;
    if(el && window.matchMedia('(max-width:760px)').matches) set(false);
  });
})();
