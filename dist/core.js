customElements.define('dom-link', class extends HTMLElement {
  connectedCallback() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    let className = "";
    let props = {};  
    if(this.getAttribute('to')){
      for (let i = 0; i < 8; i++) {
        const rnum = Math.floor(Math.random() * chars.length)
        className += chars.substring(rnum, rnum + 1)
      };
      Object.assign(props,{class:className});
    };
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
    document.querySelectorAll(`.${className}[href^="/"]`).forEach(el => 
      el.addEventListener("click", evt => {
        evt.preventDefault();
        const {pathname: path} = new URL(evt.target.href);
        window.history.pushState({path}, path, path);
      })
    );
  };
});


var routes = {};

customElements.define('dom-router', class extends HTMLElement {
  connectedCallback() {
    
    if(routes[this.getAttribute('path')]){
      routes[this.getAttribute('path')] += ` ${this.getAttribute('el')}`;
    }else{
      routes[this.getAttribute('path')] = `${this.getAttribute('el')}`;
    };

    if(window.location.pathname == this.getAttribute('path')){
      this.outerHTML = this.getAttribute('el');
    }else{
      this.outerHTML = "";
    };

  };
});
