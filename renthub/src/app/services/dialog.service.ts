import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  open(component: any, data?: any) {
    return this.dialog.open(component, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
      data,
      autoFocus: false,
      disableClose: false,
    });
  }
}
