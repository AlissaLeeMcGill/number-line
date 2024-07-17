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


import { Interactive, getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 1000;
interactive.height = 500;

class Numberline{ 
    line_start_X = 150;
    line_start_Y = 150;

    unit_size = 10; 

    number_Labels = true;
    boundless_line = true;

    line = interactive.line(0, 0, 0, 0);

    start_line = interactive.line(0,0,0,0);
    end_line = interactive.line(0,0,0,0);

    start_label = 5; 
    end_label = 20;

    line_length = 0;

    number_labels_array = [];

    control_point = interactive.control(line_start_X+line_length, line_start_Y);

    constructor(line_start_X, line_start_Y,unit_size, number_Labels, boundless_line, start_label, end_label ){
        this.line_start_X = line_start_X;
        this.line_start_Y = line_start_Y;
        this.unit_size = unit_size;
        this.number_Labels = number_Labels;
        this.boundless_line = boundless_line;
        this.start_label = start_label;
        this.end_label = end_label;

        this.line_length= (this.end_label - this.start_label) * this. unit_size;

        this.control_point.x =this.line_start_X+lineLength;
        this.control_point.y = this.line_start_Y;
        if(this.number_Labels)
        {
            this.setLabels(this.start_label, this.end_label);
        }
        else
        {
           //TO DO - Make this actually clear out the numbers
            this.setLabels(this.start_label, this.end_label);
        }
        
    }
    setLineStart(line_start_X, line_start_Y){
        this.line_start_X = line_start_X;
        this.line_start_Y = line_start_Y;
    }
    setUnitSize(unit_size){
        this.unit_size = unit_size;
    }
    setLabels(start_label, end_label){
        this.start_label = start_label;
        this.end_label = end_label;

        for (let i = 0; i < this.end_label; i++){

            let num_label = interactive.text(this.line_start_X+(i*this.unit_size),this.lineStartY+25,i);
            num_label.style.textAnchor = 'middle';
            num_label.alignmentBaseline = 'middle';
            this.number_labels_array[i]=num_label;
        }
    }

}

numberline.line.classList.add('default');

let text = interactive.text(25, interactive.height - 25, "");


function setInteractiveSize(height, width)
{
    interactive.width = width;
    interactive.height = height;
}

numberline.line.update = function () {
    this.x1 = line_start_X;
    this.y1 = line_start_Y; 
    this.x2 = c2.x;
    this.y2 = line_start_Y;
};

numberline.start_line.update = function () {
    this.x1 = line_start_X;
    this.y1 = line_start_Y - 5; 
    this.x2 = line_start_X; 
    this.y2 = line_start_Y +5;
};
numberline.end_line.update = function () {
    this.x1 = c2.x;
    this.y1 = line_start_Y - 5; 
    this.x2 = c2.x;
    this.y2 = line_start_Y +5; 
};

setInteractiveSize(500,1000);

const numberline = new  Numberline(150, 150,10, true, true, 5, 20)

numberline.line.update();
numberline.start_line.update();
numberline.end_line.update();

numberline.line.addDependency(numberline.control_point);

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
text.addDependency(numnberline.line);
//# sourceMappingURL=svg-line.js.map