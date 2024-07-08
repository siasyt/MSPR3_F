import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PredictService } from '../../services/predict.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

interface FAQ {
  question: string;
  answer: string;
  active: boolean;
}

interface Prediction {
  name: string;
  probability: string;
}

@Component({
  selector: 'app-consulter',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NavbarComponent, FooterComponent],
  providers: [PredictService],
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.scss']
})
export class ConsulterComponent {
  selectedFile: File | null = null;
  predictionResult: any = null;
  animalInfo: any = null;
  errorMessage: string = '';
  fileUploadSuccess: boolean = false;
  predictionMessage: string = '';
  predictionErrorMessage: string = '';
  predictionConfirmed: boolean = false;
  weather: string = '';
  protectedArea: string = '';
  country: string = '';
  uploadSuccess: boolean = false;

  isUploading: boolean = false; // 上传状态
  isPredicting: boolean = false; // 预测状态

  constructor(private http: HttpClient, private predictService: PredictService, private router: Router) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'A' || activeElement.tagName === 'INPUT') {
        activeElement.click();
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log("Selected file:", this.selectedFile);
    this.fileUploadSuccess = false;
    this.predictionMessage = '';
    this.predictionErrorMessage = '';
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  uploadFile(): void {
    if (this.selectedFile && !this.isUploading) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log("Form data to be uploaded:", formData);

      const token = localStorage.getItem('token');
      console.log('JWT Token:', token);

      if (!token) {
        this.errorMessage = 'JWT token is missing';
        this.isUploading = false;
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.predictService.uploadFile(formData, headers).subscribe({
        next: (response) => {
          console.log('File upload successful', response);
          this.fileUploadSuccess = true;
          this.errorMessage = '';
          this.isUploading = false;
        },
        error: (error) => {
          console.error('File upload error', error);
          this.errorMessage = 'File upload failed. Please try again.';
          this.fileUploadSuccess = false;
          this.isUploading = false;
        }
      });
    }
  }

  startPrediction(): void {
    if (this.selectedFile && !this.isPredicting) {
      this.isPredicting = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log("Starting prediction for file:", this.selectedFile);

      const token = localStorage.getItem('token');
      console.log('JWT Token:', token);

      if (!token) {
        this.errorMessage = 'JWT token is missing';
        this.isPredicting = false;
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.predictService.uploadFile(formData, headers).subscribe({
        next: (response) => {
          console.log('Prediction successful', response);
          this.predictionMessage = 'Prediction successful';
          this.predictionErrorMessage = '';
          this.predictionResult = response;
          this.animalInfo = response.animal_info;
          this.predictionResult.predicted_classes_with_probabilities.sort((a: Prediction, b: Prediction) => {
            return parseFloat(b.probability) - parseFloat(a.probability);
          });
          this.isPredicting = false;
        },
        error: (error) => {
          console.error('Prediction error', error);
          this.predictionErrorMessage = 'Prediction failed. Please try again.';
          this.predictionMessage = '';
          this.isPredicting = false;
        }
      });
    }
  }

  confirmPrediction(): void {
    this.predictionConfirmed = true;
  }

  submitAdditionalInfo(): void {
    if (this.predictionResult) {
      const data = {
        prediction_id: this.predictionResult.prediction_id,
        weather: this.weather,
        protected_area: this.protectedArea,
        country: this.country
      };

      console.log('Confirmation data:', data);

      this.predictService.confirmPrediction(data).subscribe({
        next: (response) => {
          console.log('Prediction confirmed', response);
          this.predictionConfirmed = false;
          this.predictionResult = null;
          this.selectedFile = null;
        },
        error: (error) => {
          console.error('Prediction confirmation error', error);
          this.errorMessage = 'Prediction confirmation failed. Please try again.';
        }
      });
    }
  }

  rejectPrediction(): void {
    if (this.predictionResult) {
      this.predictService.rejectPrediction(this.predictionResult.prediction_id).subscribe({
        next: (response) => {
          console.log('Prediction rejected', response);
          this.clearMessages();
        },
        error: (error) => {
          console.error('Prediction rejection error', error);
          this.errorMessage = 'Prediction rejection failed. Please try again.';
          this.clearMessages();
        }
      });
    }
  }

  clearMessages(): void {
    this.predictionResult = null;
    this.selectedFile = null;
    this.fileUploadSuccess = false;
    this.predictionMessage = '';
    this.predictionErrorMessage = '';
  }

  faqs: FAQ[] = [
    {
      question: 'Comment utiliser l\'application Animal Track?',
      answer: 'Pour utiliser l\'application Animal Track, téléchargez simplement une photo de l\'empreinte animale depuis votre appareil. Ensuite, notre algorithme l\'analysera en quelques secondes et fournira une identification précise de l\'animal à partir de notre base de données étendue.',
      active: false
    },
    {
      question: 'Quels types d\'empreintes animales pouvez-vous identifier?',
      answer: 'Notre application peut identifier une variété d\'empreintes animales, y compris celles des mammifères comme les renards, les cerfs et les ours, ainsi que celles des oiseaux, des reptiles et bien plus encore.',
      active: false
    },
    {
      question: 'Comment puis-je obtenir de l\'aide si je rencontre des problèmes?',
      answer: 'Si vous rencontrez des problèmes, vous pouvez nous contacter via notre formulaire de contact disponible sur le site. Vous pouvez également appeler notre support client qui est disponible 24/7 pour répondre à toutes vos questions.',
      active: false
    },
    {
      question: 'L\'application Animal Track est-elle gratuite?',
      answer: 'Oui, l\'application Animal Track propose une version gratuite qui permet de réaliser un nombre limité d\'identifications par jour. Pour un usage illimité et des fonctionnalités supplémentaires, nous proposons également une version premium à un coût modique.',
      active: false
    },
    {
      question: 'Quelle est la précision de l\'identification des empreintes?',
      answer: 'La précision de notre algorithme est supérieure à 95% pour la plupart des espèces courantes. Nous travaillons continuellement à améliorer notre base de données et nos algorithmes pour offrir les résultats les plus précis possibles.',
      active: false
    }
  ];

  toggleFAQ(faq: FAQ): void {
    faq.active = !faq.active;
  }

  viewHistory(): void {
    this.router.navigate(['/historique']);
  }
}
