import { Abstractview } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { CardList } from "../../components/card-list/card-list";
 
export class FavouritesView extends Abstractview {

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this)); //onChange подписка на изменение
        this.setTitle('My favourites');
    }

    destroy() {
        onChange.unsubscribe(this.appState); //отписка от изменений
    }

    appStateHook(path){
        if(path === 'favourites') {
            this.render();
        }

    }

    
    render() {
        const main = document.createElement('div');
        main.innerHTML = `
            <h1>Favourites</h1>`;
        main.append(new CardList(this.appState, { list: this.appState.favourites }).render()); //встраивание компонента CardList
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

}