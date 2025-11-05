/*
  Simple magnifier implementation.
  - Targets images with class `magnifiable`.
  - Reads data attributes: data-zoom (default 2), data-lens-size (px, default 150)
  - Supports mousemove hover and touch tap-to-toggle.
  - Creates a circular lens element that shows a background image scaled.
*/
(function(){
  const DEFAULT_ZOOM = 2;
  const DEFAULT_LENS = 150;

  function readLensSize(img){
    return parseInt(img.dataset.lensSize || img.dataset.lens) || DEFAULT_LENS;
  }

  function readZoom(img){
    return parseFloat(img.dataset.zoom) || DEFAULT_ZOOM;
  }

  function createLens(img, zoom, lensSize){
    const lens = document.createElement('div');
    lens.className = 'magnifier-lens';
    lens.style.width = lens.style.height = lensSize + 'px';
    lens.style.backgroundImage = `url('${img.currentSrc || img.src}')`;
    lens.style.backgroundRepeat = 'no-repeat';
    lens.style.display = 'none';
    document.body.appendChild(lens);
    return lens;
  }

  function initImage(img){
    if(img._magnifier) return;
    img._magnifier = true;

    const zoom = readZoom(img);
    const lensSize = readLensSize(img);
    const lens = createLens(img, zoom, lensSize);

    function updateBackgroundSize(){
      const nw = img.naturalWidth || img.width;
      const nh = img.naturalHeight || img.height;
      lens.style.backgroundSize = (nw * zoom) + 'px ' + (nh * zoom) + 'px';
    }

    let raf = null;
    let pending = null;

    function setLensPos(clientX, clientY){
      const rect = img.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if(x < 0 || y < 0 || x > rect.width || y > rect.height){
        lens.style.display = 'none';
        return;
      }

      lens.style.display = '';
      const pageX = clientX + window.scrollX;
      const pageY = clientY + window.scrollY;
      lens.style.left = pageX + 'px';
      lens.style.top = pageY + 'px';

      const nw = img.naturalWidth || img.width;
      const nh = img.naturalHeight || img.height;
      const scaleX = (nw * zoom) / rect.width;
      const scaleY = (nh * zoom) / rect.height;
      const bgX = (x * scaleX) - lensSize/2;
      const bgY = (y * scaleY) - lensSize/2;
      lens.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }

    function scheduleSet(clientX, clientY){
      pending = {x: clientX, y: clientY};
      if(raf) return;
      raf = requestAnimationFrame(()=>{
        if(pending){
          setLensPos(pending.x, pending.y);
          pending = null;
        }
        raf = null;
      });
    }

    function onMouseMove(e){ scheduleSet(e.clientX, e.clientY); }
    function onMouseEnter(e){ updateBackgroundSize(); scheduleSet(e.clientX, e.clientY); }
    function onMouseLeave(){ lens.style.display = 'none'; }

    let touchZoomed = false;
    function onTouchStart(e){
      if(e.touches && e.touches.length > 1) return;
      touchZoomed = !touchZoomed;
      e.preventDefault();
      if(touchZoomed){
        img.dataset._transform = img.style.transform || '';
        img.style.transition = 'transform .18s ease-out';
        img.style.transformOrigin = 'center center';
        img.style.transform = `scale(${zoom})`;
        img.setAttribute('aria-pressed','true');
        img.style.cursor = 'zoom-out';
      } else {
        img.style.transform = img.dataset._transform || '';
        img.removeAttribute('aria-pressed');
        img.style.cursor = 'crosshair';
      }
    }

    function onFocus(){
      const rect = img.getBoundingClientRect();
      scheduleSet(rect.left + rect.width/2, rect.top + rect.height/2);
    }
    function onBlur(){ lens.style.display = 'none'; }
    function onKeyDown(e){
      const step = 12;
      const leftKey = e.key === 'ArrowLeft';
      const rightKey = e.key === 'ArrowRight';
      const upKey = e.key === 'ArrowUp';
      const downKey = e.key === 'ArrowDown';
      if(leftKey||rightKey||upKey||downKey){
        const rect = img.getBoundingClientRect();
        const lx = parseFloat(lens.style.left || (rect.left + rect.width/2 + window.scrollX));
        const ly = parseFloat(lens.style.top || (rect.top + rect.height/2 + window.scrollY));
        let nx = lx, ny = ly;
        if(leftKey) nx -= step;
        if(rightKey) nx += step;
        if(upKey) ny -= step;
        if(downKey) ny += step;
        scheduleSet(nx - window.scrollX, ny - window.scrollY);
        e.preventDefault();
      }
      if(e.key === 'Escape') { lens.style.display = 'none'; }
    }

    img.addEventListener('mousemove', onMouseMove);
    img.addEventListener('mouseenter', onMouseEnter);
    img.addEventListener('mouseleave', onMouseLeave);
    img.addEventListener('touchstart', onTouchStart, {passive:false});
    img.addEventListener('focus', onFocus);
    img.addEventListener('blur', onBlur);
    img.addEventListener('keydown', onKeyDown);

    window.addEventListener('resize', updateBackgroundSize);
  }

  function initAll(){
    const imgs = document.querySelectorAll('img.magnifiable');
    imgs.forEach(initImage);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initAll);
  } else initAll();

})();
