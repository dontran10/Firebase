
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-employee-form');


// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let age = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    age.textContent = doc.data().age;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(age);
    li.appendChild(cross);

    cafeList.appendChild(li);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('employees').doc(id).delete().then(rs => {
         
        });

    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var addRs = db.collection('employees').add({
        name: form.name.value,
        age: form.age.value
    }).then((rs) => {
        console.log('add result:', rs);
      
    })
    .catch(er => {
        console.log('Error while add:' , er)
    }
    );

    form.name.value = '';
    form.age.value = '';
})

db.collection('employees').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log('doc changes: ', changes);
    changes.forEach(change => {
        if(change.type == 'added')
        {
            renderCafe(change.doc);
        } else if(change.type == 'removed')
        {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }

    })
})