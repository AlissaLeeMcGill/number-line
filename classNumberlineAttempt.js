/**
* @title Numberline
* @description Creating a custom numeber line application
* @date July 21
* @author Alissa
* @tags [svg]
*/


//Create a function that creates this line
// be able to set the start point for the box and /or make box just screen size? -DONE
// be able to set the start spot for the line - DONE
// be able to set the end point on the line - DONE
// be able to have number labels on the line or not(bool)
// being able to draw beyond they bound or not. ( bool)
// fixation/  start point first 


import { Interactive, getScriptName } from './index.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 1000;
interactive.height = 500;

export class Numberline { 
    //number
    line_start_X  = 150;
    line_start_Y = 150;
    unit_size = 10; 
    start_label = 5; 
    end_label = 20;
    line_length = 0;

    //boolean
    number_Labels = true;
    boundless_line = true;

    //line
    line = interactive.line(0, 0, 0, 0);
    start_line = interactive.line(0,0,0,0);
    end_line = interactive.line(0,0,0,0);

    //array
    number_labels_array = [];

    //control
    control_point = interactive.control(this.line_start_X + this.line_length, this.line_start_Y);

    constructor(line_start_X1, line_start_Y1, unit_size1, number_Labels1, boundless_line1, start_label1, end_label1 ){
        this.line_start_X = line_start_X1;
        this.line_start_Y = line_start_Y1;
        this.unit_size = unit_size1;
        this.number_Labels = number_Labels1;
        this.boundless_line = boundless_line1;
        this.start_label = start_label1;
        this.end_label = end_label1;

        this.line_length = (this.end_label - this.start_label) * this.unit_size;
        console.log("line_length",this.line_length);

        this.control_point.x = this.line_start_X + this.line_length;
        this.control_point.y = this.line_start_Y;

        if(this.number_Labels) {
            this.setLabels(this.start_label, this.end_label);
        } else {
           //TO DO - Make this actually clear out the numbers
            //this.setLabels(this.start_label, this.end_label);
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
 
        if (this.number_Labels) {
            for (let i = 0; i <= (this.end_label-this.start_label); i++){
                let line_marker = interactive.line(this.line_start_X+(i* this.unit_size), this.line_start_Y +5,this.line_start_X+(i* this.unit_size), this.line_start_Y-5 );
                let num_label = interactive.text(this.line_start_X + (i * this.unit_size), this.line_start_Y + 25,i+start_label);
                num_label.style.textAnchor = 'middle';
                num_label.alignmentBaseline = 'middle';
               // this.number_labels_array[i]=num_label;

                
               console.log(line_marker.x1, line_marker.x2, line_marker.y1, line_marker.y2);
               console.log("num_label", num_label.contents)
               console.log("i",i);


            }
        }
    }

    main(){
        let text = interactive.text(25, interactive.height - 25, "");

        function setInteractiveSize(height, width)
        {
            interactive.width = width;
            interactive.height = height;
        }

        setInteractiveSize(500,1000);

        const numberline = new Numberline(150, 150,30, true, true, 5, 20);
        numberline.line.classList.add('default');
        numberline.line.update = function () {
            this.x1 = numberline.line_start_X;
            this.y1 = numberline.line_start_Y; 
            this.x2 = numberline.control_point.x;
            this.y2 = numberline.line_start_Y;
        };

        numberline.start_line.update = function () {
            this.x1 = numberline.line_start_X;
            this.y1 = numberline.line_start_Y - 5; 
            this.x2 = numberline.line_start_X; 
            this.y2 = numberline.line_start_Y +5;
        };
        numberline.end_line.update = function () {
            this.x1 = numberline.control_point.x;
            this.y1 = numberline.line_start_Y - 5; 
            this.x2 = numberline.control_point.x;
            this.y2 = numberline.line_start_Y +5; 
        };

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
            this.contents = `&lt;${tag} ${x1}="${numberline.line.x1.toFixed(0)}"
                                    ${y1}="${numberline.line.y1.toFixed(0)}"
                                    ${x2}="${numberline.line.x2.toFixed(0)}"
                                    ${y2}="${numberline.line.y2.toFixed(0)}"&gt`;
        };
        text.update();
        text.addDependency(numberline.line);
        //# sourceMappingURL=svg-line.js.map
    }
}