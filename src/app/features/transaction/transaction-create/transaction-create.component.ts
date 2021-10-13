import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Transaction } from 'src/app/shared/models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})

export class TransactionCreateComponent implements OnInit {

  formValueGroup = new FormGroup({})
  isSubmitted = false;

  transactions: Transaction[] = [];
  transactionObj: Transaction = new Transaction();

  jurnal: any = {
    id: 0,
    name: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jurnal = {
        id: params['id'],
        name: params['name']
      }
    });

    this.formValueGroup = this.formBuilder.group({
      jurnal_id: [this.jurnal.id],
      date: [''],
      description: [''],
      debit: [0],
      credit: [0],
    });
  }

  onCreateTransaction() {
    this.transactionObj.jurnal_id = this.formValueGroup.value.jurnal_id;
    this.transactionObj.date = this.formValueGroup.value.date;
    this.transactionObj.description = this.formValueGroup.value.description;
    this.transactionObj.debit = this.formValueGroup.value.debit;
    this.transactionObj.credit = this.formValueGroup.value.credit;

    this.transactionService.create(this.transactionObj).subscribe(res => {
      this.isSubmitted = true;
    })
    this.formValueGroup.reset();
    this.router.navigate(['/transaction']);
  }

  onCancel() {
    this.formValueGroup.reset();
    this.router.navigate(['/transaction']);
  }

}
