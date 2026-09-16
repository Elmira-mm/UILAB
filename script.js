document.querySelectorAll('.tab-bar').forEach(bar=>{
    const buttons = bar.querySelectorAll('.tab-btn');
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        buttons.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
        btn.classList.add('active');
        btn.setAttribute('aria-selected','true');
        const panels = bar.parentElement.querySelectorAll('.tab-panel');
        panels.forEach(p=>p.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.add('active');
      });
    });
  });

  const demoBtn = document.getElementById('demo-btn');
  const btnOut = document.getElementById('btn-out');
  demoBtn.addEventListener('click', ()=>{
    btnOut.textContent = 'Збережено ✓';
    setTimeout(()=>{btnOut.textContent='';}, 1800);
  });

  const rows = [
    {name:'Landing page', status:'В роботі', deadline:'2026-09-20', priority:'Високий'},
    {name:'Мобільний застосунок', status:'Заплановано', deadline:'2026-10-05', priority:'Середній'},
    {name:'API інтеграція', status:'Завершено', deadline:'2026-08-30', priority:'Низький'},
    {name:'Аналітика', status:'В роботі', deadline:'2026-09-25', priority:'Високий'},
    {name:'Редизайн профілю', status:'Заплановано', deadline:'2026-11-01', priority:'Середній'}
  ];
  const tbody = document.querySelector('#grid-table tbody');
  function renderRows(data){
    tbody.innerHTML = '';
    data.forEach(r=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r.name}</td><td>${r.status}</td><td>${r.deadline}</td><td>${r.priority}</td>`;
      tbody.appendChild(tr);
    });
  }
  renderRows(rows);

  let sortDir = {};
  document.querySelectorAll('#grid-table th[data-key]').forEach(th=>{
    th.addEventListener('click', ()=>{
      const key = th.dataset.key;
      sortDir[key] = !sortDir[key];
      const sorted = [...rows].sort((a,b)=>{
        if(a[key] < b[key]) return sortDir[key] ? -1 : 1;
        if(a[key] > b[key]) return sortDir[key] ? 1 : -1;
        return 0;
      });
      renderRows(sorted);
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('section.spec')];
  const byId = id => document.querySelector(`.nav-link[href="#${id}"]`);
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove('current'));
        const link = byId(entry.target.id);
        if(link) link.classList.add('current');
      }
    });
  }, {rootMargin:'-20% 0px -70% 0px'});
  sections.forEach(s=>observer.observe(s));