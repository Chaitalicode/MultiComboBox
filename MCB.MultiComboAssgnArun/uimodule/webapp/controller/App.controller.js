sap.ui.define([
  "MCB/MultiComboAssgnArun/controller/BaseController",
  "sap/ui/core/Fragment"

], function (Controller, Fragment) {
  "use strict";

  return Controller.extend("MCB.MultiComboAssgnArun.controller.App", {

    onInit: function () {

      var JNModel = new sap.ui.model.json.JSONModel();
      JNModel.setDefaultBindingMode("OneWay");
      this.getView().byId("VBoxID").setModel(JNModel, "JNModel");


    },

aSelectedPath:[],
handleSelectionChange:function (oEvent) {
if(oEvent.mParameters.selected === true){
//  var sPath = oEvent.mParameters.changedItem.getBindingContext().sPath;
//  var selectedComboItm  = this.getView().getModel().getProperty(sPath);
//  this.aSelectedPath.push(selectedComboItm);
//  var xSelc = this.aSelectedPath;
// var aUniqueSel = [...new Set(xSelc)];

//  this.getView().byId("VBoxID").getModel("JNModel").setProperty("/SelectedData",xSelc);
var Obj =  {
            "ProductId": "",
            "name": "",
            "company": "",
            "procesors": "",
            "price": "",
            "quantity": ""
        };
        Obj.name = oEvent.getParameter("changedItem").getText();
  this.getView().getModel().getProperty("/DynamicPanel").push(Obj);  
  this.getView().getModel().updateBindings(true);
}

else if(oEvent.mParameters.selected === false){
    var sPath = oEvent.mParameters.changedItem.getBindingContext().sPath;

 var selectedComboItm  = this.getView().getModel().getProperty(sPath);
 for(let i=0;i< this.aSelectedPath.length;i++){
     if( this.aSelectedPath[i].ProductId === selectedComboItm.ProductId){
          this.aSelectedPath.splice(i,1);
     }
 }
 this.getView().byId("VBoxID").getModel("JNModel").setProperty("/SelectedData", this.aSelectedPath);
}

},

onNameValidation:function(oEvent){
var pnm = oEvent.getParameters().newValue;
var sControlPathNm = oEvent.getSource().getBindingContext("JNModel").sPath;
var regExUname = /^[a-zA-Z]{5,18}$/;

if (!regExUname.test(pnm)) {
oEvent.getSource().getModel("JNModel").setProperty(sControlPathNm+"/oErrorControl", oEvent.getSource());
					oEvent.getSource().setValueState("Error");
					oEvent.getSource().setValueStateText("Minimum 5 Characters");
                    oEvent.getSource().focus();

          }
          else{
  oEvent.getSource().setValueState("None");
oEvent.getSource().getModel("JNModel").setProperty(sControlPathNm+"/oErrorControl", null);
oEvent.getSource().getModel("JNModel").setProperty(sControlPathNm+"/company", pnm);

}
},

onValidation:function (oEvent) {
var nm=oEvent.getParameters().newValue;
var sControlPath = oEvent.getSource().getBindingContext("JNModel").sPath;
	var regExUname = /^[a-zA-Z]{5,18}$/;
if (!regExUname.test(nm)) {
oEvent.getSource().getModel("JNModel").setProperty(sControlPath+"/oErrorControl", oEvent.getSource());
					oEvent.getSource().setValueState("Error");
					oEvent.getSource().setValueStateText("Minimum 5 Characters");
        oEvent.getSource().focus();

          }
else{
  oEvent.getSource().setValueState("None");
oEvent.getSource().getModel("JNModel").setProperty(sControlPath+"/oErrorControl", null);
oEvent.getSource().getModel("JNModel").setProperty(sControlPath+"/company", nm);

}
},

onSaveAll: function (oEvent) {
var aErrorData = this.getView().byId("VBoxID").getModel("JNModel").getProperty("/SelectedData");
for(let i=0;i<aErrorData.length;i++){
  if(i == aErrorData.length - 1 && !aErrorData[i].oErrorControl){
sap.m.MessageToast.show("Saved Sussfullyce");

    }
    if(aErrorData[i].oErrorControl !== null  || aErrorData[i].oErrorControl ){
        aErrorData[i].oErrorControl.focus();
        break;
    }

}

},






    // handleSelectionChange1: function (oEvent) {
    //   var sPath = oEvent.mParameters.changedItem.getBindingContext().sPath;
    //   var aSPath = [];
    //   var oFrag = {
    //     frag: "",
    //     path: sPath
    //   }
    //   aSPath.push(oFrag);
    //   for (var i = 0; i < aSPath.length; i++) {
    //     var randomID = "id" + JSON.stringify(Math.floor(Math.random() * 100));

    //     aSPath[i].frag = new sap.ui.xmlfragment(randomID, "MCB.MultiComboAssgnArun.Fragment.ProductDetail", this);
    //     // this.getView().addDependent(this.fragopen);
    //     aSPath[i].frag.oPopup.setModal(false);
    //     // aSPath[i].frag.oPopup.setPosition(sap.ui.core.Popup.Dock.LeftTop,sap.ui.core.Popup.Dock.BeginTop);
    //     // }

    //     aSPath[i].frag.setModel(this.getView().getModel());
    //     aSPath[i].frag.open();
    //     var myOffset = aSPath[i].frag.oPopup._getPositionOffset();
    //     aSPath[i].frag.$().offset({

    //       top: myOffset.top,

    //       left: myOffset.left

    //     })
    //     // aSPath[i].frag.oPopup.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginBottom);
    //     aSPath[i].frag.bindElement(aSPath[i].path);
    //   }
    // },

    onFragmentClose: function (oEvent) {
      oEvent.getSource().getParent().close();
      this.getView().byId("idMultiCombo").setSelectedItems(null);
      // var vb = this.getView().byId("idMultiCombo").getSelectedItems(oEvent.getSource().getParent().close());
    }
    // onDrag: function (oEvent) {
    //      oEvent.getSource().getParent().setDraggable(true);
    // }
  });
});