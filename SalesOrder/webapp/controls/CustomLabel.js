sap.ui.define([
		'sap/m/Label'
	],
    function(Label) {
    	
        return Label.extend("com.rizing.demo.controls.CustomLabel",{
            metadata: {
                properties: {
                    bgColor: "sap.m.ValueCSSColor"
                }
            },
            
            /*renderer: function(oRm,oControl){
                if(oControl.getEditable()){
                    sap.m.SwitchRenderer.render(oRm,oControl); //use supercass renderer routine
                }
                else {
                    //render control as simple text
                    var txt = (oControl.getState() ?
                                oControl._sOn : oControl._sOff); //use the super classes existing variables for on/off text
                    oRm.write("<span tabindex=\"0\""); //tabindex allows keyboard navigation for screen readers
                    oRm.writeControlData(oControl); //ui5 trackings data, outputs sId, absolutely mandatory
                    oRm.writeClasses(oControl); //allows the class="" attribute to work correctly
                    oRm.write(">");
                    oRm.write( jQuery.sap.encodeHTML( txt ) ); //always use encodeHTML when dealing with dynamic strings
                    oRm.write("</span>");
                }
            },*/
            
            onAfterRendering : function() {
		      // make sure that onAfterRendering function in VBox is not overwritten
		      if (Label.prototype.onAfterRendering) {
		        Label.prototype.onAfterRendering.apply(this, arguments);
		      }
		      if (this.getBgColor()) {
		      	// getter method getBgColor() is auto generated based on custom property defined in metadata 
		        this.$().css("background-color", this.getBgColor());
		      }
		    },
		    
		    renderer: {	}
        });
    }
);