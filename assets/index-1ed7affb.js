var v=Object.defineProperty;var b=(d,s,e)=>s in d?v(d,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[s]=e;var c=(d,s,e)=>(b(d,typeof s!="symbol"?s+"":s,e),e);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();const p=(d,s="w-5 h-5 min-w-[1.25rem]")=>{let e="";switch(d){case"text-t":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="128" y1="56" x2="128" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="56 88 56 56 200 56 200 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="96" y1="200" x2="160" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"dots-three-vertical":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="12"/><circle cx="128" cy="60" r="12"/><circle cx="128" cy="196" r="12"/></svg>';break;case"cloud":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M80,128a80,80,0,1,1,80,80H72A56,56,0,1,1,85.92,97.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M80,128a80,80,0,1,1,80,80H72A56,56,0,1,1,85.92,97.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"check-circle":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"arrow-down-left":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="192" y1="64" x2="64" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="168 192 64 192 64 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"clock":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"caret-double-right":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="56 48 136 128 56 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="136 48 216 128 136 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"book-open":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,88a32,32,0,0,1,32-32h64a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H160a32,32,0,0,0-32,32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M24,192a8,8,0,0,0,8,8H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H32a8,8,0,0,0-8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"lock-key-open":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><rect x="40" y="88" width="176" height="128" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M88,88V56a40,40,0,0,1,40-40c19.35,0,36.29,13.74,40,32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="140" r="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="128" y1="160" x2="128" y2="184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break;case"caret-down":e='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>';break}return e.replace("<svg ",`<svg ${s?`class="${s}" `:""}`)};class w{constructor(s){c(this,"query",s=>document.querySelector(s));this.template=s}preprocess(s,e){if(!e)return s;let r=s.slice(),t;for(t in e)r=r.replace(new RegExp(`%${t}%`,"g"),e[t]);return r}render(){return setTimeout(this.init.bind(this)),this.preprocess(this.template.html,this.template.variables)}}const C=`<nav class="">
  <div class="flex px-3 py-2 gap-5 justify-between sm:py-3.5 sm:px-3">
    <section class="flex max-w-[50%] items-center">
      <button class="p-2" tabindex="-1">%caret-double-right%</button>

      <span
        class="flex items-center gap-0.5 pl-5 opacity-50 max-w-[calc(100%-2.5rem)] sm:max-w-[calc(100%-2.25rem)] sm:pl-10">
        %book-open% <span class="ml-1.5 truncate"><a href='#!' class="font-semibold">Main</a>
          <span class="mx-1.5">/</span> Getting
          Started
          <span class="mx-1.5">/</span>
          Front-end developer test
          project</span>
      </span>
    </section>

    <section class="flex items-center gap-2 max-w-[calc(50%-1.25rem)]">
      <button class="opacity-50 gap-2 p-2.5 hidden md:inline-flex" tabindex="-1">
        %lock-key-open% Editing
      </button>
      <hr class="h-5 hidden md:block" />
      <button class="text-blue-500 font-semibold gap-2 p-2.5 py-2" tabindex="-1">Publish Space %caret-down%</button>
    </section>
  </div>
</nav>`;class T extends w{init(){console.log("Nav component mounted!")}}const M=new T({html:C,variables:{"caret-double-right":p("caret-double-right","w-4 h-4 min-w-[1rem]"),"book-open":p("book-open"),"caret-down":p("caret-down"),"lock-key-open":p("lock-key-open")}}),O=`<main class="flex flex-col container mx-auto max-w-3xl p-4 lg:px-0">
  <header
    class="flex gap-1 p-1 px-1.5 items-center justify-between border border-solid border-black/10 shadow-sm rounded-md text-sm">
    <section class="flex items-center gap-2.5">
      <span class="inline-block text-sm py-1 px-2 text-green-900 bg-green-100 rounded-md font-semibold">P</span>
      <span class="opacity-20">|</span>
      <span class="inline-flex items-center gap-1 opacity-50">%clock% Omin</span>
      <span class="opacity-20">|</span>
      <span class="w-5 h-5 rounded-full bg-orange-500"></span>
      <span class="opacity-20">|</span>
      <span class="inline-flex items-center gap-1 opacity-50">%arrow-down-left% 0</span>
    </section>

    <section class="flex gap-1.5 items-center">
      <span class="inline-flex opacity-50">%check-circle%</span>
      <span class="inline-flex text-green-700">%cloud%</span>
      <button class="px-0.5 py-1" tabindex="-1">%dots-three-vertical%</button>
    </section>
  </header>

  <section>
    <h1 class="text-[2.5rem] pb-2 mt-7 mb-5 border-b border-0 border-solid border-black/10">
      Front-end
      developer test
      project
    </h1>

    <p class="opacity-80">
      Your goal is to make a page that looks exactly like this one, and has the ability to create H1 text simply by
      typing / then 1, then typing text, and hitting Enter
    </p>
  </section>

  <section class="relative mt-10" data-textareas-container></section>
</main>`,j=`<%tag%
  class="relative left-0 top-0 z-10 mb-2 ring-none outline-none whitespace-pre-wrap max-w-full break-words overflow-hidden"
  contenteditable="true" id="%id%" data-textarea placeholder="%placeholder%"></%tag%>`;class S extends w{constructor(){super(...arguments);c(this,"getTextareaTemplate",e=>this.preprocess(j,e))}init(){console.log("Main component mounted!")}}const y=new S({html:O,variables:{clock:p("clock","w-4 h-4 min-w-[1rem]"),"arrow-down-left":p("arrow-down-left"),"check-circle":p("check-circle"),cloud:p("cloud"),"dots-three-vertical":p("dots-three-vertical")}}),E=`<div class="menu-overlay show-menu fixed top-0 lef-0 z-[1000] overflow-hidden pointer-events-none">
  <div class="pointer-events-auto relative">
    <div class="fixed top-0 left-0" data-caret-observer>
      <span class="relative inline-block w-0 h-6"></span>
      <div class="w-80 h-96 absolute left-0 top-full bg-white z-100 max-w-[calc(100vw-2rem)] max-h-[40vh]" role="menu">
        <section
          class="w-full h-full relative top-0 py-3 border border-solid border-black/10 shadow-2xl rounded-lg bg-white overflow-auto">
          <h2 class="text-base px-3 font-semibold">Add blocks</h2>
          <p class="px-3 opacity-40 text-sm mb-3">Keep typing to filter, or escape to exit...</p>
          <p class="px-3 opacity-60 text-sm">
            Filtering keyword
            <span class='bg-blue-900 text-white rounded-sm px-1 py-0.5' data-feedback>
              /
            </span>
          </p>
          <ul class="list-none p-0 my-3"></ul>
        </section>
      </div>
    </div>
  </div>
</div>`,H=`<li>
  <button class="flex text-sm px-3 py-1 items-center justify-start gap-2 rounded-none w-full" data-tag="%tag%"
    data-placeholder="%placeholder%">
    <span class="py-0.5 inline-flex">%text-t%</span>
    <span class="flex flex-col items-start">
      <strong class="leading-5">%title%</strong>
      <small class="opacity-50 leading-4">%description%</small>
    </span>
  </button>
</li>`;class R extends w{constructor(e,r,t){super(e);c(this,"caretObserver");c(this,"menu");c(this,"list");c(this,"feedback");c(this,"caretRect",null);c(this,"blocks",[{title:"Text",tag:"p",description:"Plain text or paragraph.",placeholder:"Type '/' for block, ('@' to link docs or people doesn't work for now😌)"},{title:"Heading 1",tag:"h1",description:"Big section heading."},{title:"Heading 2",tag:"h2",description:"Medium section heading."},{title:"Heading 3",tag:"h3",description:"Small section heading."}]);c(this,"moveTextareaCaretToPosition",(e,r)=>{var h;const t=(h=e.childNodes[0])==null?void 0:h.textContent,n=document.createRange(),o=window.getSelection(),l=+((r?t==null?void 0:t.length:e.dataset.offset)||-1),i=l>-1&&l<=((t==null?void 0:t.length)||-1/0);i&&n.setStart(e.childNodes[0],l),n.collapse(i),o.removeAllRanges(),o.addRange(n),i||o==null||o.collapseToEnd(),e.focus()});c(this,"switchContextTextarea",(e,r)=>{var u,m,g;const t=e.currentTarget,n=window.getSelection(),o=n&&(n==null?void 0:n.getRangeAt(0)),l=o==null?void 0:o.getBoundingClientRect(),i=t.getBoundingClientRect(),{previousElementSibling:h,nextElementSibling:f}=t,a=((u=t.textContent)==null?void 0:u.length)||0;if(t.dataset.offset=String((o==null?void 0:o.startOffset)||a-1),r){const x=!a;if((e.key==="ArrowUp"||e.key==="ArrowLeft"||e.key==="Backspace")&&h){const k=(o==null?void 0:o.startOffset)===0;e.key==="Backspace"&&x&&k&&(e.preventDefault(),(m=t.parentNode)==null||m.removeChild(t)),(e.key==="ArrowUp"||k&&o.startOffset===o.endOffset||x)&&(e.preventDefault(),this.moveTextareaCaretToPosition(h,e.key==="Backspace"))}else(e.key==="ArrowDown"||e.key==="ArrowRight")&&f?((o==null?void 0:o.startOffset)===a||e.key==="ArrowDown")&&(e.preventDefault(),this.moveTextareaCaretToPosition(f)):e.key==="Enter"&&(e.preventDefault(),this.isShowingMenu&&this.removeSlash(t),this.appendTextarea(t,this.isShowingMenu?(g=this.list.querySelector("button"))==null?void 0:g.dataset:void 0),this.showMenu(!1))}return{selection:n,range:o,caretRect:l,textareaRect:i,textarea:t}});c(this,"setMenuPosition",e=>{const{range:r,caretRect:t,textarea:n}=this.switchContextTextarea(e),l=n.textContent.slice(Math.max(((r==null?void 0:r.startOffset)||0)-8,0),((r==null?void 0:r.startOffset)||0)+1),i=/\/\s?([^\s]+)?$/.test(l)&&e.key!=="Escape";if(t!=null&&t.y&&!this.caretRect&&(this.caretRect=t),this.caretRect&&i){const h=l.trim().replace(/.*\/(\s?([^\s]+)?)/,"$1"),f=this.caretRect.left||n.offsetParent.offsetLeft||0;this.list.innerHTML="",this.feedback.textContent=h||"...",this.blocks.filter(a=>l==="/"||new RegExp(`${h}`,"i").test(a.title)).forEach(a=>{this.list.insertAdjacentHTML("beforeend",this.preprocess(H,{...a,placeholder:a.placeholder||a.title,"text-t":this.icon("text-t","min-w-[1.75rem] opacity-40")}))}),this.list.childElementCount===0&&(this.list.innerHTML='<p class="p-3">No results.🥲</p>'),this.list.onclick=a=>{const u=a.target;u.tagName==="BUTTON"&&(this.removeSlash(n),this.appendTextarea(n,u.dataset),this.showMenu(!1))},this.list.onkeydown=a=>{var u;a.key==="Escape"&&(this.showMenu(!1),(u=this.query(`#${document.body.dataset.activetextarea}`))==null||u.focus()),this.isShowingMenu||(this.list.onkeydown=null)},this.caretObserver.style.top=`${this.caretRect.top||0}px`,this.caretObserver.style.left=`${f}px`,this.caretObserver.style.height=`${this.caretRect.height||0}px`,f+336>window.innerWidth?(this.menu.style.transformOrigin=`${window.innerWidth-f}px top`,this.menu.style.left=`${window.innerWidth-(f+336)}px`):(this.menu.style.left="0",this.menu.style.transformOrigin="left top"),this.menu.offsetHeight>window.innerHeight-this.caretObserver.offsetTop-32?(this.menu.style.bottom="100%",this.menu.style.top="unset",this.menu.style.transformOrigin=this.menu.style.transformOrigin.replace("top","bottom")):(this.menu.style.bottom="unset",this.menu.style.top="100%",this.menu.style.transformOrigin=this.menu.style.transformOrigin.replace("bottom","top"))}this.showMenu(i),i||(this.caretRect=null),document.body.dataset.activetextarea=n.id});c(this,"appendTextarea",(e,r)=>{const t=String(Math.random()).replace("0.","id"),n=this.mainComponent.getTextareaTemplate({id:t,tag:"div",placeholder:this.blocks[0].placeholder,...r}),o=this.query("[data-textareas-container]");e?e.insertAdjacentHTML("afterend",n):o.insertAdjacentHTML("beforeend",n);const l=this.query(`#${t}`);l.addEventListener("keydown",i=>{this.switchContextTextarea(i,!0)}),l.addEventListener("keyup",i=>{i.key==="Enter"?i.preventDefault():this.setMenuPosition(i)}),l.addEventListener("blur",()=>this.caretRect=null),l.focus()});this.template=e,this.mainComponent=r,this.icon=t}init(){console.log("Menu component mounted!"),this.caretObserver=this.query("[data-caret-observer]"),this.menu=this.caretObserver.querySelector("[role='menu']"),this.list=this.menu.querySelector("ul"),this.feedback=this.menu.querySelector("[data-feedback]"),this.appendTextarea(),document.body.addEventListener("click",e=>{this.menu.contains(e.target)||this.showMenu(!1)})}showMenu(e){this.caretObserver.dataset.showmenu=String(e)}get isShowingMenu(){return this.caretObserver.dataset.showmenu==="true"}removeSlash(e){e.textContent=e.textContent.replace("/"+this.feedback.textContent.replace("...",""),"")}}const B=new R({html:E},y,p);document.querySelector("#app").innerHTML=`
  ${M.render()}
  ${y.render()}
  ${B.render()}
`;
