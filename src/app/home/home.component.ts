import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingInfo } from "./../housing-location";
import { HousingService } from "./../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form (submit)="$event.preventDefault()">
        <input
          type="text"
          placeholder="filter by city"
          #filterSearch
          (keyup.enter)="filterResults(filterSearch.value)"
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filterSearch.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <p *ngIf="this.housingService.isLoading">
        isLoading<span class="loader"></span>
      </p>
      <div *ngFor="let housingInfo of filterHousingInfoList">
        <app-housing-location
          [housingInfo]="housingInfo"
        ></app-housing-location>
      </div>
    </section>
  `,
  styleUrls: ["./home.component.css", "./loader.css"],
})
export class HomeComponent {
  housingInfoList: HousingInfo[] = [];
  housingService: HousingService = inject(HousingService);
  filterHousingInfoList: HousingInfo[] = [];

  // ? 建構時執行
  constructor() {
    this.housingService
      .getAllHousingInfo()
      .then((housingInfoList: HousingInfo[]) => {
        this.housingInfoList = housingInfoList;
        this.filterHousingInfoList = housingInfoList;
      });
  }
  filterResults(text: string) {
    if (!text) this.filterHousingInfoList = this.housingInfoList; //多餘的

    this.filterHousingInfoList = this.housingInfoList.filter((housingInfo) => {
      return housingInfo?.city.toLowerCase().includes(text.toLowerCase());
    });
  }
}
