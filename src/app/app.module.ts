import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';



import { GraphQLModule } from './apollo/apollo.config';
import { AppComponent } from './layout/app.component';
import { LinksComponent } from './links/links.component';
import { LinkItemComponent } from './link-item/link-item.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { from } from 'apollo-link';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    LinkItemComponent,
    CreateLinkComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LinksComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateLinkComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '',
      }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
