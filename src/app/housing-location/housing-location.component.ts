import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HousingInfo } from "./../housing-location";

@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingInfo.photo"
        alt="屬性名稱是 {{ housingInfo.name }}"
      />
      <h2 class="listing-heading">{{ housingInfo.name }}</h2>
      <p class="listing-location">
        {{ housingInfo.city }}, {{ housingInfo.state }}
      </p>
      <a [routerLink]="['/details', housingInfo.id]">Learn More</a>
    </section>
  `,
  styleUrls: ["./housing-location.component.css"],
})
export class HousingLocationComponent {
  @Input() housingInfo!: HousingInfo;
}
