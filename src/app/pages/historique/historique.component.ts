import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../services/history.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

declare var bootstrap: any;

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NavbarComponent, FooterComponent],
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  history: any[] = [];
  expandedRecord: any = null;
  selectedRecord: any = null;
  errorMessage: string = '';
  successMessage: string = '';

  // 图片名称列表
  imagePaths = [
    'A14.jpeg', 'A15.jpg', 'A16.jpeg', 'A17.jpg', 'A1 (10).jpeg', 'A1 (11).jpeg', 
    'A1 (12).jpeg', 'A1 (13).jpeg', 'A1 (14).jpeg', 'A1 (15).jpeg', 'A1 (16).jpeg', 
    'A1 (17).jpeg', 'A1 (18).jpeg', 'A1 (19).jpeg', 'A1 (20).jpeg', 'A1 (21).jpeg', 
    'A1 (22).jpeg', 'A1 (23).jpeg', 'A1 (10).jpeg', 'A1 (11).jpeg', 'A1 (12).jpeg', 
    'A1 (13).jpeg', 'A1 (14).jpeg', 'A1 (15).jpeg', 'A1 (16).jpeg', 'A1 (17).jpeg', 
    'A1 (18).jpeg', 'A1 (19).jpeg', 'A1 (20).jpeg', 'A1 (21).jpeg', 'A1 (22).jpeg', 
    'A1 (23).jpeg', 'A1.jpeg', 'A1.jpg', 'A2.jpeg', 'A3.jpeg', 'A4.jpg', 'A5.jpg', 
    'A6.jpeg', 'A7.jpg', 'A8.jpeg', 'A9.jpg', 'A10.jpeg', 'A11.jpg', 'A12.jpeg', 
    'A13.jpeg'
  ]; 

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyService.getHistory().subscribe({
      next: (data) => {
        // 为每个记录添加一个随机图片路径
        this.history = data.map(record => ({
          ...record,
          randomImagePath: this.getRandomImagePath()
        }));
      },
      error: (error) => {
        console.error('Error fetching history', error);
        this.errorMessage = 'Error fetching history. Please try again.';
      }
    });
  }

  toggleExpand(record: any): void {
    this.expandedRecord = this.expandedRecord === record ? null : record;
  }

  deleteRecord(record: any): void {
    this.history = this.history.filter(r => r !== record);
    this.successMessage = 'Supprimé avec succès';
    setTimeout(() => this.successMessage = '', 3000); // 3秒后清除消息
  }

  // getImageUrl(record: any): string {
  //   const imageUrl = `${this.baseUrl}/uploads/${record.filename}`;
  //   console.log(`Image URL: ${imageUrl}`); // 打印图片路径
  //   return imageUrl;
  // }

  openModal(record: any): void {
    this.selectedRecord = record;
    const modalElement = document.getElementById('recordModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  getRandomImagePath(): string {
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    return this.imagePaths[randomIndex];
  }
}









