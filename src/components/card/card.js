import { DivComponent } from "../../common/div-component";

import './card.css';

export class Card  extends DivComponent {
    constructor(appState,  cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #addToFavourites() {
        this.appState.favourites.push(this.cardState);
        this.render(); // перерисовка карточки 
    }

    #deleteFromFavourites() {
        this.appState.favourites = this.appState.favourites.filter(
            b => b.key !== this.cardState.key
        );
        this.render();; // перерисовка карточки 
    }


    render(){
        
        this.el.classList.add('card');
        const existInFavourites = this.appState.favourites.find(
            b => b.key == this.cardState.key
        );
        this.el.innerHTML = `
            <div class ="card__image">
                <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Cover" />
            </div>
            <div class="card__info">
                <div class="card__tag">
                    ${this.cardState.subject ? this.cardState.subject[0] : 'The value is not set'}
                </div>
                <div class="card__name">
                    ${this.cardState.title}
                </div>
                <div class="card__author">
                    ${this.cardState.author_name ? this.cardState.author_name[0] : 'The value is not set'}
                </div>
                <div class="card__footer">
                    <button class="button_add ${existInFavourites ? 'button__active' : ''}">
                        ${existInFavourites 
                            ? '<img src="/static/favourites.svg" />'
                            : '<img src="/static/favourites-white.svg" />'}
                    </button>
                </div>
            </div>

        `;

        if(existInFavourites){
            this.el
                .querySelector('button')
                .addEventListener('click', this.#deleteFromFavourites.bind(this));
        } else {
            this.el
                .querySelector('button')
                .addEventListener('click', this.#addToFavourites.bind(this));
        }
        return this.el;

    }

}