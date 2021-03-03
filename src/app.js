import { mapListToDOMElements, createDOMElem } from './DOMInteractions.js';
import { getShowsByKey, getShowsById } from './requests.js'

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
        getShowsByKey(this.selectedName).then(shows => this.renderCardsOnList(shows));
    }

    renderCardsOnList = (shows) => {
        Array.from(document.querySelectorAll('[data-show-id]')).forEach(btn => btn.removeEventListener('click', this.openShowDetails));
        this.viewElems.showsWrapper.innerHTML = '';
        for ( const {show} of shows) {
            const card = this.createShowCard(show, false);
            this.viewElems.showsWrapper.appendChild(card);
        }
    }

    openShowDetails = event => {
        const { showId } = event.target.dataset
        console.log('showId',showId)
        getShowsById(showId).then(show => {
            console.log('show', show)
            const card = this.createShowCard(show, true);
            this.viewElems.showPreview.appendChild(card);
            this.viewElems.showPreview.style.display = 'block';
        })
    }

    closeShowDetails = (event) => {
        const { showId } = event.target.dataset
        const closeBtn =  document.querySelector(`[data-show-id = "${showId}"]`)
        closeBtn.removeEventListener('click', this.closeShowDetail);
        this.viewElems.showPreview.style.display = 'none';
        this.viewElems.showPreview.innerHTML = '';
    }

    createShowCard = (show, isDetailed) => {
        const divCard =  createDOMElem('div', 'card');
        const divCardBody =  createDOMElem('div', 'card-body');
        const h5 =  createDOMElem('h5', 'card-title', show.name);
        const button =  createDOMElem('button', 'btn btn-primary', isDetailed? 'Close': 'Show details');
        let img;
        let p;
        
        if(show.image) {
           if (isDetailed) {
               img = createDOMElem('div', 'card-preview-bg');
               img.style.backgroundImage = `url('${show.image.original}')`;
            } else {
               img =  createDOMElem('img', 'card-img-top', null, show.image.medium) 
            }
        } else {
            img =  createDOMElem('img', 'card-img-top', null,  'https://via.placeholder.com/210/295');
        }

        show.summary ?  p = createDOMElem('p', 'card-text', `${isDetailed ? show.summary: show.summary.slice(0,80)}...`): p = createDOMElem('p', 'card-text', 'There is no summary for this show yet.');
        button.dataset.showId = show.id

        isDetailed ? button.addEventListener('click', this.closeShowDetails) : button.addEventListener('click', this.openShowDetails)
        
        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(button);

        return divCard
    }
}

document.addEventListener('DOMContentLoaded', new TvApp());