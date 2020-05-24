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
    this.router.navigate(["room", id], { relativeTo: this.route });
  }
}
