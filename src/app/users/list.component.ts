import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({ templateUrl: 'list.component.html' })
 
export class ListComponent implements OnInit {
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