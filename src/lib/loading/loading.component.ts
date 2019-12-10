import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Event } from '@angular/router';

@Component({
  selector: 'lib-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public loading: any = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
        switch (true) {
            case event instanceof NavigationStart: {
                this.loading = true;
                break;
            }
            case event instanceof NavigationEnd:
            case event instanceof NavigationCancel:
            case event instanceof NavigationError: {
                this.loading = false;
                break;
            }
            default: {
                break;
            }
        }
    });
}

  ngOnInit() {
  }

}
