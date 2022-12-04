define(["require", "exports", "edc_base_ts"], function (require, exports, edc_base_ts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PopUp = void 0;
    //component
    class PopUp extends edc_base_ts_1.ComponentBase {
        element;
        popUpObj;
        constructor(sampleObj, element) {
            super(element);
            this.element = element;
            this.popUpObj = sampleObj;
        }
        render() {
            this.createPopUp();
        }
        createPopUp() {
            let popupDiv;
            if (this.element instanceof HTMLElement) {
                popupDiv = this.element;
            }
            else {
                popupDiv = document.createElement("div");
            }
            popupDiv.classList.add("edc-popup");
            if (this.element?.style.width) {
                this.popUpObj.width = this.element?.style.width;
            }
            popupDiv.style.position = "absolute";
            popupDiv.style.left = this.popUpObj?.position?.x + "px";
            popupDiv.style.top = this.popUpObj?.position?.y + "px";
            let height = this.popUpObj && this.popUpObj.height ? Number(this.popUpObj.height.slice(0, -2)) : 200;
            if (this.popUpObj && this.popUpObj.height) {
                popupDiv.style.height = this.popUpObj?.height;
            }
            else if (popupDiv.clientHeight >= height) {
                popupDiv.style.height = height + "px";
            }
            else {
                popupDiv.style.height = "fit-content";
            }
            let listElements = popupDiv.querySelectorAll("li");
            if (listElements.length * 33 > height) {
                popupDiv.style.overflowY = "scroll";
                popupDiv.style.maxHeight = height + "px";
            }
            else {
                popupDiv.style.removeProperty("overflow-y");
                popupDiv.style.removeProperty("max-height");
            }
            popupDiv.style.width = this.popUpObj && this.popUpObj.width ? this.popUpObj.width : "120px";
            this.element = popupDiv;
        }
    }
    exports.PopUp = PopUp;
});
// Write TypeScript code!
