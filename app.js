
function send1(){
    let emailLeft = document.querySelector('.answer_email-left');
    let emeailRight = document.querySelector('.answer_emeail-right');
    let email = document.querySelector('.email');
    
    email.value=document.querySelector('.email').value;
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let address = email.value;  
    if(reg.test(address) == true) {
        return true;
     } 
    
        
     else {
        email.style.borderColor = 'red';
        emailLeft.style.borderColor = 'red';
        emailLeft.style.color = 'red';
        emailLeft.style.borderBottom = '1px solid red';
        return false;
        
    }
    
  }
   
  function send2(){
    let pass = document.querySelector('.password');
    let passRight = document.querySelector('.answer_pass-right');
   
    
    
    // перевірка password
    if(pass.value.length >= 8 && pass.value.length <= 12){
      return true;
      
    }  
    else{
        pass.style.borderColor = 'red';
        passRight.style.color = 'red';
        passRight.style.borderBottom = '1px solid red';

        function reload() {
            location.reload()  
        }
        setTimeout(reload, 5000);
    }
    return false;
}

document.querySelector('.btn_login').onclick = function(){
    send1();
    send2();
    let a = send1();
    let b = send2();
    // console.log(a,b);
    if(a === true && b === true){
        document.querySelector('.warn').style.display ='none';
        document.querySelector('.login').style.display ='block';
    }
    };


const data = document.querySelector('.date_todo')
const importance = document.querySelector('.importance_todo')
const todoText = document.querySelector('.todo-text')
const addTaskBtn = document.querySelector('.btn_todo')
const wrapper = document.querySelector('.todo-wrapper')
const edit = document.querySelector('.btn__edit')
const modalEldit = document.querySelector('.modal-edit')
const todoII = document.querySelector('.todo_item')

 
document.querySelector('#elastic').oninput = function(){
    let val = this.value.trim() // обрезаю пробелы
    let elasticItem = document.querySelectorAll('.todo_item .description .item li') // 
    
        if (val != ''){ // если поиск не равен пустой строке то вперед
            elasticItem.forEach(function(elem){ // пробегаю по всем лишкам
                if(elem.innerText.search(val) == -1){ // ищу подстроку в строке
                    elem.classList.add('hide')
                    
                }
                else{
                    elem.classList.remove('hide')
                }
            });
        }
    else{
        elasticItem.forEach(function(elem){
        elem.classList.remove('hide')
        });
    }
   
    
} 

// работа с тоду листом

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description){
    this.description = description;
    this.complited = false;
}

// рисую разметку каждого item

const createTemplate = (task, index) => {
    return `
    <div class="todo_item ${task.complited ? 'checked': ''}">
    <div class="description">
        <ul class="item">
            <li class="date">${task.description[0]}</li>
            <li class="imp">${task.description[1]}</li>
            <li class="text-item">${task.description[2]}</li>
        </ul>   
    </div>
    <div class="buttons">
        <input onclick="complitedTask(${index})" type="checkbox" class="btn__complete  ${task.complited ? 'checked': ''}">
        <button onclick="delliteTask(${index})" class="btn__dell">Delete</button>
        <button onclick="ediTask(${index})" class="btn__edit">Edit</button>
    </div>
    
</div>
    `
}



 
const filterTask = () =>{
    const activeTask = tasks.length && tasks.filter(item => item.complited == false )
    const complitedTask = tasks.length && tasks.filter(item => item.complited == true )
    tasks = [...activeTask,...complitedTask]
}

const fillHtmlList = () => {
    wrapper.innerHTML = "";
    if(tasks.length > 0) {
        filterTask()
        tasks.forEach((item, index) => {
            wrapper.innerHTML += createTemplate(item, index)
        })
        todoItemElems = document.querySelectorAll('.todo_item')
    }
}
fillHtmlList();


const updareLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// выполненые таски 

const complitedTask = index => {  
tasks[index].complited = !tasks[index].complited
if(tasks[index].complited){
    todoItemElems[index].classList.add('.checked')
}
else{todoItemElems[index].classList.remove('.checked')}
updareLocalStorage();
fillHtmlList();
}

//  добавляю таски на страницу по нажатию кнопки

addTaskBtn.addEventListener('click', () =>{
let values = [data.value, importance.value, todoText.value]
tasks.push(new Task(values))
updareLocalStorage();
fillHtmlList();
todoText.value = '';
})

// удаление таска

const delliteTask = index => {
    document.getElementById('modfl-delete').style.display = 'block';
    document.querySelector('.yes').onclick = () =>{
        todoItemElems[index].classList.add('.dell')
            setTimeout(() => {
                 tasks.splice(index, 1)
                 updareLocalStorage();
             fillHtmlList();
             document.getElementById('modfl-delete').style.display = 'none';
            }, 500);
    }  
}
    document.querySelector('.no').onclick = () =>{
    document.getElementById('modfl-delete').style.display = 'none';
}

// работа с модальным окном изменения текста

    const ediTask = index => {
    document.getElementById('modal-edit').style.display = 'block';

    
    console.log(todoItemElems[index].childNodes[1].childNodes[1].childNodes[1]);
    document.querySelector('.save').onclick = function (){
        let a = todoItemElems[index].childNodes[1].childNodes[1].childNodes[5]
        let textarea = document.querySelector('.item_edit').value
        a.innerText = textarea 
        tasks.splice(index, 1, {description: ["", "1", textarea], complited: false})
        updareLocalStorage();
        fillHtmlList();
            document.getElementById('modal-edit').style.display = 'none';
    }
    
    let textarea = document.querySelector('.item_edit').value = '';
    document.querySelector('.cancel').onclick = function (){
        document.getElementById('modal-edit').style.display = 'none';
    } 
    
    }

    //  сортировка по важности таска 


    

    let buttonTypeUnimportant = document.querySelector('.button_type_unimportant')

    buttonTypeUnimportant.addEventListener('click', function(){
        buttonTypeUnimportant.classList.toggle('active')
        if(buttonTypeUnimportant.classList.contains('active')){
            tasks.forEach(item =>{
                item.description[1] = +item.description[1]
            })
            tasks.sort((a, b) => a.description[1] < b.description[1] ? 1 : -1)
            console.log(tasks);
            updareLocalStorage();
            fillHtmlList();  
            
        }
        else{
            tasks.forEach(item =>{
                item.description[1] = +item.description[1]
            })
            tasks.sort((a, b) => a.description[1] > b.description[1] ? 1 : -1)
            console.log(tasks);
            updareLocalStorage();
            fillHtmlList();  
        }
        
    } )


    // сортировка по дате

    let buttonTypeDate = document.querySelector('.button_type_date')
    
    
    
    buttonTypeDate.addEventListener('click', function(){

        buttonTypeDate.classList.toggle('active1')
       
        if(buttonTypeDate.classList.contains('active1')){
            tasks.forEach(item =>{
                item.description[0] = item.description[0]
            })
            tasks.sort((a, b) => a.description[0] > b.description[0] ? 1 : -1)
            console.log(tasks);
            updareLocalStorage();
            fillHtmlList();
        }
        else{
            tasks.forEach(item =>{
                item.description[0] = item.description[0]
            })
            tasks.sort((a, b) => a.description[0] < b.description[0] ? 1 : -1)
            console.log(tasks);
            updareLocalStorage();
            fillHtmlList();
        }
          
    } )
