import { NgModule } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
    imports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogModule,
        MatPaginatorModule
    ],
    exports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogModule,
        MatPaginatorModule,
    ]

})
export class AngularMaterialModule{}