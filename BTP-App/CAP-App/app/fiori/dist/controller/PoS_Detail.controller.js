sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/viz/ui5/controls/common/feeds/FeedItem"],function(e,t,i,o,s){"use strict";return e.extend("cap.ui.fiori.controller.PoS_Detail",{onInit:function(){var e=new o;this.getView().setModel(e,"oChartModel");var t=new o;this.getView().setModel(t,"oPredictModel");var i=new o;this.getView().setModel(i,"oTrainModel");this.oRouter=this.getOwnerComponent().getRouter();this.oRouter.getRoute("RoutePoS_Detail").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:async function(e){this._sPoSid=e.getParameter("arguments").pointofsale;await this._bindView(this._sPoSid);this.setVizChartProperties();this.fetchChartData(this._sPoSid);this.fetchPredictData(this._sPoSid);this.fetchTrainData(this._sPoSid)},_bindView:function(e){return new Promise(function(t){this.getView().bindElement({path:"/POINTS_OF_SALES/"+e,events:{change:t},refreshAfterChange:true})}.bind(this))},onCloseFlexibleColumn:function(){this.oRouter.navTo("RoutePoS_Main")},setVizChartProperties:function(){var e=this.getView().byId("priceOverTimeVizFrame");e.setVizProperties({title:{visible:false},plotArea:{dataLabel:{visible:false},window:{start:"firstDataPoint",end:"lastDataPoint"},primaryScale:{fixedRange:true,minValue:1.6,maxValue:2.4}}})},fetchChartData:function(e){this.getView().getModel().read("/History_Forecast",{filters:[new t("uuid",i.EQ,e)],success:function(e){this.getView().getModel("oChartModel").setProperty("/",e.results)}.bind(this),error:function(e){console.log(e)}})},onAfterRendering:function(){const e=this.getView().byId("priceOverTimeVizFrame");const t=this.getView().byId("idPopOver");t.connect(e.getVizUid())},displayPredictedData:function(){const e=this.getView().byId("priceOverTimeVizFrame");if(e.getFeeds().length>=3){e.removeFeed(2)}else{e.addFeed(new s({uid:"valueAxis",type:"Measure",values:["Predicted Price"]}))}},fetchPredictData:function(e){this.getView().getModel().read("/ModelHanaMlConsPalMassiveAdditiveModelAnalysis",{filters:[new t("group_id",i.EQ,e)],success:function(e){if(e.results.length>0)this.getView().getModel("oPredictModel").setProperty("/",JSON.parse(e.results[0].model_content))}.bind(this),error:function(e){console.log(e)}})},fetchTrainData:function(e){this.getView().getModel().read("/Output1PalMassiveAdditiveModelPredict",{filters:[new t("group_id",i.EQ,e)],success:function(e){debugger}.bind(this),error:function(e){console.log(e)}})}})});