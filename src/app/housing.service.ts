import { Injectable } from "@angular/core";
import { HousingInfo } from "./housing-location";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  url = "http://localhost:3000/locations";
  isLoading = true;

  constructor() {}
  // simulate GET
  async getAllHousingInfo(): Promise<HousingInfo[]> {
    this.isLoading = true;
    const housingInfoList = await fetch(this.url);
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
        this.isLoading = false;
      }, 2000);
    });
    return (await housingInfoList.json()) ?? [];
  }
  // simulate GET/:id
  async getHousingInfoById(id: Number): Promise<HousingInfo> {
    const housingInfo = await fetch(`${this.url}/${id}`);
    return (await housingInfo.json()) ?? {};
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
