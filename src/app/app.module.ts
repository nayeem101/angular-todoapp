import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { SharedModule } from './shared/shared.module';
import { CustomDialogService } from './shared/custom-dialog.service';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, MatConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [CustomDialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
