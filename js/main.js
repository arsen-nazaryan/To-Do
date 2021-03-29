let root = document.getElementById('root');

function TodoForm(add) {
    let container = document.createElement('form');
    container.innerHTML = `
        <input type='text' placeholder='What needs to be done?' required autofocus/>
        <button>Add</button>
    `;

    container.addEventListener("submit", (e) => {
        e.preventDefault();
        let value = container.querySelector('input').value;
        add(value);
    });

    return container;
}

function ListItem(todo, onChange) {
    let container = document.createElement('div');

    container.innerHTML = `
    <label>
        <input type="checkbox" ${todo.completed ? 'checked' : ''} /> ${todo.label}
        <span class="checkmark"></span>
    </label>
    `;

    let input = container.querySelector('input');
    input.addEventListener('change', (e) => {
        onChange(e.target.checked);
    })

    return container;
}

function List(todos, onChange) {
    let container = document.createElement('section');

    todos.map(todo => {
        return ListItem(todo, (change) => {
            todo.completed = change;
            onChange();
        });
    }).forEach(el => {
        container.appendChild(el)
    })

    return container;
}

function TodoFooter(todos, onChange) {
    let container = document.createElement('footer');

    let completed = todos.filter(todo => todo.completed === true).length;

    container.innerHTML = `
        <span>${completed} / ${todos.length} Completed</span>
        <button>Clear Completed</button>
    `;

    let btn = container.querySelector('button');
    btn.addEventListener('click', () => {
        onChange(todos.filter((todo) => todo.completed === false))
    });

    return container;
}

function App() {

    let todos = [
        {
            label: 'Learn HTML(5)',
            completed: true
        },
        {
            label: 'Learn CSS(3)',
            completed: true
        },
        {
            label: 'Learn JavaScript',
            completed: true
        },
        {
            label: 'Learn ReactJS',
            completed: false
        }
    ];

    let container = document.createElement('div');

    function remder() {
        container.innerHTML = '';
        container.appendChild(TodoForm(function (newText) {
            todos.push({
                label: newText,
                completed: false
            });
            remder();
        }));
        container.appendChild(List(todos, () => {
            remder();
        }));
        container.appendChild(TodoFooter(todos, (newTodos) => {
            todos = newTodos;
            remder();
        }));
    }

    remder();

    return container;
}

root.appendChild(App());