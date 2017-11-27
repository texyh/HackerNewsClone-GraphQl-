import { Component, OnInit } from '@angular/core';
import { Link } from '../models/link.model';
import { Apollo } from 'apollo-angular';
import { CREATE_LINK_MUTATION, CreateLinkMutationResponse, ALL_LINKS_QUERY } from '../queries/linkQueries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

  link: Link;

  constructor(private apollo: Apollo,
              private router: Router) {
    this.link =  new Link();
  }

  ngOnInit() {
  }

  createLink() {
    this.apollo.mutate({
      mutation: CREATE_LINK_MUTATION,
      variables: {
        description: this.link.description,
        url: this.link.url
      },
      update: (store, { data: { createLink } }) => {
        const data: any = store.readQuery({
          query: ALL_LINKS_QUERY
        });

        data.allLinks.push(createLink);
        store.writeQuery({ query: ALL_LINKS_QUERY, data });
      },
    }).subscribe((response) => {
        this.router.navigate(['/']);
    });
  }

}
