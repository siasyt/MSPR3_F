import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuActive = false;
  showMore = false;
  countdown = 10;
  interval: any;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMenuActive = false;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'A') {
        activeElement.click();
      }
    }
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  closeMenu() {
    this.isMenuActive = false;
  }

  navigateToHome() {
    this.router.navigate(['/home']);
    this.closeMenu();
  }

  navigateToConsulter() {
    this.router.navigate(['/consulter']);
    this.closeMenu();
  }

  navigateToHistorique() {
    this.router.navigate(['/historique']);
    this.closeMenu();
  }

  contactUs() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScsmex8U41FSwqTj9Pl6Q3V7QzKNZ_eAWx78lPTfue8_e2LuQ/viewform', '_blank');
    this.closeMenu();
  }

  logout() {
    console.log('Logout button clicked');
    this.router.navigate(['/login']);
    this.closeMenu();
  }

  showPrivacyModal() {
    const modal = new bootstrap.Modal(document.getElementById('privacyModal'), {});
    modal.show();
    this.startCountdown();
  }

  acceptPrivacy() {
    this.router.navigate(['/consulter']);
    this.closeMenu();
    this.hideModal();
  }

  declinePrivacy() {
    this.router.navigate(['/home']);
    this.closeMenu();
    this.hideModal();
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  startCountdown() {
    this.countdown = 10;
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  hideModal() {
    const modalElement = document.getElementById('privacyModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }
}




