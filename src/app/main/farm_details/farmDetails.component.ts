import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Farm } from '../../services/dataService.service';

@Component({
    selector: 'farm-details-view',
    templateUrl: './farmDetails.component.html',
    styleUrls: ['./farmDetails.component.css']
})

export class FarmDetailsComponent implements OnInit {   
    private sub: any;

    farm: Farm;
    farmCode: string;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute
    ){
        
    }

    ngOnInit():void {

        this.sub = this.route.params.subscribe(params => {
            if(params['code'] !== undefined){
                let farmCode = params['code'];
                this.dataService.getFarmInfo(farmCode).then((response) => {
                    this.farm = response;
                });
            }
        });
        // this.route.params.subscribe(params => {
        //     let farmCode = this.route.snapshot.paramMap.get('code');
        //     this.dataService.getFarmInfo(farmCode).then((response) => {
        //         this.farm = response;
        //     });
        // });
    }
}
