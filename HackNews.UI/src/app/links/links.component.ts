import { Component, OnInit, OnDestroy } from '@angular/core';
import { Link } from '../models/link.model';
import { Apollo } from 'apollo-angular/Apollo';
import { ALL_LINKS_QUERY, AllLinkQueryResponse } from '../queries/linkQueries';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit, OnDestroy {

  constructor(
    private apollo: Apollo,
    private auth: AuthService
  ) { }

  allLinks: Link[];
  loading = true;
  logged: boolean = false;
  subscriptions = [];

  ngOnInit() {

    this.auth.isAuthenticated
    .distinctUntilChanged()
    .subscribe(isAuthenticated => {
      this.logged = isAuthenticated;
    });

    const querySubscription = this.apollo.watchQuery({
      query: ALL_LINKS_QUERY
    })
    .valueChanges
    .subscribe((response) => {
      // 5
      this.allLinks = response.data['allLinks'];
      this.loading = response.data['loading']
     });

     this.subscriptions = [...this.subscriptions, querySubscription];
  }

  updateStoreAfterVote (store, createVote, linkId) {
    // 1
    const data = store.readQuery({
      query: ALL_LINKS_QUERY
    });

    // 2
    const votedLink = data.allLinks.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    // 3
    store.writeQuery({ query: ALL_LINKS_QUERY, data })
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }

}
