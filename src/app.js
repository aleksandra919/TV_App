import { mapListToDOMElements, createDOMElem } from './DOMInteractions.js';
import { getShowsByKey } from './requests.js'

class TvApp {
    constructor() {
        this.viewElems = {};
        this.showNamesButtons = {};
        this.selectedName = 'harry';
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectToDOMElements();
        this.setupListeners();
    }

    connectToDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName);

        this.viewElems = mapListToDOMElements(listOfIds, 'id');
        this.showNamesButtons = mapListToDOMElements(listOfShowNames, 'data-show-name');
    }

    setupListeners = () => {
        Object.keys(this.showNamesButtons).forEach(showName => {
            this.showNamesButtons[showName].addEventListener('click', this.setCurrentNameFilter);
        });
    }

    setCurrentNameFilter = (event) => {
        this.selectedName = event.target.dataset.showName;
        this.fetchAndDisplayShows();
    }

    fetchAndDisplayShows = () => {
        getShowsByKey(this.selectedName).then(shows => this.renderCards(shows))
    }

    renderCards = (shows) => {
        for ( const {show} of shows) this.createShowCard(show) 
    }

    createShowCard = (show) => {
        const divCard =  createDOMElem('div', 'card');
        const img =  createDOMElem('img', 'card-img-top', null,  show.image.medium);
        const divCardBody =  createDOMElem('div', 'card-body');
        const h5 =  createDOMElem('h5', 'card-title', show.name);
        const p =  createDOMElem('p', 'card-text', show.summary);
        const button =  createDOMElem('button', 'btn btn-primary', 'Show details');

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(button);
        
        this.viewElems.showsWrapper.appendChild(divCard);

    }

}

document.addEventListener('DOMContentLoaded', new TvApp());