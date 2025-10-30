// menu.js
const menuHTML = `
<style>
  .top-menu {

  padding: 6vh;

  }

  .menu-back {

    list-style: none;


  }

  a {
      color: white;
      text-decoration: none;
      
  }


</style>
  <nav class="top-menu">
    <div class="menu-title"></div>
    <ul class="menu-links">
       <li class="menu-back"><a href="../../index.html">Voltar</a></li>
    </ul>
  </nav>
`;

document.body.innerHTML(menuHTML);
