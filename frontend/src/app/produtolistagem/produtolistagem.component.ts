import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto',
  templateUrl: './produtolistagem.component.html',
  styleUrls: ['./produtolistagem.component.css']
})
export class ProdutolistagemComponent implements OnInit {

  produtos: any = [];

  constructor(
      private http: HttpClient,
      private confirmationService: ConfirmationService,
      private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.pesquisarProduto();
  }

  confirmarExclusao(produto: any) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'Tem certeza que deseja excluir este produto?',
      icon: 'pi pi-trash',
      accept: () => {
        this.excluirProduto(produto);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'CANCELADO', detail: 'Exclusão cancelada!' });
      }
    });
  }

  pesquisarProduto() {
    this.http.get(`http://localhost:8080/rest/produto`)
      .subscribe(resultado => this.produtos = resultado);
  }

  excluirProduto(produto: any) {
    this.http.delete(`http://localhost:8080/rest/produto/${produto.codigo}`)
      .subscribe(
        resultado => {
          this.pesquisarProduto();
          this.mensagem();
        }
      );
  }

  mensagem() {
    this.messageService.add({ severity: 'success', summary: 'SUCESSO', detail: 'Produto Excluido!' });
  }

}
