import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";


@Component({
      selector: 'app-log-details-side-dialog',
      templateUrl: './log-details-side-dialog.component.html',
      styleUrls: ['./log-details-side-dialog.component.scss'],
})

export class LogsDetailsSideDialogComponent {
        constructor
        (
            public dialogRef: MatDialogRef<LogsDetailsSideDialogComponent>,
            @Inject(MAT_DIALOG_DATA)
            public data: {
                    logData$: Observable<any>,
                    isLoading$: Observable<any>
            }     
        ) 
        { }

}