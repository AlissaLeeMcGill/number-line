body {
    margin: 16px;
}

div {
    margin-bottom: 16px
}

.clickable-line.default {
    stroke-width: 3px !important;
    stroke: red;
}

.base-line.default {
    stroke: black;
}

.base-line-clicked {
    stroke: purple;
}

.clickable-line:hover {
    stroke: blue;
}


/* 
.window {
  display: block;
  margin: 0 auto 1.5em auto;
  box-shadow: 0 5px 9px 0 rgba(0,0,0,0.15), 0 3px 10px 0 rgba(0,0,0,0.19);
  overflow: hidden;
}

.border {
  border: 1px solid grey;
}
 */
.input-container {
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
}

input.input {
  width: 100%;
  height: 2rem;
  padding-left: 8px;
  webkitAppearance: textfield;
  border: 1px solid grey;
  border-radius: 4px;
  font-size: 14px;
}

.interactive {
  font-family: 'Helvetica Neue','Segoe UI','Helvetica','Arial', sans-serif;
  font-weight: normal;
  font-feature-settings: "kern", "liga", "clig", "calt";
  font-size: 1rem;
  box-sizing: content-box;
  -webkit-font-smoothing: antialiased;
  user-select: none;
}

.interactive text,
.interactive span {
  fill: #333333;
  stroke: none;
}

.interactive line {
  stroke:#404040;
  stroke-width:1px;
  fill:none;
}

.default * {
  stroke:#404040;
  /* stroke-width:1px; */
  fill:none;
}

circle.default,
ellipse.default,
line.default,
path.default,
polygon.default,
rect.default {
  stroke:#404040;
  stroke-width:1px;
  fill:none;
}

.plot path,
.plot line,
.plot rect {
  stroke:#404040;
  stroke-width:1px;
  fill:none;
}

.control .point {
  fill:#0366EE;
  stroke:none;
}

.control .handle {
  fill:transparent;
  stroke: #0366EE;
  stroke-width:2px;
  opacity:0;
}

.control .highlight {
  opacity:1;
}

.checkbox rect {
  fill:#f2f2f2;
  stroke:#333333;
  stroke-width:1px;
}

.slider line {
  stroke:#333333;
  stroke-width:1px;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.button text {
  font-weight: 400;
}

.button rect {
  fill: #555555;
}

.button:hover rect {
  fill: #333333;
}

.button text {
  fill: #ffffff;
}

.grid line {
  vector-effect: non-scaling-stroke;
}

.feature path {
  vector-effect: non-scaling-stroke;
}

.node circle{
  stroke: #333333;
}

.node ellipse{
  stroke: #333333;
}

.dropdown-control-button rect {
  fill: #DAD9DC;
  stroke-width:1;
  stroke: black;
}

.dropdown-control-button:hover rect,
.dropdown-control-button:hover path {
  fill: #C7C1C1;
}

.dropdown-control-curr-selection-box rect {
  fill: white;
  stroke-width:1;
  stroke: black;
}

.dropdown-control-curr-selection-box:hover rect,
.dropdown-control-button:hover text {
  fill: #C7C1C1;
}

.dropdown-control-menu-option rect {
  fill: white;
  stroke-width:1;
  stroke: black;
}

.dropdown-control-menu-option:hover rect,
.dropdown-control-button:hover text {
  fill: #C7C1C1;
}