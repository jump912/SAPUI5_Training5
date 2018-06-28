sap.ui.define([
		'sap/m/Switch'
	],
    function(Switch) {
        return Switch.extend("com.rizing.demo.controls.CustomSwitch",{
            metadata: {
                properties: {
                    editable: {
                        type: "boolean",
                        defaultValue: true
                    }
                }
            },
            renderer: function(oRm,oControl){
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
            }
        });
    }
);
