import { Component, ComponentType } from "./Component";
import { FORM_FACTORS, FormFactor } from "../types/hardware";
import { DataValidationService } from "../services/DataValidationService";


export interface CaseType extends ComponentType {
  formFactorSupport: FormFactor[];
  color: string;
}

export class Case extends Component {
  formFactorSupport: FormFactor[];
  color: string;

  constructor(data: CaseType) {
    super(data);

    if (data.formFactorSupport.some(val => !DataValidationService.isValidType<FormFactor>(val, FORM_FACTORS))) {
      throw new Error('Invalid data: formFactorSupport must contain valid values.');
    }

    if (!DataValidationService.isNonEmptyString(data.color)) {
      throw new Error('Invalid data: color is required.');
    }

    this.formFactorSupport = data.formFactorSupport;
    this.color = data.color;
  }
}