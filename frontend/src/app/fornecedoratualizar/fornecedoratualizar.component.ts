import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fornecedoratualizar',
  templateUrl: './fornecedoratualizar.component.html',
  styleUrls: ['./fornecedoratualizar.component.css']
})
export class FornecedoratualizarComponent implements OnInit {

  fornecedor: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { this.router = router; }

  ngOnInit(): void {
    const codigo = this.route.snapshot.params['codigo'];
    this.buscarCodigo(codigo);
    this.fornecedor.codigo = codigo;
  }

  mensagem() {
    this.messageService.add({ severity: 'success', summary: 'SUCESSO', detail: 'Fornecedor alterado!' });
  }

  mensagemErro() {
    this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Campos obrigatorios não preenchidos!' });
  }

  buscarCodigo(codigo) {
    this.http.get(`http://localhost:8080/rest/fornecedor/${codigo}`)
      .subscribe(resultado => this.fornecedor = resultado);
  }

  atualizarFornecedor() {
    if (this.fornecedor.descricao === '') {
      this.fornecedor.descricao = null;
    }
    this.http.put(`http://localhost:8080/rest/fornecedor`, this.fornecedor)
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

}
