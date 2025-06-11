import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(
    message: string,
    panelClass: 'success' |'error' | 'info' = 'success',
    durationInSecond: number = 2,
    action: string = '✖',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  ): void {
    console.log('SnackBar Triggered:', { message, panelClass, durationInSecond, action, verticalPosition, horizontalPosition });
    this.snackBar.open(message, action, {
      horizontalPosition,
      verticalPosition,
      panelClass: [`snackbar-${panelClass}`],
      duration: durationInSecond * 1000
    });
  }
}