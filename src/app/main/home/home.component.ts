import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService, Farm } from '../../services/dataService.service';

@Component({
    selector: 'home-view',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {   

    farmList: Farm[];

    constructor(
        private dataService: DataService,
        private router: Router
    ){
        this.farmList = this.dataService.farms;
    }

    addFarm(){
        var newFarm = new Farm();
        this.dataService.addFarm(newFarm).then((response) => {
            this.farmList = response;
        });
        
    }

    removeFarm(farm){
        this.dataService.removeFarm(farm).then((response) => {
            this.farmList = response;
        });
    }

    viewDetails(farm: Farm){
        //var index = this.farmList.indexOf(farm);
        var code = farm.Code;
        this.router.navigate(['farm-details', { code }]);
    }

    ngOnInit():void {}
}
