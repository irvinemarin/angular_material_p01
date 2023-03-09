import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit, AfterViewInit {

  constructor(private titleService: Title) {

  }

  title = '';

  ngOnInit() {
    this.verify_samll_width()
    this.setTitle("Base Angular 8")
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  setTitleComponet(): void {
    const navBarteTitle = document.getElementById('titleNavbar') as HTMLSpanElement;
    navBarteTitle.innerText = this.title;
  }

  verify_samll_width() {
    return window.innerWidth < 768;
  }

  ngAfterViewInit(): void {

  }
}
