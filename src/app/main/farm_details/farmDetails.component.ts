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
    farmCode: number;

    constructor(
        private dataService: DataService,
        private router: Router,
        private route: ActivatedRoute
    ){
        
    }

    viewMillerDetails(){
        this.dataService.getAllMillers().then((response) => {
            let code = response.indexOf(this.farm.Miller);
            this.router.navigate(['miller/' + code]);
        });
    }

    ngOnInit():void {

        this.sub = this.route.params.subscribe(params => {
            if(params['code'] !== undefined){
                this.farmCode = params['code'];
                this.dataService.getFarmInfo(this.farmCode).then((response) => {
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
