import { SalvarRoteiroService } from './../services/salvar-roteiro.service';
import { CriarRoteiro } from './../models/criar-roteiro-model';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-roteiro',
  templateUrl: './roteiro.component.html',
  styleUrls: ['./roteiro.component.scss'],
})
export class RoteiroComponent implements OnInit {
  form!: FormGroup;
  error = 'Este campo é obrigatório!';
  roteiros!: CriarRoteiro[];
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private salvarRoteiroService: SalvarRoteiroService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      local: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      funcionamento: new FormControl('', [Validators.required]),
    });

    this.salvarRoteiroService.lerRoteiros().subscribe({
      next: (roteiros: CriarRoteiro[]) => {
        this.roteiros = roteiros;
      },
      error: () => {
        console.log('falha em salvar');
      },
    });
  }

  openDialog(id: number): void {
    this.ngOnInit();

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  salvarDadosRoteiro() {
    //pegando os dados dos inputs
    const id = this.roteiros[this.roteiros.length - 1].id + 1;
    const local = this.form.controls['local'].value;
    const endereco = this.form.controls['endereco'].value;
    const descricao = this.form.controls['descricao'].value;
    const funcionamento = this.form.controls['funcionamento'].value;

    //cria um objeto com os dados informados
    const roteiro: CriarRoteiro = {
      id,
      local: local,
      endereco: endereco,
      descricao: descricao,
      funcionamento: funcionamento,
    };

    //salva os dados informados dentro do array, dispara a msg de sucesso

    this.salvarRoteiroService.salvarRoteiro(roteiro).subscribe({
      next: () => {
        console.log(id);

        if (id != 0) {
          this.ngOnInit();
          this.salvarRoteiroService.salvarDadosRoteiro(roteiro);
        } else this.atualizarEdicao();

        console.log('salvou');
      },
      error: () => {
        console.log('falha');
      },
    });
  }

  deletarRoteiro(id: any) {
    this.salvarRoteiroService.deletarRoteiro(id).subscribe({
      next: () => {
        console.log('deletou com sucesso');
        this.ngOnInit();
      },
      error: () => {
        console.log('error');
      },
    });
  }

  editarRoteiro(id: number) {
    this.salvarRoteiroService.lerRoteirosById(id).subscribe({
      next: (roteiro: CriarRoteiro) => {
        this.form.controls['local'].setValue(roteiro.local);
        this.form.controls['endereco'].setValue(roteiro.endereco);
        this.form.controls['descricao'].setValue(roteiro.descricao);
        this.form.controls['funcionamento'].setValue(roteiro.funcionamento);
        this.id = roteiro.id;
        console.log('editar ' + this.id);
      },
      error: () => {
        console.log('erro ao editar bolo');
      },
    });
  }

  atualizarEdicao() {
    console.log('editar ' + this.id);
    let id = this.id;
    const local = this.form.controls['local'].value;
    const endereco = this.form.controls['endereco'].value;
    const descricao = this.form.controls['descricao'].value;
    const funcionamento = this.form.controls['funcionamento'].value;

    let roteiro: CriarRoteiro = {
      id: id,
      local: local,
      endereco: endereco,
      descricao: descricao,
      funcionamento: funcionamento,
    };

    this.salvarRoteiroService.updateRoteiro(roteiro).subscribe({
      next: () => {
        //alert("bolo salvo com sucesso")
        this.ngOnInit();
      },
      error: () => {
        alert('Erro ao salvar Bolo');
      },
    });
  }
  // lerId() {
  //   if lerRoteirosById(id: Number) {
  //     {
  //       next: () => {this.salvarRoteiroService.salvarRoteiro(this.id).subscribe},
  //       error: () => {this.atualizarEdicao()},
  //     }
  //   }
  // }
}
