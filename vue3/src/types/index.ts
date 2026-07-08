export type MouserChiefDetails = {
  beganTenure: string;
  endedTenure: string;
  timeInOffice: string;
  primeMinisters: string[];
};

export type MouserChiefMap = {
  [key: string]: MouserChiefDetails[];
};

// todo: use
// export type MouserChiefMap = {
//   [K in keyof MouserChiefDetails]: string;
// };
