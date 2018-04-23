import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Farm, Miller, Paddock } from '../../services/dataService.service';

import * as faker from 'faker';

@Component({
    selector: 'farm-add-view',
    templateUrl: './farmAdd.component.html',
    styleUrls: ['./farmAdd.component.css']
})

export class FarmAddComponent implements OnInit {   
    private sub: any;

    newFarm: Farm = new Farm();
    newPaddock: Paddock = new Paddock();

    millerList: Miller[];
    paddockList: Paddock[] = [];

    constructor(
        private dataService: DataService,
        private router: Router
    ){
        
    }

    addFarm(form: any){
        if(form.valid){
            this.dataService.addFarm(this.newFarm).then((response) => {
                this.router.navigate(['farms/' + response]);
            });
        }
    }
    addPaddock(){
        if(this.newPaddock.Code !== undefined && this.newPaddock.Code.length > 0 && this.newPaddock.Area > 0){
            this.newPaddock.setOwnerFarm(this.newFarm);
            this.newFarm.Paddocks.unshift(this.newPaddock);
            this.newPaddock = new Paddock();
        }
    }

    removePaddock(paddock: Paddock){
        this.newFarm.removePaddock(paddock);
    }

    ngOnInit():void {
        this.newFarm.Name = null;
        this.newFarm.Miller = null;
        this.dataService.getAllMillers().then((response) => {
            this.millerList = response;
        });
    }
}
