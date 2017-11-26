import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Link } from '../models/link.model';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent implements OnInit, OnChanges {

 
  @Input()
  link: Link;
  
  constructor() { }

  ngOnInit() {
    console.log(this.link.createdAt);
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    
  }


  voteForLink= async () => {
    // ... you'll implement this in chapter 6
  }

}
