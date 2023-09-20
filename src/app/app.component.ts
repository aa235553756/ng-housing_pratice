import { Component } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";

// TODO 記得先開jsonServer ( json-server --watch db.json )

@Component({
  standalone: true,
  selector: "app-root",
  template: ` <main>
    <header>
      <a routerLink="/">
        <img src="assets/logo.svg" alt="logo" />
      </a>
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrls: ["./app.component.css"],
  imports: [HomeComponent, RouterModule],
})
export class AppComponent {
  title = "homes";
}
