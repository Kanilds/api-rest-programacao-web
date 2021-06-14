import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-anime-listar',
  templateUrl: './anime-listar.component.html',
  styleUrls: ['./anime-listar.component.css']
})
export class AnimeListarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.pesquisarProduto();
  }

  produtos: any = [];

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
    this.http.get(`http://localhost:4000/animes`)
      .subscribe(resultado => this.produtos = resultado);
      console.log(this.produtos);
      
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
