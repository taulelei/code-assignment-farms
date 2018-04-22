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
    
    tablePagination = {
        data: [],
        pageNumber: 1,
        resultsPerPage: 5,
        Math: Math
    }
    filter = {
        farm: "",
        miller: "",
        filteredData: []
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
    }

    filterFarms(farmName: string, millerName: string){
        this.tablePagination.data = this.farmList.filter(x => x.Name.includes(farmName) && x.Miller.Name.includes(millerName));
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

// interface TablePagination {
//     data: Farm[],
//     pageNumber: number,
//     resultsPerPage: number,
//     Math: Math
// }

// interface Filter {
//     farm: string,
//     miller: string,
//     filteredData: Farm[]
// }
