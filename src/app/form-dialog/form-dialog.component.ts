import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { subscribeOn } from 'rxjs';
import { CriarRoteiro } from '../models/criar-roteiro-model';
import { SalvarRoteiroService } from '../services/salvar-roteiro.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  roteiros!: CriarRoteiro[];
  local!: string;
  endereco!: string;
  descricao!: string;
  funcionamento!: string;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private salvarDados: SalvarRoteiroService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.salvarDados.lerRoteiros().subscribe({
      next: (roteiros: CriarRoteiro[]) => {
        this.roteiros = roteiros;
        console.log(roteiros[this.data - 1]);
        this.local = roteiros[this.data - 1].local;
        this.endereco = roteiros[this.data - 1].endereco;
        this.descricao = roteiros[this.data - 1].descricao;
        this.funcionamento = roteiros[this.data - 1].funcionamento;

        roteiros[this.data];
      },
      error: () => {
        console.log('falha em salvar');
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
