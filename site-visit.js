(() => {
  if (window.__DESIGNLAB_VISIT_RECORDED__) return;
  window.__DESIGNLAB_VISIT_RECORDED__ = true;
  const apiUrl = window.API_URL || (typeof API_URL !== "undefined" ? API_URL : "");

  function ensureFloatingCounter() {
    let counter = document.querySelector(".dl-global-visitor-float");
    if (!counter) {
      counter = document.createElement("aside");
      counter.className = "visitor-float dl-global-visitor-float";
      counter.setAttribute("aria-label", "DesignLab site visit count");
      counter.innerHTML = `<span aria-hidden="true" class="visitor-float-dot"></span><span class="visitor-float-label">Visits</span><strong data-site-visits>—</strong>`;
      document.body.appendChild(counter);
    }
    const forced={display:"inline-flex",position:"fixed",left:"14px",right:"auto",bottom:"14px",top:"auto",zIndex:"2147483000",visibility:"visible",opacity:"0.96"};
    Object.entries(forced).forEach(([key,value])=>counter.style.setProperty(key.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),value,"important"));
    return counter;
  }
  function updateCounters(value){const number=Number(value||0);const formatted=Number.isFinite(number)?number.toLocaleString("en-PH"):"—";document.querySelectorAll("[data-site-visits]").forEach(el=>el.textContent=formatted);}
  async function request(action){const url=`${apiUrl}?action=${action}&page=${encodeURIComponent(location.pathname)}&t=${Date.now()}`;const response=await fetch(url,{cache:"no-store",credentials:"omit",redirect:"follow"});return response.json();}
  async function recordVisit(){
    ensureFloatingCounter();
    if(!apiUrl||apiUrl.includes("PASTE_YOUR"))return;
    try{const data=await request("recordVisit");if(data?.success){updateCounters(data.visits);return;}throw new Error(data?.message||"Record failed");}
    catch(error){
      try{const data=await request("getVisitCount");if(data?.success)updateCounters(data.visits);}
      catch(secondError){console.warn("DesignLab visitor counter unavailable:",secondError);}
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",recordVisit,{once:true});else recordVisit();
})();
