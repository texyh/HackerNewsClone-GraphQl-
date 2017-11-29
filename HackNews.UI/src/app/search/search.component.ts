import { Component, OnInit } from '@angular/core';
import { Link } from '../models/link.model';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  allLinks: Link[] = [];
  loading: boolean = true;
  searchText: string = '';

  logged: boolean = false;

  subscriptions: = [];
  constructor(private apollo: Apollo, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated
    .distinctUntilChanged()
    .subscribe(isAuthenticated => {
      this.logged = isAuthenticated;
    });
  }

  executeSearch() {
    if (!this.searchText) {
      return;
    }

    const querySubscription = this.apollo.watchQuery({
      query: ALL_LINKS_SEARCH_QUERY,
      variables: {
        searchText: this.searchText
      },
    }).valueChanges.subscribe((response) => {
      this.allLinks = response.data['allLinks'];
      this.loading = response.data['loading'];
    });

    this.subscriptions = [...this.subscriptions, querySubscription];
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }

}
