import { Component } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { footerComponent } from "../footer/footer.component";
@Component({
    selector: 'app-tally-panel',
    imports:[
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        footerComponent
    ],
    templateUrl: './tally-panel.component.html',
    styleUrls: ['./tally-panel.component.scss'],
})

export class TallyPanelComponent {}