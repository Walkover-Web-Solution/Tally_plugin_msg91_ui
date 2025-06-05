import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-no-record-found',
    templateUrl: './no-record-found.component.html',
    styleUrls: ['./no-record-found.component.scss'],
    imports:[MatCardModule]
})
export class NoRecordFoundComponent {
    @Input() showBtn: boolean = false;

    // Input property to customize the title (e.g., "Logs", "Users", etc.)
    @Input() title: string = ""
}