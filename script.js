let online = false;





let grid = document.getElementById("grid");
const resultsCount = document.querySelectorAll(".resultNumber");

let doSort = 0;
let ascendingOrder = true

let MoviesByPage = 24

let isSearching = false;

let categoryExist = true

if (localStorage.getItem("categories") === null || localStorage.getItem("categories") === undefined){
    localStorage.setItem("categories", "[]")
    categoryExist = false
}


const WriteInLocalStorage = (object) => {
    localStorage.setItem("datas", JSON.stringify(object))
}

const initLocalStorage = (datas) => {
    let newDatas = ""
    if (localStorage.getItem("datas") === null) {
        WriteInLocalStorage(datas);
        newDatas = JSON.parse(localStorage.getItem("datas"));
    } else {
        newDatas = JSON.parse(localStorage.getItem("datas"));
    }
    return newDatas
}
newDatas = initLocalStorage(datas)
let gridSize = newDatas.length;

const getCategoryByID = (category) => {
    let categoryName = ""

    if (category == "Ry7vwsO3C00NzHpov3PF"){
        categoryName = "Film d'animation"
    }
    else if (category == "R7njrf6DPHVvNRLpz4P0"){
        categoryName = "Horreur"
    }
    else if (category == "phbvMXBaGJmfVKRsWu7p"){
        categoryName = "Comics"
    }
    else if (category == "4sSKW4wg50CYFwvX8sHd"){
        categoryName = "Perfection"
    }
    else if (category == "SDVQaumDGSOlAfrcSX6b"){
        categoryName = "Animé"
    }
    else if (category == "mXpK90nl0fkY38dX2XIT"){
        categoryName = "Science Fiction"
    }
    else if (category == "qWvkRkXKisovrRkQWEaQ"){
        categoryName = "Comédie"
    }
    else if (category == "o2pDB85sa98F1HxqbBXG"){
        categoryName = "Romance"
    }
    else if (category == "5wHECJHdyrBTzFMvrY2z"){
        categoryName = "Drame"
    }
    else if (category == "rY5M4RuAe2FDQm93o7Tc"){
        categoryName = "Musical"
    }
    else if (category == "qANEaYdxU0Ia3c4SYTW1"){
        categoryName = "Énigme"
    }else {
        categoryName = "sans nom"
    }

    return categoryName
}

const getIDByCategory = (ID) => {
    let categoryId = ""

    if (ID == "Film d'animation"){
        categoryId = "Ry7vwsO3C00NzHpov3PF"
    }
    else if (ID == "Horreur"){
        categoryId = "R7njrf6DPHVvNRLpz4P0"
    }
    else if (ID == "Comics"){
        categoryId = "phbvMXBaGJmfVKRsWu7p"
    }
    else if (ID == "Perfection"){
        categoryId = "4sSKW4wg50CYFwvX8sHd"
    }
    else if (ID == "Animé"){
        categoryId = "SDVQaumDGSOlAfrcSX6b"
    }
    else if (ID == "Science-fiction"){
        categoryId = "mXpK90nl0fkY38dX2XIT"
    }
    else if (ID == "Comédie"){
        categoryId = "qWvkRkXKisovrRkQWEaQ"
    }
    else if (ID == "Romance"){
        categoryId = "o2pDB85sa98F1HxqbBXG"
    }
    else if (ID == "Drame"){
        categoryId = "5wHECJHdyrBTzFMvrY2z"
    }
    else if (ID == "Musical"){
        categoryId = "rY5M4RuAe2FDQm93o7Tc"
    }
    else if (ID == "Énigme"){
        categoryId = "qANEaYdxU0Ia3c4SYTW1"
    }

    return categoryId
}

const getAllCategories = () => {
    
    let categories = JSON.parse(localStorage.getItem("categories"))
    // categories = categories.map(x => x.id)

    return categories;
    
}

const getNewID = () => {
    // 20 charactères

    let length = 20;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let Password = "";

    for (let i = 0, n = charset.length; i < length; ++i) {
        Password += charset.charAt(Math.floor(Math.random() * n));
    }
    return Password;
}


// =====
// Movies modification
// =====

const createNewMovie = () => {
    const newMovieDiv = document.querySelector('.newMovie')

    newMovieDiv.innerHTML = ""

    newMovieDiv.style.display = "flex"


    // container
    const container = document.createElement("div")
    container.classList.add("containerNewMovie")
    newMovieDiv.appendChild(container)

    // titre
    container.innerHTML += "<h2> Nouveau film </h2>"

    // Formulaire div
    const formContainer = document.createElement("div")
    formContainer.classList.add("formContainer")
    container.appendChild(formContainer)

    // formulaire

    let categories = getAllCategories()

    let categoriesNames = categories.map(x => x.name)
    

    let theseCheckBoxes =
        categoriesNames.map(function(element) {

            return '<option value="'+ element +'">'+ element +'</option>'
        });
    ;

    const formCreateMovie = document.createElement("form")
    formCreateMovie.classList.add("formCreateMovie")
    formContainer.appendChild(formCreateMovie)

    
    const newMovieForm = document.createElement("div")
    newMovieForm.classList.add("newMovieForm")
    formCreateMovie.appendChild(newMovieForm)

    newMovieForm.innerHTML +=   '<div class="firstColumn">'+
                                '<label for="movieName">Nom du film</label>'+
                                '<input placeholder="Harry Potter et la coupe de ch\'feu" class="input" type="text" id="movieName" required>'+
                                
                                '<label for="authorName">Auteur</label>'+
                                '<input placeholder="Jean Kevin" class="input" type="text" id="authorName" required>'+

                                '<label for="categorySelect">Catégorie</label>'
                                

    const categorySelect = document.createElement("select")
    categorySelect.id = "categorySelect";
    categorySelect.classList.add("input")

    document.querySelector(".firstColumn").appendChild(categorySelect)


    categorySelect.innerHTML = theseCheckBoxes.join('\n');

    newMovieForm.innerHTML +='</div>'+
                                '<div class="secondColumn">'+

                                '<label for="description">Description</label>'+
                                '<textarea placeholder="Description en quelques lignes..." rows="5" style="resize: none;" class="input" id="description" required></textarea>'+
                                
                                '<br><br><label for="imageMovie">Affiche du film</label>'+
                                '<input class="input" type="url" placeholder="https://exemple.png" pattern="https://.*" required id="imageMovie">'+
                                
                                '<label for="videoMovie">Bande annonce</label>'+
                                '<input class="input" type="url" placeholder="https://www.youtube.com/exemple" pattern="https://.*" required id="videoMovie">'+
                                '<br><br><input class="button" type="submit" id="submit" value="Ajouter">'+
                                '</div>'

    document.querySelector(".formCreateMovie").addEventListener('submit', (event) => {
        event.preventDefault();
        addMovie()
    })
}

const addMovie = () => {
    let idMovie = getNewID()
    if (online){

        axios.post("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies", {
            name: document.getElementById("movieName").value,
            author: document.getElementById("authorName").value,
            img: document.getElementById("imageMovie").value,
            category : getIDByCategory(document.getElementById("categorySelect").value),
            description: document.getElementById("description").value,
            video: document.getElementById("videoMovie").value,
            id: idMovie
        }).then(res => {
            document.getElementById("movieName").value = ""
        })
        .catch(error =>{
            console.error(error);
        })
    }

    let localDatas = JSON.parse(localStorage.getItem("datas"))

    let datasMovie = {}
    datasMovie.name = document.getElementById("movieName").value
    datasMovie.author = document.getElementById("authorName").value
    datasMovie.img = document.getElementById("imageMovie").value
    datasMovie.category = getIDByCategory(document.getElementById("categorySelect").value)
    datasMovie.description = document.getElementById("description").value
    datasMovie.video = document.getElementById("videoMovie").value
    datasMovie.id = idMovie

    datasMovie.likes = 0
    datasMovie.dislikes = 0
    

    document.getElementById("movieName").value = ""
    document.getElementById("authorName").value = ""
    document.getElementById("imageMovie").value = ""
    document.getElementById("categorySelect").value = ""
    document.getElementById("description").value = ""
    document.getElementById("videoMovie").value = ""

    document.querySelector(".newMovie").style.display = "none"
    
    localDatas.unshift(datasMovie)

    

    WriteInLocalStorage(localDatas);

    updateGrid(JSON.parse(localStorage.getItem("datas")))
}

const modifyMovie = (ThisEvent) => {
    let idOfThisMovie = ThisEvent.target.parentElement.parentElement.parentElement.classList[1]

    let thisMovie = getMovieByID(idOfThisMovie)

    const movieName = thisMovie.name;
    const movieDesc = thisMovie.description;
    const movieImg = thisMovie.img;
    const movieVideo = thisMovie.video;
    const movieAuthor = thisMovie.author;
    const movieCategory = thisMovie.category;


    const newMovieDiv = document.querySelector('.newMovie')

    newMovieDiv.innerHTML = ""

    newMovieDiv.style.display = "flex"


    // container
    const container = document.createElement("div")
    container.classList.add("containerNewMovie")
    newMovieDiv.appendChild(container)

    // titre
    container.innerHTML += "<h2> Nouveau film </h2>"

    // Formulaire div
    const formContainer = document.createElement("div")
    formContainer.classList.add("formContainer")
    container.appendChild(formContainer)

    // formulaire

    let categories = getAllCategories()

    let categoriesNames = categories.map(x => x.name)

    let theseCheckBoxes =
        categoriesNames.map(function(element) {

            return '<option value="'+ element +'">'+ element +'</option>'
        });


    // mettre la catégorie atuelle tout en haut
    const fromIndex = theseCheckBoxes.indexOf('<option value="'+ getCategoryByID(movieCategory) +'">'+ getCategoryByID(movieCategory) +'</option>');
    const toIndex = 0;
    
    const element = theseCheckBoxes.splice(fromIndex, 1)[0];
    
    theseCheckBoxes.splice(toIndex, 0, element);

    //

    const formCreateMovie = document.createElement("form")
    formCreateMovie.classList.add("formCreateMovie")
    formContainer.appendChild(formCreateMovie)

    
    const newMovieForm = document.createElement("div")
    newMovieForm.classList.add("newMovieForm")
    formCreateMovie.appendChild(newMovieForm)

    newMovieForm.innerHTML +=   '<div class="firstColumn">'+
                                '<label for="movieName">Nom du film</label>'+
                                '<input value="'+ movieName +'" class="input" type="text" id="movieName" required>'+
                                
                                '<label for="authorName">Auteur</label>'+
                                '<input value="'+ movieAuthor +'" class="input" type="text" id="authorName" required>'+

                                '<label for="categorySelect">Catégorie</label>'
                                

    const categorySelect = document.createElement("select")
    categorySelect.id = "categorySelect";
    categorySelect.classList.add("input")

    document.querySelector(".firstColumn").appendChild(categorySelect)


    categorySelect.innerHTML = theseCheckBoxes.join('\n');

    newMovieForm.innerHTML +='</div>'+
                                '<div class="secondColumn">'+

                                '<label for="description">Description</label>'+
                                '<textarea rows="5" style="resize: none;" class="input" id="description" required>'+ movieDesc +'</textarea>'+
                                
                                '<br><br><label for="imageMovie">Affiche du film</label>'+
                                '<input class="input" type="url" value="'+ movieImg +'" pattern="https://.*" required id="imageMovie">'+
                                
                                '<label for="videoMovie">Bande annonce</label>'+
                                '<input class="input" type="url" value="'+ movieVideo +'" pattern="https://.*" required id="videoMovie">'+
                                '<br><br><input class="button" type="submit" id="submitReplace" value="Remplacer">'+
                                '</div>'

    document.querySelector(".formCreateMovie").addEventListener('submit', (event) => {
        event.preventDefault();
        deleteMovie(null, idOfThisMovie)
        addMovie()
        
    })
    
}


// =====
// (Outils)
// =====

const getMovieByID = (ID) => {
    return newDatas.filter(
        function (newDatas) {
            return newDatas.id == ID
        }
    )[0];
}

const numberOfPages = (numberOfMovies) => {
    return Math.ceil(numberOfMovies / MoviesByPage)
}

// =====
// Sort
// =====
const sorter = (order) => {
    let objs = JSON.parse(localStorage.getItem("datas"))
    let sorted = []

    if (order){
        sorted = objs.sort((a,b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0))
    }else{
        sorted = objs.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
    }

    localStorage.setItem("datas", JSON.stringify(sorted))
    updateGrid(sorted)
}

const sorterName = (order) => {
    let objs = JSON.parse(localStorage.getItem("datas"))
    let sorted = []

    if (order){
        sorted = objs.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }else{
        sorted = objs.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
    }
    localStorage.setItem("datas", JSON.stringify(sorted))
    updateGrid(sorted)
}

const sorterAuthor = (order) => {
    let objs = JSON.parse(localStorage.getItem("datas"))
    let sorted = []

    if (order){
        sorted = objs.sort((a,b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0))
    }else{
        sorted = objs.sort((a,b) => (a.author < b.author) ? 1 : ((b.author < a.author) ? -1 : 0))
    }
    localStorage.setItem("datas", JSON.stringify(sorted))
    updateGrid(sorted)
}

const sortManager = (event) => {
    
    let value = event.target.value

    

    if (value === "byName"){
        sorterName(true)
        showMoviesWithTag("all")
        
    }else if (value === "byAuthor"){
        sorterAuthor(true) 
        showMoviesWithTag("all") 
              
    }else if (value === "byLikes"){
        sorter(true)
        showMoviesWithTag("all")
        
    }else{
        console.error("Erreur dans la fonction sortManager")
    }

    
}


// =====
// Pagination
// =====

const pagination = (pageNum) => {
    let grid = JSON.parse(localStorage.getItem("datas"))


    for (let i = 0; i < grid.length; i++) {
        let item = document.querySelector(".movie.ID_"+grid[i].id)
        if (i < MoviesByPage * pageNum && i + 1 > (MoviesByPage * pageNum) - MoviesByPage) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    }

    document.querySelector(".pageNumber").innerHTML = "<h4>Page " + pageNum + "</h4>"
}


// =====
// (Outils)
// =====

const initCategory = () => {

    JSON.parse(localStorage.getItem("datas")).forEach(element => {
        

        let localDatas = JSON.parse(localStorage.getItem("categories"))
        localDatas.push({name: getCategoryByID(element.category), id: element.category})
        localStorage.setItem("categories", JSON.stringify(localDatas))

    });

    let notDouble = [...new Map(JSON.parse(localStorage.getItem("categories")).map((m) => [m.id, m])).values()];

    localStorage.setItem("categories", JSON.stringify(notDouble))

    
    
}

const clearCookies = () => {
    localStorage.clear();
    location.reload();
}

// =====
// Grid
// =====

const gridLiked = () => {
    let gridLiked = document.querySelector('.gridLikedMovies')

    let moviesList = []

    let localDatas = JSON.parse(localStorage.getItem("datas"))

    localDatas.forEach(element => {
        if (element.clickedOn === "like"){
            let carre = document.createElement("div");
            carre.classList.add("movie");
            gridLiked.appendChild(carre)

            let content = document.createElement("div");
            content.classList.add("content2");
            carre.appendChild(content)


            let movieName = element.name;
            let movieId = element.id;
            let author = element.author;
            let image = element.img;
            let description = element.description;
                    

            if (movieName.length > 32){
                movieName = movieName.slice(0, 32) + "..."
            }
            content.innerHTML = '<h2 class="movieTitle">' + movieName + '</h2>'
            content.innerHTML += '<h3 class="author">' + author + '</h3>';
            content.innerHTML += '<a class="parametres" onclick="parameters(event)"> ⁝ </a>';

            content.innerHTML += '<p class="invisibleDesc">'+ description +'</p>';

            

            

            carre.style.setProperty("background-image", "url(" + image + ")")

            carre.classList.add('ID_' + movieId);


            // if (i + 1 > MoviesByPage) {
            //     carre.style.display = "none"
            // }

            carre.innerHTML+= '<div class="seeMore"> <a class="button">Voir plus ▸</a></div>'
        }
    });
}

const createGrid = (gridSize, grid, movies) => {
    for (let i = 0; i < gridSize; i++) {


        let carre = document.createElement("div");
        carre.classList.add("movie");
        grid.appendChild(carre)

        let content = document.createElement("div");
        content.classList.add("content");
        carre.appendChild(content)


        let movieName = movies[i].name;
        let movieId = movies[i].id;
        let author = movies[i].author;
        let image = movies[i].img;
        let description = movies[i].description;
                

        if (movieName.length > 32){
            movieName = movieName.slice(0, 32) + "..."
        }
        content.innerHTML = '<h2 class="movieTitle">' + movieName + '</h2>'
        content.innerHTML += '<h3 class="author">' + author + '</h3>';
        content.innerHTML += '<a class="parametres" onclick="parameters(event)"> ⁝ </a>';

        content.innerHTML += '<p class="invisibleDesc">'+ description +'</p>';

        

        

        carre.style.setProperty("background-image", "url(" + image + ")")

        carre.classList.add('ID_' + movieId);


        if (i + 1 > MoviesByPage) {
            carre.style.display = "none"
        }

        carre.innerHTML+= '<div class="seeMore"> <a class="button">Voir plus ▸</a></div>'
    }

    for (let i = 0; i < numberOfPages(gridSize); i++) {
        document.querySelector(".pageChoose").innerHTML += "<a class='NumPage button' onclick='pagination(" + (i + 1)+")'> " + (i + 1) + "</a>"
    }

    if (!categoryExist){
        initCategory()
    }
    createSearchWithTags()
    
    
    pagination(1)

    gridLiked()
}

const clearGrid = () => {

    document.querySelector(".pageChoose").innerHTML = '';

    grid.querySelectorAll(".movie").forEach(element => {
        grid.removeChild(element)
    });

    document.querySelector(".gridLikedMovies").innerHTML = '';

    delete document.querySelector('.tagSelection')

}

resultsCount.forEach(element => {
    element.innerHTML = gridSize + " résultats";
});


const search = () => {
    isSearching = true;

    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("grid");
    tr = table.querySelectorAll("div .movie");

    let shown = 0;

    for (i = 0; i < tr.length; i++) {

        td = tr[i].getElementsByClassName("content")[0];

        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                shown++
                tr[i].style.display = "block";

                if (shown > MoviesByPage) {
                    tr[i].style.display = "none";
                }
                isSearching = false;
            } else {

                isSearching = true;

                tr[i].style.display = "none";
            }
        }
        if (shown) {
            if (txtValue.toUpperCase().indexOf(filter) > -1) {

                

                let toInsertFirst = '</a>'
                let toInsertSecond = '<a class="overline">'
               
                 
                for (let k = 0; k<td.children.length; k++){

                    if (td.children[k].innerText.toUpperCase().includes(filter)){

                        let pos1 = td.children[k].innerText.toUpperCase().indexOf(filter)
                        let pos2 = td.children[k].innerText.toUpperCase().indexOf(filter) + filter.length


                        let output = [td.children[k].innerText.slice(0, pos2), toInsertFirst, td.children[k].innerText.slice(pos2)].join('');
                        

                        output = [output.slice(0, pos1), toInsertSecond, output.slice(pos1)].join('');

                        td.children[k].innerHTML = output;

                    }
                    
                }
            }

            document.querySelectorAll(".resultNumber").forEach(element => {
                element.innerHTML = shown + " résultats";
            });
        } else {
            document.querySelectorAll(".resultNumber").forEach(element => {
                element.innerHTML = "Aucun résultat n'a été trouvé";
                element.innerHTML += '<input class="button" type="button" value="Ajouter un film" id="buttonNewMovie2">'
                
                document.getElementById("buttonNewMovie2").addEventListener("click", () => {
                    createNewMovie()
                })
            });
        }

        table.style.setProperty("width", (shown * 15) + "%")
    }

    document.querySelector(".pageChoose").innerHTML = ""
    for (let i = 0; i < numberOfPages(shown); i++) {
        document.querySelector(".pageChoose").innerHTML += "<a class='NumPage' onclick='pagination(" + (i + 1) + ")'> " + (i + 1) + "</a>"
    }
}

const clearSort = () => {
    doSort = 0;
    for (i = 0; i < grid.children.length; i++) {
        let carre = grid.children[i]
        carre.style.order = ""
    }
    updateGrid(JSON.parse(localStorage.getItem("datas")))

}

const updateGrid = (newMovies) => {
    // newDatas = JSON.parse(localStorage.getItem("datas"));
    gridSize = newMovies.length;

    resultsCount.forEach(element => {
        element.innerHTML = newMovies.length + " résultats";
    });

    

    clearGrid();
    createGrid(gridSize, grid, newMovies);
}

const closeDescMovie = (toClose) => {
    toClose.parentElement.removeChild(toClose);
}

const updateLocalStorage = () => {
    if (online){
        fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies")
            .then(resp => resp.json())
            .then(resp => {
                movies = resp.map(x => x)
            })
            .then(resp => {
                localStorage.setItem("datas", JSON.stringify(movies))
            })
    }
    
}


const init = () => {
    let movies
    if (online) {
        localStorage.clear()

        fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories")
            .then(resp => resp.json())
            .then(resp => {
                categories = resp.map(x => x)
            })
            .then(resp => {

                localStorage.setItem("categories", JSON.stringify(categories))
                
            })

        fetch("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies")
            .then(resp => resp.json())
            .then(resp => {
                movies = resp.map(x => x)
            })
            .then(resp => {

                let newMovies = initLocalStorage(movies)
                let gridSize = newMovies.length;
                createGrid(gridSize, grid, newMovies)
                return newMovies
            })
        
            
    } else {
        fetch("Films/Datas.json")
            .then(resp => resp.json())
            .then(resp => {
                movies = resp.map(x => x)
            })
            .then(resp => {
                let newMovies = initLocalStorage(movies)
                let gridSize = newMovies.length;
                createGrid(gridSize, grid, newMovies)
                return newMovies
            })
    }

}

const parameters = (e) => {
    
    document.getElementById("rmenu").className = "show";
    document.getElementById("rmenu").style.top = e.pageY + 'px';
    document.getElementById("rmenu").style.left = e.pageX + 'px';
    
    document.getElementById("rmenu").classList.add(e.target.parentElement.parentElement.classList[1].slice(3) + "")
}

const deleteMovie = (event, idOfthemovie) => {
    let id = ""
    if (event === null){
        id = idOfthemovie
    }else if (idOfthemovie === null){
        id = event.target.parentElement.parentElement.parentElement.classList[1]
    }else{
        console.error("ya un problème la " + error)
    }
    
    

    if (confirm("Vous voulez vraiment faire ce que vous voulez faire ?")) {
        if (online){
            let url = 'https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/' + id
            
            axios.delete(url)
            .then(response => console.log('Delete successful'))
            .catch(error => {
                console.error('There was an error!', error);
            });


            updateLocalStorage()
            updateGrid(JSON.parse(localStorage.getItem("datas")))

        }

        let allMovies = JSON.parse(localStorage.getItem("datas"));
            
        const indexOfObject = allMovies.findIndex(object => {
            return object.id === id;
        });


        allMovies.splice(indexOfObject, 1);
            
        WriteInLocalStorage(allMovies);
        updateGrid(allMovies);
    }


    let table = document.getElementById("grid");
    let shown = parseInt(document.querySelector(".resultNumber").innerHTML.split(" ")[0])
    table.style.setProperty("width", (shown * 15) + "%")
    
    if (document.querySelector('.showMovie') != null){
        const topDivContent = document.querySelector('.showMovie');
        topDivContent.innerHTML = "";
    }
    
}

// =====
// Likes / Dislikes
// =====

const addLike = (event) => {
    let idMovie = document.querySelector(".backgroundMovies ").classList[1].slice(3)
    
    let localDatas = JSON.parse(localStorage.getItem("datas"))

    let movieLiked = JSON.parse(localStorage.getItem("datas")).find(item => item.id === idMovie);


    if (movieLiked.clickedOn === undefined){
        const indexOfObject = localDatas.findIndex(object => {
            return object.id === idMovie;
        });
        localDatas.splice(indexOfObject, 1);
        WriteInLocalStorage(localDatas);
        updateGrid(localDatas);
    
        movieLiked.likes = movieLiked.likes + 1;
    
        event.target.querySelector(".contentPosterLikes").innerHTML = movieLiked.likes;
    
        movieLiked.clickedOn = "like";
    
        localDatas.unshift(movieLiked)
        WriteInLocalStorage(localDatas);
        updateGrid(JSON.parse(localStorage.getItem("datas")))
    
        event.target.style.filter = "none"
    
        let gaugeContent = document.querySelector(".gaugeContent")
        gaugeContent.style.setProperty('width', ((movieLiked.likes / (movieLiked.dislikes + movieLiked.likes)) * 200) + 'px');
    
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/"+ idMovie + "/like"
        let numberOfLikes = movieLiked.likes



        if (online){

            axios.patch(url, {
                likes: numberOfLikes
            }
            ).catch(error =>{
                console.log(error);
            })

        }
    }else if (movieLiked.clickedOn === "like"){
        event.target.style.filter = "none"
    }
}

const addDislike = (event) => {
    let idMovie = document.querySelector(".backgroundMovies ").classList[1].slice(3)
    
    let localDatas = JSON.parse(localStorage.getItem("datas"))


    let movieDisliked = JSON.parse(localStorage.getItem("datas")).find(item => item.id === idMovie);

    if (movieDisliked.clickedOn === undefined){

        const indexOfObject = localDatas.findIndex(object => {
            return object.id === idMovie;
        });
        localDatas.splice(indexOfObject, 1);
        WriteInLocalStorage(localDatas);
        updateGrid(localDatas);


        movieDisliked.dislikes = movieDisliked.dislikes + 1;

        event.target.querySelector(".contentPosterDislikes").innerHTML = movieDisliked.dislikes;

        movieDisliked.clickedOn = "dislike";

        localDatas.unshift(movieDisliked)
        WriteInLocalStorage(localDatas);
        updateGrid(JSON.parse(localStorage.getItem("datas")))

        event.target.style.filter = "none"

        let gaugeContent = document.querySelector(".gaugeContent")
        gaugeContent.style.setProperty('width', ((movieDisliked.likes / (movieDisliked.dislikes + movieDisliked.likes)) * 200) + 'px');

        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/movies/"+ idMovie + "/dislike"
        let numberOfDislikes = movieDisliked.dislikes

        if (online){

            axios.patch(url, {
                dislikes: numberOfDislikes
            }
            ).catch(error =>{
                console.log(error);
            })

        }

    }else if (movieDisliked.clickedOn === "dislike"){
        event.target.style.filter = "none"
    }
}


// =====
// Categories modifications
// =====

const createCategory = () => {
    const newCategoryDiv = document.querySelector('.newMovie')
    
    newCategoryDiv.innerHTML = ""

    newCategoryDiv.style.display = "flex"

    // container
    const container = document.createElement("div")
    container.classList.add("containerNewCategory")
    newCategoryDiv.appendChild(container)

    // titre
    container.innerHTML += "<h2> Nouvelle catégorie </h2>"

    // Formulaire div
    const formContainer = document.createElement("form")
    formContainer.classList.add("formContainer")
    container.appendChild(formContainer)


    formContainer.innerHTML += '<label for="categoryAddName">Nom de la catégorie</label>'+
                                '<input id="inputCategory" placeholder="Fantastique, Horreur, SF, ..." class="input" type="text" id="categoryAddName" required>'+
                                '<input class="button" type="submit" id="submitCategory" value="Ajouter"></input>'

    document.querySelector(".containerNewCategory .formContainer").addEventListener('submit', (event) => {
        event.preventDefault()
        let inputCategory = document.querySelector("#inputCategory")

        let obj = JSON.parse(localStorage.getItem("categories"));

        let isInLocalStorage = false;

        obj.forEach(element => {
            
            if (element.name === inputCategory.value) {
                isInLocalStorage = true;
            }
        });

        if(isInLocalStorage){
            alert("La catégorie existe déjà !")
        }else{
            addCategory(inputCategory.value, getNewID())
        }
        
    })
}

const addCategory = (categoryName, newId) => {
    
    let obj = JSON.parse(localStorage.getItem("categories"));

    const datasNewCategory = {
        name: categoryName,
        id: newId
    }

    obj.push(datasNewCategory)

    localStorage.setItem("categories", JSON.stringify(obj))

    document.querySelector(".newMovie").style.display = "none"

    

    if (online){

        axios.post("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories", {
            name: categoryName,
            id: newId
        })
        .catch(error =>{
            console.error(error);
        })
    }

    document.getElementById('tagSelection').parentNode.removeChild(document.getElementById('tagSelection'))
    createSearchWithTags()
}

const deleteCategory = () => {
    const newCategoryDiv = document.querySelector('.newMovie')
    
    newCategoryDiv.innerHTML = ""

    newCategoryDiv.style.display = "flex"

    // container
    const container = document.createElement("div")
    container.classList.add("containerRemoveCategory")
    container.classList.add("containerNewCategory")
    newCategoryDiv.appendChild(container)

    // titre
    container.innerHTML += "<h2> Supprimer une catégorie </h2>"

    // Formulaire div
    const formContainer = document.createElement("form")
    formContainer.classList.add("formContainer")
    container.appendChild(formContainer)


    let categories = getAllCategories()

    let categoriesNames = categories.map(x => x.name)

    let theseCheckBoxes =
        categoriesNames.map(function(element) {
            return '<option value="'+ element +'">'+ element +'</option>'
        });
    ;


    const categorySelect = document.createElement("select")
    categorySelect.id = "categorySelectDelete";
    categorySelect.classList.add("input")

    formContainer.appendChild(categorySelect)


    categorySelect.innerHTML = theseCheckBoxes.join('\n');


    formContainer.innerHTML += '<input class="button" type="submit" id="submitDeleteCategory" value="Supprimer"></input>'

    document.querySelector(".containerRemoveCategory .formContainer").addEventListener('submit', (event) => {
        event.preventDefault()
        let inputCategory = document.querySelector("#categorySelectDelete")

        var selectedCategory = inputCategory.options[inputCategory.selectedIndex].text;

        let categoryObj = JSON.parse(localStorage.getItem("categories")).find(item => item.name === selectedCategory);

        let canDelete = localStorage.getItem("datas").includes(categoryObj.id)
        canDelete = !canDelete

        if (canDelete){
            if (confirm("Vous voulez vraiment faire ce que vous voulez faire ?")) {
                removeCategory(categoryObj.id)
            }
        }else{
            alert("Des films ont cette catégorie !");
        }

        
    })
}

const removeCategory = (thisID) => {

    let localDatasCategory = JSON.parse(localStorage.getItem("categories"));
    let categoryToDelete = localDatasCategory.find(item => item.id === thisID);
    

    localDatasCategory.splice(localDatasCategory.indexOf(categoryToDelete), 1);


    localStorage.setItem("categories", JSON.stringify(localDatasCategory));

    document.querySelector(".newMovie").style.display = "none";


    if (online){
        let url = 'https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories/' + thisID
    
    
        axios.delete(url)
        .then(response => console.log('Delete successful'))
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    document.getElementById('tagSelection').parentNode.removeChild(document.getElementById('tagSelection'))
    createSearchWithTags()
    
}

const editCategory = () => {
    const newCategoryDiv = document.querySelector('.newMovie')
    
    newCategoryDiv.innerHTML = ""

    newCategoryDiv.style.display = "flex"

    // container
    const container = document.createElement("div")
    container.classList.add("containerEditCategory")
    container.classList.add("containerNewCategory")
    newCategoryDiv.appendChild(container)

    // titre
    container.innerHTML += "<h2> Modifier une catégorie </h2>"

    // Formulaire div
    const formContainer = document.createElement("form")
    formContainer.classList.add("formContainer")
    container.appendChild(formContainer)


    let categories = getAllCategories()

    let categoriesNames = categories.map(x => x.name)

    let theseCheckBoxes =
        categoriesNames.map(function(element) {

            return '<option value="'+ element +'">'+ element +'</option>'
        });
    ;


    const categorySelect = document.createElement("select")
    categorySelect.id = "categorySelectEdit";
    categorySelect.classList.add("input")

    formContainer.appendChild(categorySelect)


    categorySelect.innerHTML = theseCheckBoxes.join('\n');


    formContainer.innerHTML += '<label for="categoryNewName">Nouveau nom de la catégorie</label>'+
                                '<input id="inputCategoryEdit" placeholder="Fantastique, Horreur, SF, ..." class="input" type="text" id="categoryNewName" required>'+
                                '<input class="button" type="submit" id="submitCategory" value="Ajouter"></input>'

    document.querySelector(".containerEditCategory .formContainer").addEventListener('submit', (event) => {
        event.preventDefault()
        
        let inputCategoryNewName = document.querySelector("#inputCategoryEdit")

        let inputCategory = document.querySelector("#categorySelectEdit")

        var selectedCategory = inputCategory.options[inputCategory.selectedIndex].text;

        let categoryObj = JSON.parse(localStorage.getItem("categories")).find(item => item.name === selectedCategory);

        mofifyCategory(categoryObj, inputCategoryNewName.value)
    })
}

const mofifyCategory = (category, newName) => {


    let localDatasToEdit = JSON.parse(localStorage.getItem("categories"))

    let newArray = [{name: newName, id: category.id}]

    localDatasToEdit =localDatasToEdit.map(obj => newArray.find(o => o.id === obj.id) || obj);
    
    localStorage.setItem("categories", JSON.stringify(localDatasToEdit))

    document.querySelector(".newMovie").style.display = "none";



    if (online){
        let url = "https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories/"+ category.id


        axios.delete(url)
        .catch(error =>{
            console.log(error);
        })

        axios.post("https://europe-west3-gobelins-9079b.cloudfunctions.net/api/v1/categories", {
            name: newName,
            id: category.id
        })
    }

    document.getElementById('tagSelection').parentNode.removeChild(document.getElementById('tagSelection'))
    createSearchWithTags()
}

const categoryManager = (event) => {
    
    let value = event.target.value

    

    if (value === "Create"){
        createCategory()
        document.querySelector('#searchInput').value = ''
        event.target.children[0].selected = 'selected';
        
    }else if (value === "Delete"){
        deleteCategory()
        document.querySelector('#searchInput').value = ''
        event.target.children[0].selected = 'selected';
        
    }else if (value === "Edit"){
        editCategory()
        document.querySelector('#searchInput').value = ''
        event.target.children[0].selected = 'selected';
        
    }else{
        console.error("Erreur dans la fonction categoryManager")
    }

    
}

// =====
// Search with tag
// =====

const createSearchWithTags = () => {
    let categories = getAllCategories()


    let theseCheckBoxes =
        categories.map(function(element) {
            return '<option class="'+ element.id +'" value="'+ element.name +'">'+ element.name +'</option>'
        });
    ;

    if (document.querySelector('.tagSelection') === null){
        const tagSelection = document.createElement("select")
        tagSelection.id = "tagSelection";
        tagSelection.classList.add("input")
        tagSelection.classList.add("tagSelection")

        tagSelection.addEventListener("change", (event) => searchWithTag(event))

        document.querySelector('.SortSearch').appendChild(tagSelection)

        tagSelection.innerHTML = '<option value="noSelection" selected disabled hidden>Filtrer</option>' + '<option value="all">Tout</option>' + theseCheckBoxes.join('\n');
    }
}

const searchWithTag = (event) => {
    let tag = event.target.value
    showMoviesWithTag(tag)
}

const showMoviesWithTag = (tag) => {
    document.querySelector('#searchInput').value = ''
    search()

    let shown = 0;

    JSON.parse(localStorage.getItem('datas')).forEach(element => {
        if(tag === "all"){
            document.querySelector(".movie.ID_" + element.id).style.display = "block"
            pagination(1)
            shown++
        }else{

            if(getCategoryByID(element.category) === tag){
                
                document.querySelector(".movie.ID_" + element.id).style.display = "block"
                shown++
            }else{
                document.querySelector(".movie.ID_" + element.id).style.display = "none"
            }
        }
    });

    if (shown) {
        document.querySelectorAll(".resultNumber").forEach(element => {
            element.innerHTML = shown + " résultats";
        });
    } else {
        document.querySelectorAll(".resultNumber").forEach(element => {
            element.innerHTML = "Aucun résultat n'a été trouvé";
            element.innerHTML += '<input class="button" type="button" value="Ajouter un film" id="buttonNewMovie2">'
            
            document.getElementById("buttonNewMovie2").addEventListener("click", () => {
                createNewMovie()
            })
        });
    }

    document.querySelector("#grid").style.setProperty("width", (shown * 15) + "%")
}

const scrollDown = () => {
    document.querySelector('.titleSeparation').scrollIntoView({ behavior: "smooth", block: "start" });
}



// -- Events --


document.getElementById("buttonSort").addEventListener("click", (e) => {

    let value = document.querySelector('#sortSelect').value


    if (value === "byName"){
        sorterName(ascendingOrder)
        document.querySelector('#searchInput').value = ''
    }else if (value === "byAuthor"){
        sorterAuthor(ascendingOrder) 
        document.querySelector('#searchInput').value = ''       
    }else if (value === "byLikes"){
        sorter(ascendingOrder)
        document.querySelector('#searchInput').value = ''
    }else{
        console.error("Erreur dans la fonction sortManager")
    }

    document.querySelector('#grid').style.width = "100%";
    document.querySelector('#tagSelection').children[0].selected = 'selected'


    if (ascendingOrder) {
        e.target.value = "▲"
    } else {
        e.target.value = "▼"
    }

    ascendingOrder = !ascendingOrder
})

document.getElementById("buttonClearSort").addEventListener("click", () => {
    clearSort()
    document.getElementById("buttonSort").value = " - "
    ascendingOrder = !ascendingOrder
})

document.getElementById("buttonNewMovie").addEventListener("click", () => {
    createNewMovie()
})



// click sur un film

document.addEventListener("click", (e) => {
    if (e.target.classList[0] === "seeMore") {
        const movieParent = e.target.parentElement;

        const idMovie = movieParent.classList[1].slice(3);
        const movieClicked = getMovieByID(idMovie);
        const imageMovie = movieClicked.img;
        const video = movieClicked.video;
        const name = movieClicked.name;
        const author = movieClicked.author;
        const likes = movieClicked.likes;
        const dislikes = movieClicked.dislikes;
        const category = movieClicked.category;
        const description = movieClicked.description;
        const clickedOn = movieClicked.clickedOn;


        const topDivContent = document.querySelector('.showMovie');

        topDivContent.innerHTML = "";



        // background
        const poster = document.createElement('div')
        poster.classList.add('backgroundMovies');
        poster.classList.add('ID_' + idMovie);
        topDivContent.appendChild(poster)
        poster.style.setProperty('background-image', 'url(' + imageMovie + ')');


        // description + embed
        const embedDesc = document.createElement('div')
        embedDesc.classList.add('embedDesc');
        topDivContent.appendChild(embedDesc)

        // embed youtube
        let url = '<iframe src="https://www.youtube.com/embed/' + video.split("watch?v=")[1] + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

        // description

        const textDesc = document.createElement('div')
        textDesc.classList.add('textDesc');
        embedDesc.appendChild(textDesc)


        textDesc.innerHTML += '<h1 class="contentPosterH1" >' + name + '</h1>'
        textDesc.innerHTML += '<a class="category" >' + getCategoryByID(category) + '</a>'

        
        textDesc.innerHTML += '<h2 class="contentPosterH2" >' + author + '</h2>'
        textDesc.innerHTML += '<p class="contentPosterP" >' + description + '</p>'

        embedDesc.innerHTML += url

        // bottom part
        const bottomPart = document.createElement('div')
        bottomPart.classList.add('bottomPart');
        topDivContent.appendChild(bottomPart)

        // likes part
        const likesPart = document.createElement('div')
        likesPart.classList.add('likesPart');
        bottomPart.appendChild(likesPart)

        // likes and dislikes      
        const likesDislikes = document.createElement('div')
        likesDislikes.classList.add('likesDislikes');
        likesPart.appendChild(likesDislikes)


        // likes

        likesDislikes.innerHTML += '<div class="likeLogo" onclick="addLike(event)"><p class="contentPosterLikes" >' + likes + '</p></div>'
        likesDislikes.innerHTML += '<div class="dislikeLogo" onclick="addDislike(event)"><p class="contentPosterDislikes" >' + dislikes + '</p></div>'

        if (clickedOn === "like"){
            document.querySelector('.likeLogo').style.filter = "none"
        }else if (clickedOn === "dislike"){
            document.querySelector('.dislikeLogo').style.filter = "none"
        }

        // ratio

        likesPart.innerHTML += '<div class="gauge"></div>'

        let gauge = document.querySelector(".gauge")
        gauge.innerHTML = '<div class="gaugeContent"></div>'
        let gaugeContent = document.querySelector(".gaugeContent")


        gaugeContent.style.setProperty('width', ((likes / (dislikes + likes)) * 200) + 'px');


        // image

        // bottomPart.innerHTML += '<img class="imageBottomDesc" src="'+ imageMovie +'">'


        // scroll
        document.getElementsByTagName("body")[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (e.target.classList[0] != "parametres"){
        if (document.querySelector(".show") != null){
            document.querySelector(".show").className = "hide"
        }
        
    }
    
})


document.querySelector('#searchInput').addEventListener('keyup', () => {
    search()
})

document.querySelector('.newMovie').addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target === document.querySelector('.newMovie')){
        e.target.style.display = 'none'
        document.querySelector("#categoryNoSel").selected = "selected"
    }
})




init()
