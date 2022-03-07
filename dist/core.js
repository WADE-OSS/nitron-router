/*
 * Nitron.js v1.0.0 - core
 *
 * (c) 2022 WADE Open Source Software and Nitron Team. and its affiliates.
 * Released under the MIT License.
 * https://github.com/WADE-OSS/nitron-router/blob/main/LICENSE
 */

window.addEventListener('load',() => {
  const routes = {};
  const routerRenderClassNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  var routerRenderClassName = "";
  for (let i = 0; i < 8; i++) {
    const rnum = Math.floor(Math.random() * routerRenderClassNameChars.length)
    routerRenderClassName += routerRenderClassNameChars.substring(rnum, rnum + 1)
  };

  customElements.define('dom-router', class extends HTMLElement {
    connectedCallback() {
      if(this.getAttribute('path')){
        routes[this.getAttribute('path')] = `${this.getAttribute('el')}`;
      };

      if(document.querySelector(`.${routerRenderClassName}`)){
        this.outerHTML = "";
      }else{
        this.outerHTML = `<div class="${routerRenderClassName}"></div>`;
      };
    };
});

const routerLinkClassNameChars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
var routerLinkClassName = "";
for (let i = 0; i < 8; i++) {
  const rnum = Math.floor(Math.random() * routerLinkClassNameChars.length)
  routerLinkClassName += routerLinkClassNameChars.substring(rnum, rnum + 1)
};
length
customElements.define('dom-link', class extends HTMLElement {
  connectedCallback() {
    let props = {};
    Object.assign(props,{class:routerLinkClassName});
    if(this.getAttributeNames()) {  
      const AttrNames = this.getAttributeNames();
      AttrNames.forEach(attr => { 
        if(attr == "to"){
          Object.assign(props,{href:this.getAttribute(attr)});
        }else{
          if(props[attr]){
            props[attr] += ` ${this.getAttribute(attr)}`;
          }else{
            props[attr] = `${this.getAttribute(attr)}`;
          };
        }
      }); 
    };
    this.outerHTML = nitron.createElement('a',props,this.innerHTML);
  };
});

const render = path => {
  document.querySelector(`.${routerRenderClassName}`).innerHTML = routes[path] || routes["/404"];
  document.querySelectorAll(`.${routerLinkClassName}[href^="/"]`).forEach(el => 
    el.addEventListener("click", evt => {
      evt.preventDefault();
      const {pathname: path} = new URL(evt.target.href);
      window.history.pushState({path}, path, path);
      render(path);
    })
  );
};

render(window.location.pathname);
window.addEventListener("popstate", e =>
  render(new URL(window.location.href).pathname)
);

});
