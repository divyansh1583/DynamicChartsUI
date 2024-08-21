import { Component } from '@angular/core';
import { LoaderService } from '../../service/loader.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}
