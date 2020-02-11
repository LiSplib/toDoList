const $postsList = document.getElementById('postsList');

function updateView(){
    fetch('http://localhost:3000/api/v1/todos/?limit=3&offset=0', {
        method: 'GET'
    })    
    .then(res => res.json())
    .then(data => readToDoPosts(data))
    .catch(err => handleError(err));
}

function handleError(err){
    console.error(err);
}     


function readToDoPosts(data){
    let html = "";
    for(let toDo of data){
                     
        html +=`
            <div class="card my-2 rounded" id="addBorder${toDo.id}">
                <div class="card-body">
                    <p>ToDO n° ${toDo.id} </p>
                    <p class="text-right">Date de création: ${new Date(toDo.createdAt).toLocaleDateString()}</p>
                    <h4 class="card-title bg-info" data-toggle="modal" data-target="#exampleModal${toDo.id}">${toDo.title}</h4>
                    <div class="text-left">
                        <input dataCheck-id="${toDo.id}" type="checkbox" value="" id="defaultCheck${toDo.id}" ${stateCheckBox(toDo.done)}>
                        <label for="defaultCheck${toDo.id}">
                            Fait 
                        </label>
                    </div>
                    <button type="button" class="btn btn-primary" dataDetail-id="${toDo.id}" data-toggle="modal" data-target="#exampleModal${toDo.id}">Détails</button>
                    <button type="button" class="btn btn-warning" dataUpdate-id="${toDo.id}" data-toggle="modal" data-target="#updateModal${toDo.id}">Modifier</button>
                    <button type="button" class="btn btn-danger" dataDelete-id="${toDo.id}">Effacer</button>
                    
                </div>
            </div>
            
    <!-- Modal Ouvert-->

           <div class="modal fade" id="exampleModal${toDo.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel${toDo.id}" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title bg-info" id="exampleModalLabel${toDo.id}">${toDo.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                            <p class="card-text">${toDo.content}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                           <!-- <button type="button" class="btn btn-warning" dataUpdate-id="${toDo.id}">Modifier</button>
                            <button type="button" class="btn btn-danger" dataDelete-id="${toDo.id}">Effacer</button> -->
                        </div>
                    </div>
                </div>
            </div>

    <!-- Modal de modification -->
            
            <div class="modal fade" id="updateModal${toDo.id}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel${toDo.id}" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header align-center">
                        <h5 class="modal-title" id="updateModalLabel${toDo.id}">Édition du ToDo n°${toDo.id}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">Titre a modifier</label>
                            <input type="text" class="form-control" id="exampleInputUpdateToDo${toDo.id}" name="titleUpdate" aria-describedby="TitleToDo" placeholder="${toDo.title}">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputUpdateContent${toDo.id}">Contenu a modidier</label>
                            <input type="text" class="form-control" id="contentUpdate${toDo.id}" name="contentUpdate" placeholder="${toDo.content}">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-warning" dataUpdate-id="${toDo.id}">Modifier</button>
                    </div>
                </div>
            </div>
        </div>
`;  
}
$postsList.innerHTML = html;
}  

//Récupère le bouton d'envoi et les contenus des inputs.

const $createToDo = document.getElementById('toDoAdd');

$createToDo.addEventListener('click', ev => { 
    let $titleToDo = document.getElementById('titleField');
    let $contentToDo = document.getElementById('contentField');
    const data = {'title' : $titleToDo.value, 'content' : $contentToDo.value};
    createToDo(data);
    $contentToDo.value = "";
    $titleToDo.value = "";
});

function createToDo(data){
    fetch('http://localhost:3000/api/v1/todos', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  

}

document.addEventListener('click', function (e) {
    const $target = e.target;

    if ($target.hasAttribute("dataDelete-id")) {
        e.preventDefault();
        e.stopPropagation();
        const $id = Number($target.getAttribute("dataDelete-id"));
        deleteToDo($id);
    }
});

function deleteToDo($id){
    fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => readToDoPosts(data))
    .catch(err => handleError(err));


}

document.addEventListener('click', function (e) {
    const $target = e.target;

    if ($target.hasAttribute("dataUpdate-id")) {
        e.preventDefault();
        e.stopPropagation();
        let $id = Number($target.getAttribute("dataUpdate-id"));
        let $titleUpdateToDo = document.getElementById(`exampleInputUpdateToDo${$id}`).value;
        let $contentUpdateToDo = document.getElementById(`contentUpdate${$id}`).value;
        const updateData = {'title' : $titleUpdateToDo, 'content' : $contentUpdateToDo};
        updateToDo($id, updateData);
    }
});

function updateToDo($id, updateData){
    fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

document.addEventListener('click', function (e) {
    const $target = e.target;
    
    if ($target.hasAttribute("dataCheck-id")){
        // e.preventDefault();
        let $id = Number($target.getAttribute('dataCheck-id'));
        let addBorder = document.getElementById(`addBorder${$id}`);
        e.stopPropagation();
        if($target.checked) {
            let updateCheckData = {'done' : true};
            // let addBorder = document.getElementById(`addBorder${$id}`);
            addBorder.classList.toggle('bg-success', true);
            updateCheckToDo($id, updateCheckData);

        }else {
            // $id = Number($target.getAttribute('dataCheck-id'));
            updateCheckData = {'done' : false};
            // $target.setAttribute("value", "");

            addBorder.classList.toggle('bg-success', false);
            updateCheckToDo($id, updateCheckData);
        }
    }
});

function updateCheckToDo($id, updateCheckData){
    fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateCheckData),
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);

    })
    .catch((error) => {
        console.error('Error:', error);
    });


}

const stateCheckBox = (state) => {
    if (state) {
        return "checked";
    } else {
        return "";
    }
}

const count = fetch('http://localhost:3000/api/v1/todos/count')
    .then(res => res.json())
    .then(count => count)
    .catch(err => handleError(err));


let $page = 0;
let nPerPage = 3;
let minPage = 0;
let maxPage = count.value / nPerPage;

$pageIncrease = document.getElementById('pageIncrease');
$pageDecrease = document.getElementById('pageDecrease');

$pageIncrease.addEventListener('click', increaseToDo);
$pageDecrease.addEventListener('click', decreaseToDo);


function increaseToDo(){
    $page++;
    updateLoadView($page);

    // if(maxPage < $page*nPerPage){
    //     // if (maxPage == $page*nPerPage){
    //     //     let currentPAges = document.getElementById('increase');
    //     //     currentPAges.classList.add('disabled');
    //     // }

    // }
};

function decreaseToDo(){
    $page--;
    if(($page*nPerPage) == 0){
        let currentPAge = document.getElementById('decrease');
        currentPAge.classList.add('disabled');
        minPage;
    }
    updateLoadView($page);
}


function updateLoadView($page){
    fetch(`http://localhost:3000/api/v1/todos/?limit=${nPerPage}&offset=${$page*nPerPage}`, {
        method: 'GET'
    })    
    .then(res => res.json())
    .then(data => readToDoPosts(data))
    .catch(err => handleError(err));
}

updateView();