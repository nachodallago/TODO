const convertir = JSON.stringify;
function getProjects() {
    const template = document.getElementById('template-lista')
    const lista_items = document.querySelector('#lista-proyectos');
    lista_items.innerHTML = '';

    if (localStorage.getItem("proyectos") == null) {
        return false;
    } else {
        var data = JSON.parse(localStorage.getItem("proyectos") || '[]');
        for (var i = 0; i < data.length; i++) {
            var completed = 0, total = 0, porcentaje = 0, tpl_detalles = template.querySelector('.detalles');
            template.querySelector('#titulo').innerHTML = data[i].titulo
            // template.querySelector('#titulo').setAttribute('href','#'+data[i].id)
            //template.querySelector('#titulo').setAttribute('aria-controls',data[i].id)
            template.querySelector('.item-borrar').setAttribute('id', data[i].id)

            for (var ii = 0; ii < data[i].lista.length; ii++) {
                total++;
                if (data[i].lista[ii].estado == 1) { var checked = ' checked'; completed++; } else { var checked = '' }
                tpl_detalles.innerHTML += '<label class="control control-checkbox" data-id="' + ii + '" data-dependence="'+i+'">' + data[i].lista[ii].title + '<input type="checkbox" ' + checked + '/><div class="control_indicator"></div></label>'
            }

            if (completed != 0 && total != 0) {
                porcentaje = completed / total * 100
            }
            
            template.querySelector('.item-porcentaje').innerHTML = porcentaje.toFixed(2) + '%';
            lista_items.innerHTML += template.innerHTML
            tpl_detalles.innerHTML = ''

            /* FIN RENDER */

            
        }

        /* BOTONES */
        /* CHECK */
        var itemsToDo = document.querySelectorAll('.item-proyecto .detalles label');
        for (var iii = 0; iii < itemsToDo.length; iii++) {
            itemsToDo[iii].addEventListener('click', function (e) {
                var itemlabelestado=data[this.getAttribute('data-dependence')]["lista"][this.getAttribute('data-id')].estado;
                if(itemlabelestado==0){
                    data[this.getAttribute('data-dependence')]["lista"][this.getAttribute('data-id')].estado=1;
                } else {
                    data[this.getAttribute('data-dependence')]["lista"][this.getAttribute('data-id')].estado=0;
                }
                localStorage.setItem('proyectos', convertir(data));
                getProjects()
                e.preventDefault()
            })
        }
        /* BORRAR */
        const lista_items_borrar = document.querySelectorAll('.item-borrar');
        for (var i = 0; i < data.length; i++) {
            lista_items_borrar[i].addEventListener('click', function (e) {
                console.log(this.getAttribute('id'))
                removeItem(this.getAttribute('id'))
                getProjects()
            })

        }

    }
}
function createProject(data) {
    if (localStorage.getItem("proyectos") == null) {
        data = [data]
        console.log('entri')
        localStorage.setItem("proyectos", convertir(data));
    } else {
        addItemLocalStorage(data)
    }
    const inputs_form = document.querySelectorAll('#nuevo input')

    for (var i = 0; i < inputs_form.length; i++) {
        inputs_form[i].value = ''
    }
}
function addItemLocalStorage(add_item, name = 'proyectos') {
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
function removeItem(id) {
    var items = JSON.parse(localStorage.getItem("proyectos")); // updated

    for (var i = 0; i < items.length; i++) {
        // var items = JSON.parse(items[i]);
        if (items[i].id == id) {
            items.splice(i, 1);
        }
    }

    items = JSON.stringify(items); //Restoring object left into items again

    localStorage.setItem("proyectos", items);
}

function eliminarItemlista(id) {
    var eliminar = document.getElementById("itemlista_" + id);
    eliminar.remove();
}