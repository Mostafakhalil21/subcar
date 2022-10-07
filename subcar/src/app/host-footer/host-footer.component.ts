import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-host-footer',
  templateUrl: './host-footer.component.html',
  styleUrls: ['./host-footer.component.css']
})
export class HostFooterComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
}
