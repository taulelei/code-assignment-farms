import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Farm, Miller } from '../../services/dataService.service';

@Component({
    selector: 'farm-details-edit-view',
    templateUrl: './farmDetailsEdit.component.html',
    styleUrls: ['./farmDetailsEdit.component.css']
})

export class FarmDetailsEditComponent implements OnInit {   
    private sub: any;

    farm: Farm;
    farmCode: number;

    editFarm: Farm;

    millerList: Miller[];

    constructor(
        private dataService: DataService,
        private router: Router,
        private route: ActivatedRoute
    ){
        
    }

    saveEdit(){
        this.dataService.editFarm(this.farmCode, this.editFarm).then((response) => {
            //this.router.navigate(['farms/' + response]);
        });
    }

    ngOnInit():void {

        this.sub = this.route.params.subscribe(params => {
            if(params['code'] !== undefined){
                this.farmCode = params['code'];
                this.dataService.getFarmInfo(this.farmCode).then((response) => {
                    this.farm = response;
                    this.editFarm = Object.assign({}, response);
                });
                this.dataService.getAllMillers().then((response) => {
                    this.millerList = response;
                });
            }
        });
    }
}
