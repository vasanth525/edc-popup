// import { ComponentBase } from "../../Base/component";
import { ComponentBase } from "edc_base_ts";
import { IPopUp } from "./interface";

//component

export class PopUp extends ComponentBase {
  popUpObj: IPopUp | undefined;
  constructor(sampleObj?: IPopUp, public element?: HTMLElement) {
    super(element);
    this.popUpObj = sampleObj;
  }

  public render() {
    this.createPopUp();
  }

  private createPopUp() {
    let popupDiv: HTMLElement;
    if (this.element instanceof HTMLElement) {
      popupDiv = this.element;
    }
    else {
      popupDiv = document.createElement("div");
    }
    popupDiv.classList.add("edc-popup");
    if (this.element?.style.width) {
      (this.popUpObj as IPopUp).width = this.element?.style.width;
    }
    popupDiv.style.position = "absolute";
    popupDiv.style.left = this.popUpObj?.position?.x + "px";
    popupDiv.style.top = this.popUpObj?.position?.y + "px";

    let height: number = this.popUpObj && this.popUpObj.height ? Number(this.popUpObj.height.slice(0, -2)) : 200;
    if (this.popUpObj && this.popUpObj.height) {
      popupDiv.style.height = this.popUpObj?.height;
    }
    else if (popupDiv.clientHeight >= height) {
      popupDiv.style.height = height + "px";
    }
    else {
      popupDiv.style.height = "fit-content";
    }
    let listElements: NodeListOf<HTMLElement> = popupDiv.querySelectorAll("li");
    if(listElements.length * 33 > height) {
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

// Write TypeScript code!
