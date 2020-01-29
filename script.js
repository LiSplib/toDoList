const $postsList = document.getElementById('postsList');



function updateView(){
    fetch('http://localhost:3000/api/v1/todos/')    
    .then(res => res.json())
    .then(data => listToDos(data))
    .catch(err => handleError(err));
}

function handleError(err){
    console.error(err);
}     

function listToDos(toDo){
    let html = "";
    html += readToDoPosts(toDo);
    $postsList.innerHTML = html;
}

function readToDoPosts(data){
    for(let toDo of data){
        return `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${toDo.title}</h5>
                    <span>${toDo.done}</span>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Détails</button>
                    <button type="button" class="btn btn-warning">Modifier</button>
                    <button type="button" class="btn btn-danger">Effacer</button>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${toDo.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                     <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                            <p class="card-text">${toDo.content}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            <button type="button" class="btn btn-warning">Modifier</button>
                            <button type="button" class="btn btn-danger">Effacer</button>
                        </div>
                    </div>
                </div>
            </div>
`; 
    }
}  



updateView();
