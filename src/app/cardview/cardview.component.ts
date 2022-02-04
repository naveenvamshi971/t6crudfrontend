import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.less']
})

export class CardviewComponent {
  users = null;
  constructor(private accountService: AccountService,private router: Router) {}
  // let timeDiff = Math.abs(Date.now() - this.dob);
  // let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);


  ngOnInit() {
    this.accountService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
  }
  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
      edit(id){
          this.router.navigate(['/users/edit/',id]);
      }

  
}
/*
import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.less']
})
export class CardviewComponent implements OnInit {
  users = null;

  constructor(private accountService: AccountService,private router: Router) {}

  ngOnInit() {
    this.accountService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
  }
  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
      edit(id){
          this.router.navigate(['/users/edit/',id]);
      }

}

*/