import * as Blockly from "blockly/core"
var mathChangeJson = {
  "message0": "名称:%1,数据:%2",
  "args0": [
	{type:"field_input",name:"itemName"},
	{type:"field_input",name:"itemValue"}
  ],
  "previousStatement": null,
  "nextStatement": 'Action',
  "colour": 230
};
Blockly.Blocks['drawUI_networks_value_item']={
	init: function() {
	  this.jsonInit(mathChangeJson);
	  // Assign 'this' to a variable for use in the tooltip closure below.
	  var thisBlock = this;
	}
}