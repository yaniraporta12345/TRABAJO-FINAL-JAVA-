
function eliminar(){
    const rpta = confirm("Desea quitar de favoritos?")
    if (rpta) {
        fetch("http://localhost:9000/api/users/"+sessionStorage.login, {method: 'DELETE',
        headers: new Headers({'Content-Type': 'application/json'}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.deletedCount == 1) {
                    alert('Usuario eliminado');
                    window.location.href = "sign.html";
                }else{
                    alert("No se pudo eliminar usuario")
                }
            });
    }
}

function getFavoritos(idUsuario) {
    //http://localhost:9000/api/users/favorites/63aa8c0d4760dd949eb213c6
      fetch("http://localhost:9000/api/users/favorites/"+sessionStorage.login, {method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),})
        .then((response) => response.json())
        .then((data) => {
          const favorites = data.favorites;
          console.log(favorites);
          // //let select = document.getElementById('pokemons');
        //   if(typeof EmpName === 'undefined'){
        //     alert("No hay pokemones favoritos");

        //     return false
        //   }
        if (favorites.length>0) {
          for (const index in favorites) {
            
            createCard(favorites[index])

          }
        }else{
            document.querySelector(".card-container").innerHTML = '<h3 style="padding-top: 2rem;">No tienes pokemones favoritos</h3>'; 
        }
    });
}

    function createCard(data) {
        let card = document.createElement('article');
        card.className = 'card col';
        card.classList.add(data.name); //NUEVO tienen una clase extra dependiendo del tipo de pokemon
        card.id = data.name;
  
        let imgContainer = document.createElement('figure');
        imgContainer.className = 'imgContainer';
  
        let img = document.createElement("img");
        img.loading = 'lazy';
        //img.src = data.sprites.front_shiny.others[0].front_default;
        img.width = "200"
        img.src = data.img;
        //img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`

        let textContainer = document.createElement("figcaption");
        textContainer.className = ('textContainer');
  

        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = "Eliminar";
        btnEliminar.classList.add("btn");
        btnEliminar.classList.add("btn-danger");
        btnEliminar.addEventListener('click', (e) => {
            let obj= {favorite: {name:data.name, peso: data.peso, altura: data.altura, img: data.img}}
            //console.log(data)
            fetch("http://localhost:9000/api/users/favorites/"+sessionStorage.login, {
            method: 'DELETE',
            body: JSON.stringify(obj), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            }),})
            .then((response) => response.json())
            .then((data) => {
                if(data.modifiedCount == 1){
                    alert('pokemon eliminado')
                    location.reload();
                }
                console.log(data)
                

                
            });
        })


        let text = document.createElement('h3');
        text.textContent = data.name
        text.textContent = (text.textContent).toUpperCase(); //todo en mayuscula el nombre

        imgContainer.append(img);
        textContainer.append(text);


        card.append(imgContainer, textContainer,btnEliminar);
        document.querySelector("main").append(card);
        //document.querySelector(".card-container").append(card); //main enlugar de root
      }