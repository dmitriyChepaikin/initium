import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ADD_ICON, DELETE_ICON} from "./assets/icons";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
      <main id="container">
        <router-outlet></router-outlet>
      </main>
  `,
})
export class AppComponent {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconLiteral('add', domSanitizer.bypassSecurityTrustHtml(ADD_ICON));
    matIconRegistry.addSvgIconLiteral('delete',domSanitizer.bypassSecurityTrustHtml(DELETE_ICON));
  }
}
