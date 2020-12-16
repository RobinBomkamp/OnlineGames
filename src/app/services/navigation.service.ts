import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  toRoom(id: string) {
    if (!id) {
      return; 
    }    
    this.router.navigate(["room", id], { relativeTo: this.route });
  }

  toHome() {
    this.router.navigate([""], { relativeTo: this.route.root});
  }
}
