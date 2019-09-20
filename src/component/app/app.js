import React, {Component} from 'react';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

class App extends Component {
    max = 1;
    state = {
        todoData: [
            this.createTodoItem('Go to school'),
            this.createTodoItem('Drive  car'),
            this.createTodoItem('Drink a beer'),
            this.createTodoItem('Go to eat'),
            this.createTodoItem('Go to sleep')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label: label,
            id: this.max++,
            important: false,
            done: false
        }
    }


    addItemForm = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem];
            return {todoData: newArr}
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        let oldItem = arr[idx];
        let newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {todoData: this.toggleProperty(todoData, id, 'important')}
        });
        console.log(' on important', id)
    };
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {todoData: this.toggleProperty(todoData, id, 'done')}
        });
        console.log(' on done', id)
    };

    deletItem(id) {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            todoData.splice(idx, 1);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx);
            const newArray = [...before, ...after];
            return {todoData: newArray}
        });
        console.log('on deleted', id)
    };

    searchOnChange(term) {
        this.setState({term})
    }

    search(items, term) {
        return items.filter((item) => {
            return item.label.includes(term);
        })
    }
    onFilterChange = (name) => {
        this.setState({filter:name})
    };
     filter (items, filter){
         switch (filter){
             case 'all': return items;
             case 'active': return items.filter((item)=> !item.done);
             case 'done': return items.filter((item)=>item.done);
             default:
                 return items
         }
     }

    render() {
        const {todoData, term, filter} = this.state;
        const doneTrue = todoData.filter((el) => el.done).length;
        console.log(doneTrue);
        const todoTrue = todoData.length - doneTrue;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        console.log(visibleItems);
        return (
            <div className="todo-app">
                <AppHeader toDo={todoTrue} done={doneTrue}/>
                <div className="top-panel d-flex">
                    <SearchPanel searchTerm={this.searchOnChange.bind(this)}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange = {this.onFilterChange}
                    />
                </div>
                <TodoList todos={visibleItems}
                          onAppDeleted={this.deletItem.bind(this)}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}
                />
                <ItemAddForm addItem={this.addItemForm}/>
            </div>
        )
    }
}

export default App;