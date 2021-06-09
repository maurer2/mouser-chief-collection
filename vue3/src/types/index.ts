export interface MouserChiefDetails {
  'Name': string;
  'Began tenure': string;
  'Ended tenure': string;
  'Prime Minister(s)': string[];
}

export interface MouserChiefList {
  [name: string]: MouserChiefDetails;
}
