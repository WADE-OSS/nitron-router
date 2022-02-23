# nitron-router

```js
nitron.component('home',{
  template:`
    <h1>This is Home!</h1>
  `
});

nitron.component('example',{
  template:`
    <h1>This is Example page!</h1>
  `
});

  const App = `
  
  <Link to="/">Home</Link>
  <Link to="/example">Example</Link>
  
  <div>
    <Router path="/" el="<Home/>" />
    <Router path="/example" el="<Example />" />
  </div>
  
`

nitronDOM.render(App,document.getElementById('root'));
```
