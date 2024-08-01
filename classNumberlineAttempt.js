/**
* @title Numberline
* @description Creating a custom numeber line application
* @date July 21
* @author Alissa
* @tags [svg]
*/

import { Interactive, getScriptName } from './index.js';
let interactive = new Interactive(getScriptName());
interactive.border = true;
interactive.width = 1000;
interactive.height = 500;

const NumberLabels = Object.freeze({
    NO_LABELS: 0,
    START_AND_END: 1,
    ALL_LABELS: 2,
});

export class Numberline { 
    //number
    line_start_X  = 150;
    line_start_Y = 150;
    unit_size = 10; 
    start_label = 5; 
    end_label = 20;
    line_length = 0;
    tick_mark_height = 20;
    target_number_value = 0;
    target_number_x = 0;
    target_number_y = 0;
    numberline_value=0;
    trial_start_time_ms=0;
    trial_end_time_ms=0;
    adjust_start_time_ms =0;
    adjust_end_time_ms = 0; 
    trial_time=0;
    total_adjust_time =0;


    //boolean
    boundless_line = true;

    //enum
    number_Labels = NumberLabels.ALL_LABELS;

    //line
    baseline = interactive.line(100, 100, 100, 100);
    line = interactive.line(0, 0, 0, 0);
    start_line = interactive.line(0,0,0,0);
    end_line = interactive.line(0,0,0,0);

    //text
     target_number = interactive.text(0, 0, 0);

    //array
    adjust_times_ms = [];

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

        this.control_point.x = this.line_start_X + this.line_length;
        this.control_point.y = this.line_start_Y;

        this.setLabels(this.start_label, this.end_label);
        this.generateTargetNumber();
        this.setTargetNumberLocation(this.target_number_x, this.target_number_y);
        this.setCssClasses();
        
    }
    startTrialTimer(){
        this.trial_start_time_ms = Date.now();
    }
    stopTrialTimer(){
        this.trial_end_time_ms = Date.now();
        this.trial_time = this.trial_end_time_ms - this.trial_start_time_ms;
    }
    startAdjustTimer(){
        this.adjust_start_time_ms = Date.now();
    }
    stopAdjustTimer(){
        this.adjust_end_time_ms = Date.now();
        let total_time = this.adjust_end_time_ms - this.adjust_start_time_ms; 
        this.adjust_times_ms.push(total_time);
        this.getTotalAdjustTime();
    }
    getTrialTime(){
        return this.trial_time
    }
    getAdjustTimeArray(){
        return this.adjust_times_ms;
    }
    getTotalAdjustTime() {
        let totalAdjustTime = 0;
        let i = 0;

        while (i < this.adjust_times_ms.length) {
            totalAdjustTime = totalAdjustTime+ this.adjust_times_ms[i];
            i++;
        }
        this.total_adjust_time = totalAdjustTime;
        return this.total_adjust_time;
        
    }
    generateTargetNumber(){
        this.target_number_value = Math.floor(Math.random() * (this.end_label- this.start_label+1)) + this.start_label;
        this.target_number.contents = this.target_number_value;

    }
    setTargetNumber(targ){
        this.target_number_value = targ;
        this.target_number.contents = this.target_number_value;
    }
    setTargetNumberLocation(targ_num_x, targ_num_y){

        this.target_number_x = targ_num_x;
        this.target_number_y = targ_num_y;

        this.target_number.x = this.target_number_x;
        this.target_number.y =  this.target_number_y; 
    }

    setLineStart(line_start_X, line_start_Y){
        this.line_start_X = line_start_X;
        this.line_start_Y = line_start_Y;
    }

    setUnitSize(unit_size){
        this.unit_size = unit_size;
    }

    setCssClasses(){
        this.line.classList.add('default', 'clickable-line');
        this.baseline.classList.add('base-line-clicked')
    }

    setLabels(start_label, end_label){
        this.start_label = start_label;
        this.end_label = end_label;
 
        if (this.number_Labels==NumberLabels.ALL_LABELS) {
            this.setAllLabels();
        } else if(this.number_Labels==NumberLabels.START_AND_END){
            this.setStartAndEndLabels();
        }
    }

    setAllLabels() {
        for (let i = 0; i <= (this.end_label-this.start_label); i++){
            let line_marker = interactive.line(this.line_start_X+(i* this.unit_size), this.line_start_Y +(this.tick_mark_height/2),this.line_start_X+(i* this.unit_size), this.line_start_Y-(this.tick_mark_height/2) );
            let num_label = interactive.text(this.line_start_X + (i * this.unit_size), this.line_start_Y + 25, i + this.start_label);
            num_label.style.textAnchor = 'middle';
            num_label.alignmentBaseline = 'middle';
        }
    }

    setStartAndEndLabels() {
        let num_label_start = interactive.text(this.line_start_X , this.line_start_Y + 25, this.start_label);
            num_label_start.style.textAnchor = 'middle';
            num_label_start.alignmentBaseline = 'middle';
            let num_label_end = interactive.text(this.line_start_X +this.line_length, this.line_start_Y + 25, this.end_label);
            num_label_end.style.textAnchor = 'middle';
            num_label_end.alignmentBaseline = 'middle';
    }

    setTickMarkHeight(height){
        this.tick_mark_height = height;
    }

    getCurrentNumberLineLocation(){
        let value = this.line.x2 - this.line_start_X;
        this.numberline_value = (value / this.unit_size)+ this.start_label ;
        return this.numberline_value;
    }

    main(){
        let text = interactive.text(25, interactive.height - 25, "");
        function setInteractiveSize(height, width)
        {
            interactive.width = width;
            interactive.height = height;
        }
        setInteractiveSize(500,1000);

        const numberline = new Numberline(100, 100,30, NumberLabels.START_AND_END, false, 20, 40);
        numberline.baseline.x2 = numberline.line_start_X + numberline.line_length;
        //numberline.setTargetNumber(33);
        numberline.generateTargetNumber();
        numberline.setTargetNumberLocation(50,50);
        let relativeLocationText = interactive.text(150, 150, 0);
        
        document.getElementById('control-17').addEventListener('mousedown', function(e) {
            numberline.line.stroke = "blue";
            numberline.startAdjustTimer();
          });
          document.getElementById('control-17').addEventListener('mouseup', function(e) {
            numberline.line.stroke = "red";
            numberline.stopAdjustTimer();
            console.log( numberline.total_adjust_time);
          });

        numberline.line.update = function () {
            this.x1 = numberline.line_start_X;
            this.y1 = numberline.line_start_Y; 
            this.y2 = numberline.line_start_Y;

            if(this.boundless_line){
                this.x2 = numberline.control_point.x;    
            }else{
                if(numberline.control_point.x < numberline.line_start_X){
                    this.x2 = numberline.line_start_X;
                }
                else if(numberline.control_point.x > numberline.line_length+numberline.line_start_X){
                    this.x2 = numberline.line_length+numberline.line_start_X;
                }else{
                    this.x2 = numberline.control_point.x; 
                }
            }

            relativeLocationText.contents =numberline.getCurrentNumberLineLocation();
        };

        numberline.start_line.update = function () {
            this.x1 = numberline.line_start_X;
            this.y1 = numberline.line_start_Y - (numberline.tick_mark_height/2); 
            this.x2 = numberline.line_start_X; 
            this.y2 = numberline.line_start_Y + (numberline.tick_mark_height/2); 
        };

        numberline.end_line.update = function () {
            this.x1 = numberline.control_point.x;
            this.y1 = numberline.line_start_Y - (numberline.tick_mark_height/2); 
            this.x2 = numberline.control_point.x;
            this.y2 = numberline.line_start_Y + (numberline.tick_mark_height/2);
        };

        numberline.line.update();
        numberline.start_line.update();
        numberline.end_line.update();

        numberline.line.addDependency(numberline.control_point);

        // TODO: This was from the example app from vector.js. THey note it is "rather hacky"
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