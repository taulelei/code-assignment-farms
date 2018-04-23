import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Farm, Miller, Paddock } from '../../services/dataService.service';

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
    paddockList: Paddock[];

    constructor(
        private dataService: DataService,
        private router: Router,
        private route: ActivatedRoute
    ){
        
    }

    addPaddock(newCode: string, newArea: number){
        let newPaddock = new Paddock(this.farm);
        if(newCode !== undefined && newCode.length > 0)
            newPaddock.Code = newCode;
        if(newArea > 0)
            newPaddock.Area = newArea;
        this.paddockList.unshift(newPaddock);
        newCode = undefined;
        newArea = undefined;
    }

    removePaddock(index: number){
        this.paddockList.splice(index, 1);
    }

    saveEdit(){
        this.editFarm.Paddocks = this.paddockList;
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
                    this.paddockList = response.Paddocks.map(x => Object.assign({}, x));
                    this.editFarm = Object.assign({}, response);
                });

                this.dataService.getAllMillers().then((response) => {
                    this.millerList = response;
                });
                
            }
        });
    }
}
