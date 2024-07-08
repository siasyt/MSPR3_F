import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isMobileView = false;

  constructor() {
    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 768;
  }

  openContactForm() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScsmex8U41FSwqTj9Pl6Q3V7QzKNZ_eAWx78lPTfue8_e2LuQ/viewform', '_blank');
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
    } else if (event.key === 'Tab') {
    }
  }
}
