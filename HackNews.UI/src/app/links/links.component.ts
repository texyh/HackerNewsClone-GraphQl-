import { Component, OnInit } from '@angular/core';
import { Link } from '../models/link.model';
import { Apollo } from 'apollo-angular/Apollo';
import { ALL_LINKS_QUERY, AllLinkQueryResponse } from '../queries/linkQueries';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  constructor(
    private apollo: Apollo
  ) { }

  allLinks: Link[];
  loading = true;

  ngOnInit() {
    this.apollo.watchQuery({
      query: ALL_LINKS_QUERY
    })
    .valueChanges
    .subscribe((response) => {
      // 5
      this.allLinks = response.data['allLinks'];
      this.loading = response.data['loading']
     });
  }

}
