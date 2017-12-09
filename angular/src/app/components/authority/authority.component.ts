import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {
  url: string;
  trusturl: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.url = "https://www.google.com/maps/embed/v1/search?q=" + this.global.location.replace(/ /g, "%20") + "%20hospital&key=AIzaSyCEtY2--C0BdVOvD7Lra_SuIc3rXoDPKoQ&language=en";
    this.trusturl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
