import { Abstractview } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";
 
export class MainView extends Abstractview {
    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0, //для пагинации
    }

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this)); //onChange подписка на изменение
        this.state = onChange(this.state, this.stateHook.bind(this)); //onChange подписка на изменение
        this.setTitle('Поиск книг');
    }

    destroy() {
        onChange.unsubscribe(this.appState); //отписка от изменений
        onChange.unsubscribe(this.state); //отписка от изменений

    }

    appStateHook(path){
        if(path === 'favourites') {
            this.render();
        }

    }

    async stateHook(path){
        if(path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
        }

        //подписка на изменения состояний
        if(path === 'list' || path === 'loading'){
            this.render();
        }
    }
    //offset уже ест для пагинации
    async loadList(q, offset){
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
        return res.json();
    }

    
    render() {
        const main = document.createElement('div');
        main.innerHTML = `
            <h1>Books found - ${this.state.numFound}</h1>`;
        main.append(new Search(this.state).render()); //встраивание компонента Search
        main.append(new CardList(this.appState, this.state).render()); //встраивание компонента CardList
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

}