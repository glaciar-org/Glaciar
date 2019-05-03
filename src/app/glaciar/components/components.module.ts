import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NouisliderModule } from 'ng2-nouislider'
import { NouisliderComponent } from './extra/nouislider/nouislider.component'
import { ToastrComponent } from './extra/toastr/toastr.component'
import { ComponentsRoutingModule } from './components-routing.module'
import { DatepickerComponent } from './extra/datepicker/datepicker.component'
import { DateFormatPipe } from './pipe/date-format-pipe'
import { TextTransfPipe } from './pipe/text-transf-pipe'
import { NumTransfPipe } from './pipe/num-transf-pipe'
import { DebugComponent } from './util/debug/debug.component';



@NgModule({

  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    ComponentsRoutingModule
  ],
  declarations: [
    DatepickerComponent,
    NouisliderComponent,
    DateFormatPipe,
    TextTransfPipe,
    NumTransfPipe,
    ToastrComponent,
    DebugComponent
  ],
  exports: [
    DatepickerComponent,
    NouisliderComponent,
    DateFormatPipe,
    TextTransfPipe,
    NumTransfPipe,
    DebugComponent
  ]
})
export class ComponentsModule { }
