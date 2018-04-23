import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService, Farm, Miller } from '../../services/dataService.service';

@Component({
    selector: 'home-view',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {   

    farmList: Farm[];
    millerList: Miller[];
    
    tablePagination = {
        data: [],
        pageNumber: 1,
        resultsPerPage: 5,
        Math: Math
    }
    filter = {
        farm: "",
        miller: ""
    }

    constructor(
        private dataService: DataService,
        private router: Router
    ){
        // this.farmList = this.dataService.farms;
        // this.tablePagination.data = this.farmList;
        this.dataService.getAllFarms().then((response) => {
            this.farmList = response;
            this.tablePagination.data = response;
        });

        this.dataService.getAllMillers().then((response) => {
            this.millerList = response;
        })
    }

    filterFarms(){
        this.tablePagination.data = this.farmList.filter(x => x.Name.includes(this.filter.farm) && x.Miller.Name.includes(this.filter.miller));
        this.tablePagination.pageNumber = 1;
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
        var code = this.farmList.indexOf(farm);
        //var code = farm.Code;
        this.router.navigate(['farms/' + code]);
    }

    viewMillerDetails(miller: Miller){
        this.dataService.getAllMillers().then((response) => {
            let code = response.indexOf(miller);
            this.router.navigate(['miller/' + code]);
        });
    }

    ngOnInit():void {}
}