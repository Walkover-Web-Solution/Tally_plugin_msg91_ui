import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from "./app.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations:[
        AppComponent
    ],
    imports:[
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
    ],
    exports:[],
    providers:[]
})
 export class AppModule{}