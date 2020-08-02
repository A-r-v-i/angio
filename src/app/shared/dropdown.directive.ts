import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private elRef : ElementRef){}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isOpen ?
    this.elRef.nativeElement.querySelector('.dropdown-menu').classList.add('show')
    : this.elRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
  }
}
