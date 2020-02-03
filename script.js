const $postsList = document.getElementById('postsList');
const removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

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
        e.preventDefault();
        e.stopPropagation();
        if($target.checked) {
            let $id = Number($target.getAttribute('dataCheck-id'));
            let updateCheckData = {'done' : true};
            let addBorder = document.getElementById(`addBorder${$id}`);
            addBorder.classList.add('bg-success');
            updateCheckToDo($id, updateCheckData);

        }else {
            $id = Number($target.getAttribute('dataCheck-id'));
            updateCheckData = {'done' : false};
            // $target.setAttribute("value", "");
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

fetch('http://localhost:3000/api/v1/todos/count'){
    
}

let $page = 0;
let nPerPage = 3;
let minPage = 0;
let maxPage = 

$pageIncrease = document.getElementById('pageIncrease');
$pageDecrease = document.getElementById('pageDecrease');

$pageIncrease.addEventListener('click', increaseToDo);
$pageDecrease.addEventListener('click', decreaseToDo);

function increaseToDo(){
    $page++;
    updateLoadView($page);
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