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
      <form>
        <input type="text" placeholder="filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <div *ngFor="let housingInfo of housingInfoList">
        <app-housing-location
          [housingInfo]="housingInfo"
        ></app-housing-location>
      </div>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingInfoList: HousingInfo[] = [];
  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingInfoList = this.housingService.getHousingInfoList();
  }
}
