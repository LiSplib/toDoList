const $postsList = document.getElementById('postsList');

function updateView(){
    fetch('http://localhost:3000/api/v1/todos/?limit=300', {
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
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${toDo.title}</h5>
                    <p>Date de création du ToDO ${new Date(toDo.createdAt).toLocaleString()}</p>
                    <p class="card-text">${toDo.id}</p>

                    <div >
                        <input dataCheck-id="${toDo.id}" type="checkbox" status="${toDo.done}" value="" id="defaultCheck${toDo.id}">
                        <label for="defaultCheck${toDo.id}">
                            Fait 
                        </label>
                    </div>
                    <button type="button" class="btn btn-primary" dataDetail-id="${toDo.id}" data-toggle="modal" data-target="#exampleModal${toDo.id}">Détails</button>
                    <button type="button" class="btn btn-warning" dataUpdate-id="${toDo.id}" data-toggle="modal" data-target="#updateModal${toDo.id}">Modifier</button>
                    <button type="button" class="btn btn-danger" dataDelete-id="${toDo.id}">Effacer</button>
                    
                </div>
            </div>
            <div class="modal fade" id="exampleModal${toDo.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel${toDo.id}" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel${toDo.id}">${toDo.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                            <p class="card-text">${toDo.content}</p>
                            <p class="card-text">${toDo.id}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button type="button" class="btn btn-warning" dataUpdate-id="${toDo.id}">Modifier</button>
                            <button type="button" class="btn btn-danger" dataDelete-id="${toDo.id}">Effacer</button>
                        </div>
                    </div>
                </div>
            </div>

            
            <div class="modal fade" id="updateModal${toDo.id}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel${toDo.id}" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel${toDo.id}">Édition du ToDo ${toDo.id}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">${toDo.title}</label>
                            <input type="text" class="form-control" id="exampleInputUpdateToDo${toDo.id}" name="titleUpdate" aria-describedby="TitleToDo" placeholder="Titre a modifier">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputUpdateContent${toDo.id}">${toDo.content}</label>
                            <input type="text" class="form-control" id="contentUpdate${toDo.id}" name="contentUpdate" placeholder="Contenu a modidier">
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

const $createToDo = document.getElementById('toDo');

$createToDo.addEventListener('click', ev => { 
    let $titleToDo = document.getElementById('titleField').value;
    let $contentToDo = document.getElementById('contentField').value;
    const data = {'title' : $titleToDo, 'content' : $contentToDo};
    createToDo(data)
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
//updateView(data);




document.addEventListener('click', function (e) {
    const $target = e.target;
    
    if ($target.hasAttribute("dataDelete-id")) {
        e.preventDefault();
        e.stopPropagation();
      const $id = Number($target.getAttribute("dataDelete-id"));
        deleteToDo($id);
        // updateToDo($id);
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
    // let status = $target.getAttribute('value');
    if ($target.hasAttribute("dataCheck-id") && status == "" || status == "checked") {
      let $id = Number($target.getAttribute('dataCheck-id'));
      let updateCheckData = {'done' : true};
      $target.setAttribute("value", "checked");

      updateCheckToDo($id, updateCheckData);
    }else{
        updateCheckData = {'done' : false};
        $target.setAttribute("value", "");
        updateCheckToDo($id, updateCheckData);
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


updateView();