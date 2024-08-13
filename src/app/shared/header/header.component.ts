import { Component, EventEmitter, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/services/user.service';
import { TokenService } from '../../auth/services/token.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName: string="";
  imagePath: any;
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private userService:UserService,
    private toastr:ToastrService,
    private cookieService: CookieService,
  ) {
    // this.userName = this.tokenService.getName();
    // this.imagePath = this.tokenService.getImagePath();
    // this.userService.getUserById(this.tokenService.getUserId()).subscribe({
    //   next: (res) => {
    //     if(res.statusCode==200){
    //       console.log(res.data);
    //       this.userName=res.data.firstName+" "+res.data.lastName;
    //       this.imagePath="https://localhost:7118" +res.data.imagePath;
    //     }
    //     else{
    //       console.log(res.message);
    //     }
    //   },
    //   error:(err)=>{
    //     this.toastr.error(err.message);
    //   }
    // });
  }
  @Output() toggleSidebar = new EventEmitter<void>();
  isProfileDropdownOpen = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

 

  logOut() {
    this.cookieService.delete('login_token');
    this.router.navigate(['/login']);
  }
}
