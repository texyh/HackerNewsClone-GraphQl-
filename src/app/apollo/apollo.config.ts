import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';


@NgModule({
  exports: [
    // 2
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  // 3
  constructor(apollo: Apollo, httpLink: HttpLink) {

    // 4
    const uri = 'https://api.graph.cool/simple/v1/cjaff1b2z3p260140bgae86om';
    const http = httpLink.create({ uri });

    // 6
    apollo.create({
      link: http,
      cache: new InMemoryCache()
    });
  }
}