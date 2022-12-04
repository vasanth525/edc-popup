import { ComponentBase } from "edc_base_ts";
import { IPopUp } from "./interface";
export declare class PopUp extends ComponentBase {
    element?: HTMLElement | undefined;
    popUpObj: IPopUp | undefined;
    constructor(sampleObj?: IPopUp, element?: HTMLElement | undefined);
    render(): void;
    private createPopUp;
}
