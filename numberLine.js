/**
* @title SVG Line
* @description This interactive demonstrates the SVG line element and its attributes.
* @date May 3, 2019
* @author Kurt Bruns
* @tags [svg]
*/

// Import necessary modules
import { Interactive, getScriptName } from './vector-js/source/index.ts';

let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 1000;
interactive.height = 500;

class Numberline {
    constructor(line_start_X, line_start_Y, unit_size, number_Labels, boundless_line, start_label, end_label) {
        this.line_start_X = line_start_X;
        this.line_start_Y = line_start_Y;
        this.unit_size = unit_size;
        this.number_Labels = number_Labels;
        this.boundless_line = boundless_line;
        this.start_label = start_label;
        this.end_label = end_label;

        this.line_length = (this.end_label - this.start_label) * this.unit_size;
        this.number_labels_array = [];

        this.line = interactive.line(0, 0, 0, 0);
        this.start_line = interactive.line(0, 0, 0, 0);
        this.end_line = interactive.line(0, 0, 0, 0);
        this.control_point = interactive.control(this.line_start_X + this.line_length, this.line_start_Y);

        this.initialize();
    }

    initialize() {
        this.line.update = () => {
            this.line.x1 = this.line_start_X;
            this.line.y1 = this.line_start_Y;
            this.line.x2 = this.control_point.x;
            this.line.y2 = this.line_start_Y;
        };

        this.start_line.update = () => {
            this.start_line.x1 = this.line_start_X;
            this.start_line.y1 = this.line_start_Y - 5;
            this.start_line.x2 = this.line_start_X;
            this.start_line.y2 = this.line_start_Y + 5;
        };

        this.end_line.update = () => {
            this.end_line.x1 = this.control_point.x;
            this.end_line.y1 = this.line_start_Y - 5;
            this.end_line.x2 = this.control_point.x;
            this.end_line.y2 = this.line_start_Y + 5;
        };

        this.line.addDependency(this.control_point);

        if (this.number_Labels) {
            this.setLabels(this.start_label, this.end_label);
        } else {
            this.clearLabels();
        }

        this.updateInteractiveSize(500, 1000);
        this.updateLines();
    }

    setLabels(start_label, end_label) {
        this.start_label = start_label;
        this.end_label = end_label;

        this.clearLabels();

        for (let i = this.start_label; i <= this.end_label; i++) {
            let x = this.line_start_X + (i - this.start_label) * this.unit_size;
            let num_label = interactive.text(x, this.line_start_Y + 25, i);
            num_label.style.textAnchor = 'middle';
            num_label.alignmentBaseline = 'middle';
            this.number_labels_array.push(num_label);
        }
    }

    clearLabels() {
        this.number_labels_array.forEach(label => interactive.removeChild(label));
        this.number_labels_array = [];
    }

    updateInteractiveSize(height, width) {
        interactive.width = width;
        interactive.height = height;
    }

    updateLines() {
        this.line.update();
        this.start_line.update();
        this.end_line.update();
    }
}

const numberline = new Numberline(150, 150, 10, true, true, 5, 20);

let text = interactive.text(25, interactive.height - 25, "");
text.update = function () {
    let tag = `<tspan style="fill:purple">line</tspan>`;
    let x1 = `<tspan style="fill:#ab6f00">x1</tspan>`;
    let y1 = `<tspan style="fill:#ab6f00">y1</tspan>`;
    let x2 = `<tspan style="fill:#ab6f00">x2</tspan>`;
    let y2 = `<tspan style="fill:#ab6f00">y2</tspan>`;
    this.contents = `&lt;${tag} ${x1}="${numberline.line.x1.toFixed(0)}"
                              ${y1}="${numberline.line.y1.toFixed(0)}"
                              ${x2}="${numberline.line.x2.toFixed(0)}"
                              ${y2}="${numberline.line.y2.toFixed(0)}"&gt`;
};
text.update();
text.addDependency(numberline.line);
