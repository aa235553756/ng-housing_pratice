import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";

import { HousingInfo } from "../housing-location";
import { HousingService } from "./../housing.service";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingInfo?.photo" />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingInfo?.name }}</h2>
        <p class="listing-location">
          {{ housingInfo?.city }}, {{ housingInfo?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units availabel: {{ housingInfo?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingInfo?.wifi }}</li>
          <li>Does this location have laundry: {{ housingInfo?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply not to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">first name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">last name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">first name</label>
          <input id="email" type="text" formControlName="email" />
          <button class="primary" type="submit">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingInfo: HousingInfo | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  // ? 建構時執行
  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get("id"));
    this.housingService
      .getHousingInfoById(housingLocationId)
      .then((housingInfo) => {
        this.housingInfo = housingInfo;
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
