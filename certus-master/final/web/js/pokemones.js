function getPokemonListPage() {
    let indexCounter = 0;
    fetch("https://pokeapi.co/api/v2/generation/1/", {})
        .then((response) => response.json())
        .then((data) => {
            const pokemons = data.pokemon_species;
            // console.log(pokemons);

            // fetch los primeros 20, en lugar de for (const index in pokemons) {}
            fetchNPokemons(20);
            function fetchNPokemons(nPokemons) {
                for (indexCounter = 0; indexCounter < nPokemons; indexCounter++) {
                    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemons[indexCounter].name, {})
                        .then((response) => response.json())
                        .then((data) => {

                            console.log(data.name) // 151
                            createCard(data);

                        });
                    // console.log({ indexCounter })
                };
            };

            listenToBtn();
            function listenToBtn() {


                btnMorePokemons.textContent = 'CARGAR MÁS POKEMONES';
                btnMorePokemons.addEventListener('click', () => {
                    // alert(indexCounter)

                    // si hay 120 cards, el btn sigue funcionando, cuando hayan140 cards, el btn se deshabilita
                    let allCards = document.querySelectorAll('.card');
                    if (151 - allCards.length < 20) {
                        // btnMorePokemons.style.pointerEvents = 'none'
                        btnMorePokemons.disabled = 'true'
                        btnMorePokemons.style.display = 'none'

                        let newBtn = document.createElement('a')
                        newBtn.className = 'form-control'
                        newBtn.href = '#'
                        newBtn.textContent = 'VOLVER ARRIBA';
                        root.append(newBtn);

                    }

                    for (indexCounter = allCards.length; indexCounter < allCards.length + 20; indexCounter++) {

                        //en indexcounter de 140 elbtn desaparece

                        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemons[indexCounter].name, {})
                            .then((response) => response.json())
                            .then((data) => {

                                console.log(data.name) // 151
                                createCard(data);

                            });
                        // console.log({ indexCounter })
                    };
                });
            };
        });

    root.append(main, btnMorePokemons);

}



/**
 * Crear un compomente card para mostrar un pokemon
 * @param {*} data 
 */
function createCard(data) {
    let card = document.createElement('article');
    card.className = 'card';
    card.classList.add(data.types[0].type.name); //NUEVO tienen una clase extra dependiendo del tipo de pokemon
    card.id = data.name;

    let imgContainer = document.createElement('figure');
    imgContainer.className = 'imgContainer';

    let img = document.createElement("img");
    img.loading = 'lazy';
    //img.src = data.sprites.front_shiny.others[0].front_default;
    img.width = "200"
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    //img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`


    card.addEventListener('click', () => {
        console.log(data.types[0].type.name) //funcion solo para encontrar tipos de pokemon sin color
    })
    let textContainer = document.createElement("figcaption");
    textContainer.className = ('textContainer');

    let text = document.createElement('h3');
    text.textContent = data.name
    text.textContent = (text.textContent).toUpperCase(); //todo en mayuscula el nombre

    let btn = document.createElement('button')
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
    btn.className = 'p-3'
    btn.addEventListener('click', (e) => {
        console.log(e.currentTarget.parentElement) //al hacerclick en la estrella obtienes el .card o <article> con su id (nombre del pokemon)

        const cardElement = e.currentTarget.parentElement;

        console.log(cardElement)

        cardElement.classList.toggle('fav');
        const favorite = { favorite: { name: data.name, peso: data.weight, altura: data.height, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` } };
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(favorite),
            headers: ({
                'Content-Type': 'application/json'
            })
        }
        fetch("http://localhost:9000/api/users/favorites/" + sessionStorage.login, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                cardElement.classList.toggle('fav');
                alert('agregado a favoritos')
            });

    })// final de eventlistener

    imgContainer.append(img);
    textContainer.append(text);
    card.append(imgContainer, textContainer, btn);
    main.append(card); //main enlugar de root
}