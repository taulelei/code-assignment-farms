import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Miller, Farm } from '../../services/dataService.service';

@Component({
    selector: 'miller-details-view',
    templateUrl: './millerDetails.component.html',
    styleUrls: ['./millerDetails.component.css']
})

export class MillerDetailsComponent implements OnInit {   
    private sub: any;

    miller: Miller;
    millerCode: number;

    constructor(
        private dataService: DataService,
        private router: Router,
        private route: ActivatedRoute
    ){
        
    }

    viewFarmDetails(farm: any){
        this.dataService.getAllFarms().then((response) => {
            let targetFarm = response.find(x => x.Code == farm.Code);
            let code = response.indexOf(targetFarm);
            this.router.navigate(['farms/' + code]);
        });
    }

    ngOnInit():void {

        this.sub = this.route.params.subscribe(params => {
            if(params['code'] !== undefined){
                this.millerCode = params['code'];
                this.dataService.getMillerInfo(this.millerCode).then((response) => {
                    this.miller = response;
                });
            }
        });
    }
}
