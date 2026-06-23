export interface MouserChiefDetails {
  beganTenure: string;
  endedTenure: string;
  timeInOffice: string;
  primeMinisters: string[];
}

export interface MouserChiefMap {
  [name: string]: MouserChiefDetails[];
}

export type LoadingType = {
  isLoading: boolean;
  isLoaded: boolean;
  startDate: Date;
};

export type MouserChiefDetailsMap = {
  [K in keyof MouserChiefDetails]: string;
};
