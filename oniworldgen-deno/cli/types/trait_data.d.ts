export interface TraitData {
  name: string;
  description: string;
  colorHex: string;
  exclusiveWith: string[];
  traitTags: string[];
  globalFeatureMods?: Record<string, number>;
  forbiddenDLCIds?: string[];
  additionalSubworldFiles?: AdditionalSubworldFilesInterface[];
  additionalUnknownCellFilters?: AdditionalUnknownCellFiltersInterface[];
  additionalWorldTemplateRules?: AdditionalWorldTemplateRulesInterface[];
  removeWorldTemplateRulesById?: string[];
  exclusiveWithTags?: string[];
  startingBasePositionHorizontalMod?:
    StartingBasePositionHorizontalModInterface;
  startingBasePositionVerticalMod?: StartingBasePositionVerticalModInterface;
}

export interface AdditionalSubworldFilesInterface {
  name: string;
  minCount: number;
  maxCount: number;
}

export interface AdditionalUnknownCellFiltersInterface {
  tagcommand: string;
  tag: string;
  minDistance: number;
  maxDistance: number;
  command: string;
  sortOrder: number;
  subworldNames: string[];
}

export interface AdditionalWorldTemplateRulesInterface {
  names: string[];
  listRule: string;
  allowExtremeTemperatureOverlap: boolean;
  priority: number;
  allowedCellsFilter: object[];
}

export interface StartingBasePositionHorizontalModInterface {
  min: number;
  max: number;
}

export interface StartingBasePositionVerticalModInterface {
  min: number;
  max: number;
}
