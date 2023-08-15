import { Injectable } from "@angular/core";
import { HousingInfo } from "./housing-location";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  protected housingInfoList: HousingInfo[] = [];

  constructor() {}
  // simulate GET
  getHousingInfoList(): HousingInfo[] {
    return this.housingInfoList;
  }
  getHousingInfoId(id: Number): HousingInfo | undefined {
    return this.housingInfoList.find((housingInfoList) => {
      return housingInfoList.id === id;
    });
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
