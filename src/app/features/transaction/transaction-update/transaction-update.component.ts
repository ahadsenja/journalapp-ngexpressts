import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Transaction } from 'src/app/shared/models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-update',
  templateUrl: './transaction-update.component.html',
  styleUrls: ['./transaction-update.component.css']
})
export class TransactionUpdateComponent implements OnInit {

  updateTransaction = new FormGroup({
    jurnal_id: new FormControl(0),
    date: new FormControl(''),
    description: new FormControl(''),
    debit: new FormControl(0),
    credit: new FormControl(0)
  });

  isSubmitted = false;

  tsObj: Transaction = new Transaction();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tsService: TransactionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.warn(this.route.snapshot.params.id);

    this.tsService.getCurrentTransaction(this.route.snapshot.params.id).subscribe((result) => {
      console.warn('result', result.data);

      this.updateTransaction = new FormGroup({
        jurnal_id: new FormControl(result.data.jurnal_id),
        date: new FormControl(result.data.date),
        description: new FormControl(result.data.description),
        debit: new FormControl(result.data.debit),
        credit: new FormControl(result.data.credit)
      });
    })
  }

  onUpdateTransaction() {
    this.tsObj.jurnal_id = this.updateTransaction.value.jurnal_id;
    this.tsObj.date = this.updateTransaction.value.date;
    this.tsObj.description = this.updateTransaction.value.description;
    this.tsObj.debit = this.updateTransaction.value.debit;
    this.tsObj.credit = this.updateTransaction.value.credit;

    this.tsService.update(this.route.snapshot.params.id, this.tsObj).subscribe(data => {
      this.isSubmitted = true;
      this.router.navigate(['/transaction']);
    }, error => console.log(error))
  }

  onCancel() {
    this.updateTransaction.reset();
    this.router.navigate(['/transaction'])
  }

}
