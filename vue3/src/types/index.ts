export interface MouserChiefDetails {
  name: string;
  beganTenure: string;
  endedTenure: string;
  primeMinisters: string[];
}

export interface MouserChiefList {
  [name: string]: MouserChiefDetails;
}

export type LoadingType = {
  isLoading: boolean;
  isLoaded: boolean;
  startDate: Date;
};

export type MouserChiefDetailsMap = {
  [K in keyof MouserChiefDetails]: string;
};
