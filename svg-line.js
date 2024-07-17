/**
* @title SVG Line
* @description This interactive demonstrates the SVG line element and its attributes.
* @date May 3, 2019
* @author Kurt Bruns
* @tags [svg]
*/


//Create a function that creates this line
// be able to set the start point for the box and /or make box just screen size? -DONE
// be able to set the start spot for the line - DONE
// be able to set the end point on the line - DONE
// be able to have number labels on the line or not(bool)
// being able to draw beyond they bound or not. ( bool)
// fixation/  start point first 



import { Interactive, getScriptName } from '/index.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 1000;
interactive.height = 500;

let line = interactive.line(0, 0, 0, 0);
let start_line = interactive.line(0,0,0,0);
let end_line = interactive.line(0,0,0,0); 
line.classList.add('default');

let start_label = 1;
let end_label = 20;
let unit_size = 10; // in pixels


let num_label = interactive.text(150,150,"myText");
num_label.style.textAnchor = 'middle';
num_label.alignmentBaseline = 'middle';
num_label.contents = "1";

let text = interactive.text(25, interactive.height - 25, "");


let line_start_X = 0;
let line_start_Y = 0;
let line_length  = 0; 
let number_Labels = false;
let boundless_line = true;
let c2 = interactive.control(line_start_X+line_length, line_start_Y);


class Numberline{
    line_startX = 200;
    line_startY = 200;

    unit_size = 20; 
    line_length;
    number = true;
    boundless = true;

    constructor(x, y, len, numlab, bound){
        this.line_startX = x;
        this.line_startY = y;
        this.line_length = len;
        this.unit_size = 20; 

        this.number = numlab;
        this.boundless = bound;

    }
}


function createNumberLine(lineStartX,lineStartY,lineLength,numberLabels,boundless){

    line_start_X = lineStartX;
    line_start_Y = lineStartY;
    line_length = lineLength;
    number_Labels = numberLabels;
    boundless_line = boundless;

    c2.x =lineStartX+lineLength;
    c2.y = lineStartY;
    if(numberLabels)
    {
        num_label.x = lineStartX;
        num_label.y = lineStartY+25; 
        num_label.contents = start_label;
    }
    else
    {
        num_label.contents = "";
    }

}

function setInteractiveSize(height, width)
{
    interactive.width = width;
    interactive.height = height;
}

line.update = function () {
    this.x1 = line_start_X;
    this.y1 = line_start_Y; 
    this.x2 = c2.x;
    this.y2 = line_start_Y;
};

start_line.update = function () {
    this.x1 = line_start_X;
    this.y1 = line_start_Y - 5; 
    this.x2 = line_start_X; 
    this.y2 = line_start_Y +5;
};
end_line.update = function () {
    this.x1 = c2.x;
    this.y1 = line_start_Y - 5; 
    this.x2 = c2.x;
    this.y2 = line_start_Y +5; 
};

setInteractiveSize(500,1000);

const myNumberLine  = new Numberline(40, 150, 200, true, true);
createNumberLine(myNumberLine.line_startX, myNumberLine.line_startY,myNumberLine.line_length, myNumberLine.number, myNumberLine.boundless);

//createNumberLine(150,150,150,true, true);
line.update();
start_line.update();
end_line.update();

line.addDependency(c2);

// TODO: this is rather hacky, and probably best replaced by implementing the
// tspan element in our SVG wrapper class.
text.update = function () {
    let tag = `<tspan style="fill:purple">line</tspan>`;
    let x1 = `<tspan style="fill:#ab6f00">x1</tspan>`;
    let y1 = `<tspan style="fill:#ab6f00">y1</tspan>`;
    let x2 = `<tspan style="fill:#ab6f00">x2</tspan>`;
    let y2 = `<tspan style="fill:#ab6f00">y2</tspan>`;
    this.contents = `&lt;${tag} ${x1}="${line.x1.toFixed(0)}"
                              ${y1}="${line.y1.toFixed(0)}"
                              ${x2}="${line.x2.toFixed(0)}"
                              ${y2}="${line.y2.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(line);
//# sourceMappingURL=svg-line.js.map