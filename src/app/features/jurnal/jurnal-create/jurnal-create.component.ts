import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Jurnal } from 'src/app/shared/models/jurnal';
import { JurnalService } from '../../services/jurnal.service';

@Component({
  selector: 'app-jurnal-create',
  templateUrl: './jurnal-create.component.html',
  styleUrls: ['./jurnal-create.component.css']
})
export class JurnalCreateComponent implements OnInit {

  formValueGroup = new FormGroup({});
  isSubmitted = false;

  jurnals: Jurnal[] = [];
  jurnalObj: Jurnal = new Jurnal();

  constructor(
    private formBuilder: FormBuilder,
    private jurnalService: JurnalService
  ) { }

  ngOnInit(): void {
    this.formValueGroup = this.formBuilder.group({
      name: [''],
      description: ['']
    })
  }

  onCreateJurnal() {
    this.jurnalObj.name = this.formValueGroup.value.name;
    this.jurnalObj.description = this.formValueGroup.value.description;

    this.jurnalService.create(this.jurnalObj).subscribe(data => {
      console.log('Data jurnal yg baru aja dibuat: ' + data);
      this.isSubmitted = true;
    })
  }

}
