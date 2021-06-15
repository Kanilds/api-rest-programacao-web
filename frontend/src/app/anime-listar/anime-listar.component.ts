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
    this.pesquisarAnime();
  }

  animes: any = [];

  confirmarExclusao(anime: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Tem certeza que deseja excluir este Anime?',
      icon: 'pi pi-trash',
      accept: () => {
        this.excluirAnime(anime);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'CANCELADO', detail: 'Exclusão cancelada!' });
      }
    });
  }

  pesquisarAnime() {
    this.http.get(`http://localhost:4000/animes`)
      .subscribe(resultado => this.animes = resultado);
      console.log(this.animes);
      
  }

  excluirAnime(anime: any) {
    this.http.delete(`http://localhost:4000/animes/${anime._id}`)
      .subscribe(
        resultado => {
          this.pesquisarAnime();
          this.mensagem();
        }
      );
  }

  mensagem() {
    this.messageService.add({ severity: 'success', summary: 'SUCESSO', detail: 'Anime Excluido!' });
  }
}
