import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('filterElement') filterElementRef: ElementRef;
  hitMessage: string;

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @Output() valueChange: EventEmitter<string> = 
                         new EventEmitter<string>();


  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngOnInit() {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount
    }
  }

  ngAfterViewInit(): void {
      if(this.filterElementRef) {
        this.filterElementRef.nativeElement.focus();
      }
  }
}
