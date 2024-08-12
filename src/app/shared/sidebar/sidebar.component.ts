import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = true;
  isManageUserOpen = false;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && !changes['isOpen'].currentValue) {
      this.isManageUserOpen = false;
    }
  }

  toggleManageUser(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isManageUserOpen = !this.isManageUserOpen;
  }
}
