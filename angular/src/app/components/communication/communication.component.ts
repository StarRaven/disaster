import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
  url: string;
  trusturl: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.url = "https://www.google.com/maps/embed/v1/search?q=" + this.global.location.replace(/ /g, "%20") + "%20hospital&key=AIzaSyCEtY2--C0BdVOvD7Lra_SuIc3rXoDPKoQ";
    //console.log(this.url);
    this.trusturl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    //new%20york%20hospital&key=AIzaSyCEtY2--C0BdVOvD7Lra_SuIc3rXoDPKoQ"
    //"https://www.google.com/maps/embed/v1/search?q=new%20york%20hospital&key=AIzaSyCEtY2--C0BdVOvD7Lra_SuIc3rXoDPKoQ"
  }

}
