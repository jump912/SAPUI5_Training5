/*global location */
sap.ui.define([
	"com/rizing/demo/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.rizing.demo.controller.Detail", {

		onInit: function() {
			this.getRouter().getRoute("object").attachPatternMatched({}, this._onObjectMatched, this);
			
			this.oTable = this.byId("LineItemsSmartTable");
			// this.oTemplate = this.byId("cli").clone();
		},
		
		bindTable: function() {
			// var oSorter = new sap.ui.model.Sorter({
			// 	path: "ProductId",
			// 	descending: true,
			// 	group: function(oContext) {
			// 		return oContext.getProperty("ProductId");
			// 	}
			// });
			
			// this.oTable.bindAggregation("items", {
			// 	path: "SalesOrderItems",
			// 	template: this.oTemplate
			// 	// sorter: oSorter
			// });
		},
		
		onSearchFieldSearch: function(oEvent) {
			// // Get the search query, regardless of the triggered event 
			// // ('query' for the search event, 'newValue' for the liveChange one).
			// var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
			// var aFilters = [];
			// // 1) Search filters (with OR)
			// if (sQuery && sQuery.length > 0) {
			// 	aFilters.push(new sap.ui.model.Filter("ProductId", sap.ui.model.FilterOperator.Contains, sQuery));
			// }
			// this.oTable.bindAggregation("items", {
			// 	path: "SalesOrderItems",
			// 	template: this.oTemplate,
			// 	filters: aFilters
			// });
		},

		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("SalesOrderSet", {
					SoId: sObjectId
				});
				
				this.getView().bindElement({
					path: "/" + sObjectPath
					// parameters: {
					// 	expand: "SalesOrderItems"
					// }
				});
			}.bind(this));
			
			// this.bindTable();
			this.oTable.rebindTable("true");
		},
		
		openDialog: function() {
			if (!this.pressDialog) {
				this.pressDialog = sap.ui.xmlfragment("com.rizing.demo.view.fragment.AddFragment", this);
				
				//to get access to the global model
				this.getView().addDependent(this.pressDialog);
			}
			
			this.pressDialog.open();
		},
		
		dialogClose: function() {
			this.pressDialog.close();
		},
		
		callFI: function()  {
			var oSwitch = this.getView().byId("functionCalledSwitch");
			var	oText = this.getView().byId("returnText");
				
			this.getModel().callFunction(
				"/GetAdditionalDetails", {
					method: "GET",
					success: function(oData, oResponse) {
						oSwitch.setState(oData.functionCalled);
						oText.setText(oData.returnText);
					},
					error: function(oError) {
						return;
					}
				});
		},
		
		onDeletePressed: function(){
			// prepare context for binding
			var oContext = this.getView().getBindingContext();
				
			if (!this.confirmDeleteDialog) {
				this.confirmDeleteDialog = sap.ui.xmlfragment("com.rizing.demo.view.fragment.DeleteSO", this);
				
				//to get access to the global model
				this.getView().addDependent(this.confirmDeleteDialog);
			}
			
			this.confirmDeleteDialog.setBindingContext(oContext);
			this.confirmDeleteDialog.open();
		},
		
		onCancelDeletePressed: function(){
			this.confirmDeleteDialog.close();
		},
		
		onConfirmDeletePressed: function(oEvent){
			var sPath = oEvent.getSource().getBindingContext().getPath();
			//var	oContext = this.getModel().getContext(sPath);
			
			
			//delete the created entry
			this.getModel().remove(sPath);
			this.getModel().submitChanges();
			
			this.confirmDeleteDialog.setBindingContext();
			this.confirmDeleteDialog.close();
		},
		
		onSwitchChanged: function(oEvent){
			var oLabelName = oEvent.getSource().getAriaLabelledBy()[0];
			var oLabel = this.byId(oLabelName);
			
			if (oEvent.getSource().getState()){ 
				oLabel.setBgColor("#FFFFFF");
			} else { 
				oLabel.setBgColor("#444444");
			}
		}
	});
});