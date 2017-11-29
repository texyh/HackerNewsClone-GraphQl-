import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Link } from '../models/link.model';
import { OnChanges, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { GC_USER_ID } from '../constants/authConstants';
import { Apollo } from 'apollo-angular/Apollo';
import { CREATE_VOTE_MUTATION, ALL_LINKS_QUERY } from '../queries/linkQueries';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent implements OnInit, OnDestroy {

  @Input()
  link: Link;

  @Input()
  index: number = 0;

  @Input()
  isAuthenticated: boolean = false;

  @Input()
  updateStoreAfterVote: UpdateStoreAfterVoteCallback;
  

  subscriptions = [];
  
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    console.log(this.link);
  }
  

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }

  voteForLink = async () => {
    const userId = localStorage.getItem(GC_USER_ID);
    const voterIds = this.link.votes.map(vote => vote.user.id);
    if (voterIds.includes(userId)) {
      alert(`User (${userId}) already voted for this link.`);
      return
    }
    const linkId = this.link.id;

    const mutationSubscription = this.apollo.mutate({
      mutation: CREATE_VOTE_MUTATION,
      variables: {
        userId,
        linkId
      },
      update: (store, { data: { createVote } }) => {
        this.updateStoreAfterVote(store, createVote, linkId);
      }
    })
      .subscribe();

    this.subscriptions = [...this.subscriptions, mutationSubscription];
  }


 }

 interface UpdateStoreAfterVoteCallback {
  (proxy: DataProxy, mutationResult: FetchResult, linkId: string);
}
