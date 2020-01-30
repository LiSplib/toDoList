const $postsList = document.getElementById('postsList');

function updateView(){
    fetch('http://localhost:3000/api/v1/todos/', {
        method: 'GET'
    })    
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
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            ${toDo.done}
                        </label>
                    </div>
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


//Récupère le bouton d'envoi et les contenus des inputs.

let $titleToDo = document.getElementById('titleField').value;
let $contentToDo = document.getElementById('contentField').value;
const data = {'title' : $titleToDo, 'content' : $contentToDo};
const $createToDo = document.getElementById('toDo');

$createToDo.addEventListener('click', ev => createToDo(data));

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
        console.log('Success:', result);
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
updateView(data);

$titleToDo = " ";
$contentToDo = " ";
