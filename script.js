(function(){
  // seletor de tarefa
  var R=[
    ["UMotion Pro","Edita ossos com FK e IK dentro do Unity e exporta um FBX Humanoid que substitui o arquivo da pasta Mixamo."],
    ["Cascadeur ou Blender","O Cascadeur adiciona física automática ao golpe. O Blender dá controle total. Os dois exportam FBX."],
    ["Janela Animation do Unity","É rápida, grava direto em .anim e não precisa de esqueleto."],
    ["Prefab Cavaleiro_Visual","Não é animação. A arma fica num handslot com posição fixa; mude ali ou no ConstrutorDeVisuais.cs."],
    ["Animation Rigging","Corrige durante o jogo, por cima de qualquer clipe, sem editar a animação."],
    ["Timeline do Unity","Junta animações, áudio e câmeras numa linha do tempo."],
    ["Mixamo","É grátis e tem milhares de animações prontas para Humanoid."]
  ];
  var btns=document.querySelectorAll('.picker-btns button');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed','false')});
    b.setAttribute('aria-pressed','true');
    var r=R[+b.dataset.i];
    document.getElementById('ans-tool').textContent=r[0];
    document.getElementById('ans-why').textContent=r[1];
  })});

  // filtro de problemas
  var busca=document.getElementById('busca'), linhas=[].slice.call(document.querySelectorAll('#lista tr')), cont=document.getElementById('contagem');
  function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
  function filtrar(){
    var q=norm(busca.value.trim()), n=0;
    linhas.forEach(function(tr){var ok=!q||norm(tr.textContent).indexOf(q)>-1; tr.hidden=!ok; if(ok)n++;});
    cont.textContent=n+' de '+linhas.length;
  }
  busca.addEventListener('input',filtrar); filtrar();

  // checklist lembrado neste navegador
  var KEY='oficina-checklist', boxes=[].slice.call(document.querySelectorAll('#check input'));
  var salvo={}; try{salvo=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}
  boxes.forEach(function(c){c.checked=!!salvo[c.id]; c.addEventListener('change',guardar)});
  function guardar(){var o={}; boxes.forEach(function(c){o[c.id]=c.checked}); try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
  document.getElementById('limpar').addEventListener('click',function(){boxes.forEach(function(c){c.checked=false}); guardar();});

  // índice: destaca a seção visível
  var links=[].slice.call(document.querySelectorAll('nav.toc a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
    document.querySelectorAll('main section').forEach(function(s){io.observe(s)});
  }
})();
