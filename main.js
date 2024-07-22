import { download } from './depend/dist/util/file.js';
import { Numberline } from './classNumberlineAttempt.js';

window.onload = function() {
let newSvgElement = new Numberline();
newSvgElement.main();
}

// add a save function to the window to save the current interactive
window.save = function() {
let interactives = document.getElementsByClassName('interactive');
for( let i = 0; i < interactives.length; i++ ) {
    let name = interactives[i].parentElement.id;
    let id = interactives[i].id;
    download(id, `${name}.svg`);
}
}