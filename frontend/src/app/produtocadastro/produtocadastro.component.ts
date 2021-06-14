import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './produtocadastro.component.html',
  styleUrls: ['./produtocadastro.component.css']
})
export class ProdutocadastroComponent implements OnInit {

  produto: any = {
    descricao: '',
    preco: '',
    estoque: ''
  };
  fornecedores: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { this.router = router; }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/rest/fornecedor')
      .subscribe(resultado => this.fornecedores = resultado);
  }

  adicionarProduto(produto) {

    if (this.produto.descricao === '') {
      this.produto.descricao = null;
    }
    this.http.post('http://localhost:8080/rest/produto', JSON.stringify(this.produto))
      .subscribe(
        resultado => {
          console.log(this.produto);
          this.mensagem();
          this.router.navigate(['/', 'produtos']);
        }, erro => {
          if (erro.status === 500) {
            console.log(this.produto);
            this.mensagemErro();
          }
        }
      );
  }

  mensagem() {
    this.messageService.add({ severity: 'success', summary: 'SUCESSO', detail: 'Produto criado!' });
  }

  mensagemErro() {
    this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Campos obrigatorios não preenchidos!' });
  }
}
