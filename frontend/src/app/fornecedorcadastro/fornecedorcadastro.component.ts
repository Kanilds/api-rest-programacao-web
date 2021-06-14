import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fornecedorcadastro',
  templateUrl: './fornecedorcadastro.component.html',
  styleUrls: ['./fornecedorcadastro.component.css']
})
export class FornecedorcadastroComponent implements OnInit {

  fornecedor: any = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  adicionaFornecedor(fornecedor) {
    if (this.fornecedor.descricao === '') {
      this.fornecedor.descricao = null;
    }
    this.http.post('http://localhost:8080/rest/fornecedor', JSON.stringify(this.fornecedor))
      .subscribe(
        resultado => {
          this.mensagem();
          this.router.navigate(['/', 'fornecedores']);
        }, erro => {
          if (erro.status === 500) {
            this.mensagemErro();
          }
        }
      );
  }

  mensagem() {
    this.messageService.add({ severity: 'success', summary: 'SUCESSO', detail: 'Fornecedor adicionado!' });
  }

  mensagemErro() {
    this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Campos obrigatorios não preenchidos!' });
  }

}
