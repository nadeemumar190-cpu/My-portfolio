window.addEventListener("load", () => {
    
    // Check karo agar '.big-text' page par hai (Sirf Index Page ke liye)
    if (document.querySelector('.big-text')) {
        const tl = gsap.timeline({ 
            defaults: { ease: "power4.out", duration: 1.8 } 
        });

        tl.from(".big-text", { 
            x: -800, 
            opacity: 0,
            duration: 2 
        });
    }

    // Check karo agar '.hire-container' page par hai (Sirf Hire Page ke liye)
    if (document.querySelector('.hire-container')) {
        const tl = gsap.timeline({ 
            defaults: { ease: "power4.out", duration: 1.5 } 
        });

        tl.from(".hire-title", {
            y: -100,
            opacity: 0
        })
        .from(".info-item", {
            y: 50,
            opacity: 0,
            stagger: 0.2
        }, "-=1");
    }
});













window.addEventListener("load", function() {

  // INDEX PAGE
  if (document.querySelector('.hero-wrapper')) {
    gsap.fromTo(".big-text",
      { x: -800, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, ease: "power4.out" }
    );
  }

  // HIRE PAGE
  if (document.querySelector('.hire-container')) {
    var tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });
    tl.fromTo(".hire-title", { y: -100, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(".info-item", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2 }, "-=1");
  }

  // WORK PAGE
  if (!document.getElementById('wTrack')) return;

  var projects = [
    { id:1,  category:"DEVELOPMENT", title:"NEON CORE SYSTEM"   },
    { id:2,  category:"THESIS",      title:"ETHICAL FRONTIERS"  },
    { id:3,  category:"VIDEO",       title:"CHRONOS MOTION"     },
    { id:4,  category:"WEB",         title:"AETHER INTERFACE"   },
    { id:5,  category:"WRITING",     title:"SILENT NARRATIVES"  },
    { id:6,  category:"DESIGN",      title:"MINIMALIST CHAOS"   },
    { id:7,  category:"CODING",      title:"QUANTUM ALGORITHM"  },
    { id:8,  category:"THESIS",      title:"URBAN SOCIOLOGY"    },
    { id:9,  category:"VIDEO",       title:"VINTAGE REWIND"     },
    { id:10, category:"WEB",         title:"LIQUID LAYOUTS"     },
    { id:11, category:"WRITING",     title:"ACADEMIC RIGOR"     },
    { id:12, category:"DESIGN",      title:"BOLD TYPOGRAPHY"    },
    { id:13, category:"DEVELOPMENT", title:"COBALT BACKEND"     },
    { id:14, category:"THESIS",      title:"CLIMATE IMPACT"     },
    { id:15, category:"VIDEO",       title:"GLITCH AESTHETIC"   },
    { id:16, category:"WEB",         title:"ZEN EXPERIENCE"     },
    { id:17, category:"WRITING",     title:"LOGIC & REASON"     },
    { id:18, category:"DESIGN",      title:"GEOMETRIC SOUL"     },
    { id:19, category:"CODING",      title:"VOID FUNCTIONS"     },
    { id:20, category:"THESIS",      title:"CULTURAL ROOTS"     },
    { id:21, category:"VIDEO",       title:"STREET PULSE"       },
    { id:22, category:"WEB",         title:"HYPER SPACE"        },
    { id:23, category:"WRITING",     title:"DEEP RESEARCH"      },
    { id:24, category:"DESIGN",      title:"MONOCHROME ART"     }
  ];

  var track    = document.getElementById('wTrack');
  var navCount = document.getElementById('wNavCount');
  var activeIdx = -1;

  function setImg(el, folder, num) {
    el.src = '../presentation/' + folder + '/' + num + '.jpg';
    el.onerror = function() {
      el.onerror = function() {
        el.style.display = 'none';
        if (el.parentElement) el.parentElement.style.background = '#1a1a1a';
      };
      el.src = '../presentation/' + folder + '/' + num + '.png';
    };
  }

  // Count all slides in a folder (up to 30)
  function loadAllSlides(folderId, callback) {
    var slides = [];
    var total = 30;
    var done = 0;
    for (var n = 1; n <= total; n++) {
      (function(num) {
        var found = false;
        var exts = ['jpg', 'png'];
        var ei = 0;
        function tryNext() {
          if (ei >= exts.length) { finish(); return; }
          var img = new Image();
          img.onload = function() {
            if (!found) { found = true; slides.push(num); }
            finish();
          };
          img.onerror = function() { ei++; tryNext(); };
          img.src = '../presentation/' + folderId + '/' + num + '.' + exts[ei++];
        }
        function finish() { done++; if (done >= total) callback(slides.slice().sort(function(a,b){return a-b;})); }
        tryNext();
      })(n);
    }
  }

  // Build strips
  projects.forEach(function(p, i) {
    var strip = document.createElement('div');
    strip.className = 'w-strip';

    var img = document.createElement('img');
    img.alt = p.title;
    setImg(img, p.id, 1);

    var numDiv = document.createElement('div');
    numDiv.className = 'w-strip-num';
    numDiv.textContent = String(p.id).padStart(2,'0');

    strip.appendChild(img);
    strip.appendChild(numDiv);

    strip.addEventListener('click', (function(idx, proj, el) {
      return function() { handleClick(idx, proj, el); };
    })(i, p, strip));

    track.appendChild(strip);
  });

  function handleClick(index, project, stripEl) {
    var all = document.querySelectorAll('.w-strip');
    // second click = explore
    if (activeIdx === index) { openExplore(project); return; }
    all.forEach(function(s) { s.classList.remove('active'); });
    stripEl.classList.add('active');
    track.classList.add('has-active');
    activeIdx = index;
    navCount.textContent = String(index+1).padStart(2,'0') + ' / 24';
    // center
    var cw = document.querySelector('.w-container').offsetWidth;
    var offset = stripEl.offsetLeft - (cw/2) + 80;
    track.style.transform = 'translateX(-' + Math.max(0,offset) + 'px)';
  }

  // EXPLORE
  var explore    = document.getElementById('wExplore');
  var expTitle   = document.getElementById('wExploreTitle');
  var expCat     = document.getElementById('wExploreCat');
  var expCat2    = document.getElementById('wExpCat2');
  var expNum     = document.getElementById('wExploreNum');
  var expSlides  = document.getElementById('wExpSlides');
  var slideImg   = document.getElementById('wSlideImg');
  var thumbWrap  = document.getElementById('wThumbs');
  var counter    = document.getElementById('wSlideCounter');
  var curSlides  = [];
  var curSlide   = 0;
  var curFolder  = 1;

  function openExplore(project) {
    curFolder = project.id;
    expTitle.textContent = project.title;
    expCat.textContent   = project.category;
    expCat2.textContent  = project.category;
    expNum.textContent   = String(project.id).padStart(2,'0');
    explore.classList.add('open');

    loadAllSlides(project.id, function(slides) {
      curSlides = slides;
      curSlide  = 0;
      expSlides.textContent = slides.length;
      showSlide(0);
      buildThumbs(project.id, slides);
    });
  }

  function showSlide(idx) {
    if (!curSlides.length) return;
    curSlide = idx;
    slideImg.classList.add('fade');
    setTimeout(function() {
      var num = curSlides[idx];
      slideImg.onerror = function() {
        slideImg.onerror = null;
        slideImg.src = '../presentation/' + curFolder + '/' + num + '.png';
      };
      slideImg.src = '../presentation/' + curFolder + '/' + num + '.jpg';
      slideImg.onload = function() { slideImg.classList.remove('fade'); };
      counter.textContent = (idx+1) + ' / ' + curSlides.length;
      thumbWrap.querySelectorAll('img').forEach(function(t,i) {
        t.classList.toggle('active-thumb', i === idx);
      });
      // scroll active thumb into view
      var activeThumb = thumbWrap.querySelectorAll('img')[idx];
      if (activeThumb) activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 180);
  }

  function buildThumbs(folderId, slides) {
    thumbWrap.innerHTML = '';
    slides.forEach(function(num, i) {
      var t = document.createElement('img');
      t.alt = 'slide ' + num;
      setImg(t, folderId, num);
      t.addEventListener('click', (function(idx){ return function(){ showSlide(idx); }; })(i));
      if (i === 0) t.classList.add('active-thumb');
      thumbWrap.appendChild(t);
    });
  }

  document.getElementById('wPrev').addEventListener('click', function() {
    if (!curSlides.length) return;
    showSlide((curSlide - 1 + curSlides.length) % curSlides.length);
  });
  document.getElementById('wNext').addEventListener('click', function() {
    if (!curSlides.length) return;
    showSlide((curSlide + 1) % curSlides.length);
  });
  document.getElementById('wClose').addEventListener('click', function() {
    explore.classList.remove('open');
  });

  // DRAG
  var cont = document.querySelector('.w-container');
  var drag = false, sx = 0, stx = 0;
  cont.addEventListener('mousedown', function(e) {
    drag = true; sx = e.clientX;
    stx = new DOMMatrix(getComputedStyle(track).transform).m41;
    cont.classList.add('dragging'); track.style.transition = 'none';
  });
  document.addEventListener('mousemove', function(e) {
    if (!drag) return;
    var tx = stx + (e.clientX - sx);
    var mn = -(track.scrollWidth - cont.offsetWidth + 100);
    track.style.transform = 'translateX(' + Math.max(mn,Math.min(0,tx)) + 'px)';
  });
  document.addEventListener('mouseup', function() {
    if (!drag) return; drag = false;
    cont.classList.remove('dragging');
    track.style.transition = 'transform .7s cubic-bezier(.19,1,.22,1)';
  });

  // WHEEL
  cont.addEventListener('wheel', function(e) {
    e.preventDefault();
    var tx = new DOMMatrix(getComputedStyle(track).transform).m41 - e.deltaY * 1.5;
    var mn = -(track.scrollWidth - cont.offsetWidth + 100);
    track.style.transform = 'translateX(' + Math.max(mn,Math.min(0,tx)) + 'px)';
  }, { passive: false });

  // KEYBOARD
  document.addEventListener('keydown', function(e) {
    if (explore.classList.contains('open')) {
      if (e.key === 'Escape') explore.classList.remove('open');
      if (e.key === 'ArrowRight') document.getElementById('wNext').click();
      if (e.key === 'ArrowLeft')  document.getElementById('wPrev').click();
      return;
    }
    var all = document.querySelectorAll('.w-strip');
    if (e.key === 'ArrowRight') { var nx = Math.min(activeIdx+1,23); handleClick(nx,projects[nx],all[nx]); }
    if (e.key === 'ArrowLeft' && activeIdx > 0) { var pv = activeIdx-1; handleClick(pv,projects[pv],all[pv]); }
    if (e.key === 'Enter' && activeIdx >= 0) openExplore(projects[activeIdx]);
  });

});