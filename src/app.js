import {mapListToDOMElements} from './DOMInteractions.js';

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
    }
}

document.addEventListener('DOMContentLoaded', new TvApp());