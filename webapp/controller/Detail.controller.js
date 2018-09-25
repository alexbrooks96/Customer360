sap.ui.define([
	"com/delaware/ab/trac2018/controller/BaseController",
	"sap/ui/model/Filter"
], function (BaseController, Filter) {
	"use strict";

	return BaseController.extend("com.delaware.ab.trac2018.controller.Detail", {

			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.delaware.ab.trac2018.view.Detail
			 */
			onInit: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.getRouter().getRoute("Detail").attachPatternMatched(this._onRoutingMatched, this);

			},

			_onRoutingMatched: function (oEvent) {
				this.getView().setBusy(true);

				var sCustomerNumber = oEvent.getParameter("arguments").customerNumber;
				console.log(sCustomerNumber);

				//var oOrderModel = this.getView().getModel("orderModel");

				var that = this;
				var aFilters = [new Filter("customer", sap.ui.model.FilterOperator.EQ, sCustomerNumber)];
				if (this.getView().getModel("orderModel") !== undefined) {
					this.getView().getModel("orderModel").read("/ZV_ZVT18_ORDERS_JVN", {

						filters: aFilters,
						success: function (oData) {
							console.log(oData);
							that.getView().getModel("ordersModel").setData({
							"orders": oData.results
							});
						},
						error: function (oError) {
							console.log(oError);
						}
					});
					this.getView().setBusy(false);
				}

				this.getView().setBusy(false);
			}

			/*var aFilters = [new Filter("customer", sap.ui.model.FilterOperator.EQ, sCustomerNumber)];
			oOrderModel.read("/ZV_ZVT18_ORDERS_JVN",{
				success: function(oData){
					filters: aFilters,
					console.log(sCustNumber);
					that.getView().getModel("ordersModel").setData({
						"orders": oData.results 
					});
					console.log(oData);
				},
				error: function(oError){
					console.log(oError);
				}
			});

			
			
			
			
			/*this.getView().setBusy(true);
			var sCustomerNumber = oEvent.getParameter("arguments").customerNumber;
			var that = this;

			
			console.log(sCustomerNumber);
			
			var aFilters = [new Filter("CustomerID", sap.ui.model.FilterOperator.EQ, oEvent.getParameter("arguments").customerID)];
			
			this.getModel().read("/Orders", {
				filters: aFilters,
				success: function(oData){
					that.getModel("ordersModel").setData(oData.results);
					console.log(oData);
				},
				error: function(error){
					that.showError(oError);
				} 
			});
			
			this.getView().setBusy(false);
			
			
			
			console.log(sCustomerNumber);
			
			
			

			this.getView().getModel("ordersModel").read("ZV_ZVT18_ORDERS_JVN_CDS", {
				success: function (oData) {
					console.log(oData);
					that.getView().getModel("ordersModel").setData({
						"orders": oData.results
					});
				},
				error: function (oError) {
					console.log(oError);
				}
			});*/
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.delaware.ab.trac2018.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.delaware.ab.trac2018.view.Detail
		 */
		//	onAfterRendering: function() {
		//		var ordersModel = self.getView().getModel();

		//		ordersModel.read("customer")
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.delaware.ab.trac2018.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});