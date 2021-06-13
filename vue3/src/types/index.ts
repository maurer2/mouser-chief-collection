export interface MouserChiefDetails {
  'Name': string;
  'Began tenure': string;
  'Ended tenure': string;
  'Prime Minister(s)': string[];
}

export interface MouserChiefList {
  [name: string]: MouserChiefDetails;
}

export type LoadingType = {
  isLoading: boolean;
  isLoaded: boolean;
  startDate: Date;
};
