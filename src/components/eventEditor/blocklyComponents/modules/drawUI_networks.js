import * as Blockly from "blockly/core"
var mathChangeJson = {
  "message0": "使用 %1 对地址 %2 以 %3 方法进行请求",
  "args0": [
    {"type": "field_dropdown", "name": "target",  "options": [
        [ "XMLHttpRequest", "ITEM1" ],
        [ "Axios", "ITEM2" ],
		[ "WebSocket", "ITEM3" ],
      ]},
	{"type": "field_input", "name": "url"},
	{"type": "field_dropdown", "name": "methods", "options": [
        [ "POST", "ITEM1" ],
        [ "GET", "ITEM2" ]
      ]},
    
  ],
  "previousStatement": null,
  "nextStatement": 'Action',
  "colour": 230
};
Blockly.Blocks['drawUI_networks']={
	init: function() {
	  this.jsonInit(mathChangeJson);
	  // Assign 'this' to a variable for use in the tooltip closure below.
	  var thisBlock = this;
	  this.appendStatementInput('DO')
	      .appendField('do');
	  this.setTooltip(function() {
	    return 'Add a number to variable "%1".'.replace('%1',
	        thisBlock.getFieldValue('method'));
	  });
	}
}