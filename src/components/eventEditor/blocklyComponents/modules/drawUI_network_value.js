import * as Blockly from "blockly/core"
var mathChangeJson = {
  "message0": "执行操作",
  "args0": [
	
  ],
  "previousStatement": null,
  "nextStatement": 'Action',
  "colour": 230
};
Blockly.Blocks['drawUI_networks_value']={
	init: function() {
		this.jsonInit(mathChangeJson);
		// Assign 'this' to a variable for use in the tooltip closure below.
		var thisBlock = this;
		this.appendStatementInput('DO')
	      .appendField('发送数据')
		  ;
		this.appendStatementInput('DO')
	      .appendField('请求成功执行')
		this.appendStatementInput('DO')
		  .appendField('请求失败执行')
		this.appendStatementInput('DO')
		  .appendField('请求超时执行')
	}
}