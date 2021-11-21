function getProjects(){
    const template = document.getElementById('template-lista')
    const lista_items = document.querySelector('#lista-proyectos');
    lista_items.innerHTML='';
    // if(typeof(localStorage.getItem("proyectos"))=='undefined'){
    if(localStorage.getItem("proyectos")==null){
        return false;
    } else {
        var data = JSON.parse(localStorage.getItem("proyectos") || '[]');
        // data.forEach(function (items) {
        for (var i = 0; i < data.length; i++) {
            template.querySelector('#titulo').innerHTML = data[i].titulo
            template.querySelector('.item-borrar').setAttribute('id',data[i].id)
            lista_items.innerHTML += template.innerHTML
        }

        const lista_items_borrar = document.querySelectorAll('.item-borrar');
        for (var i = 0; i < data.length; i++) {
            lista_items_borrar[i].addEventListener('click', function(e){
                console.log(this.getAttribute('id'))
                removeItem(this.getAttribute('id'))
                getProjects()
            })
        }

    }
}
const convertir = JSON.stringify;
function createProject(data){
    if(localStorage.getItem("proyectos")==null){
        data = [data]
        console.log('entri')
        localStorage.setItem("proyectos", convertir(data));
    } else {
        addItemLocalStorage(data)
    }
    const inputs_form = document.querySelectorAll('#nuevo input')

    for (var i = 0; i < inputs_form.length; i++) {
        inputs_form[i].value=''
    }
}
function addItemLocalStorage(add_item, name='proyectos') {
    // parse existing storage key or string representation of empty array
    var existingEntries = JSON.parse(localStorage.getItem(name) || '[]');
    console.log(add_item)
    // Add item if it's not already in the array, then store array again
    if (!existingEntries.includes(add_item)) {
        existingEntries.push(add_item);
        localStorage.setItem(name, JSON.stringify(existingEntries));
    } else {
        // or tell user it's already there
        console.log(add_item.id + ' already exists')
    }
}
function removeItem(id){
    var items = JSON.parse(localStorage.getItem("proyectos")); // updated

    for (var i =0; i< items.length; i++) {
        // var items = JSON.parse(items[i]);
        if (items[i].id == id) {
            items.splice(i, 1);
        }
    }

    items = JSON.stringify(items); //Restoring object left into items again

    localStorage.setItem("proyectos", items);
}