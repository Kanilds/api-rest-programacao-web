import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-anime-listar',
  templateUrl: './anime-listar.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService, ConfirmationService]
})
export class AnimeListarComponent implements OnInit {

  putOrPost: boolean
  animeDialogo: boolean;
  submetido: boolean;
  animes: any = [];
  status: any = [];
  anime: any = {
    _id: '',
    titulo: '',
    estudio: '',
    status: '',
    progresso: '',
    nota: ''
  }

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarAnime()

    this.status = [
      { label: 'Planejando', value: 'Planejando' },
      { label: 'Assistindo', value: 'Assistindo' },
      { label: 'Em Espera', value: 'Em Espera' },
      { label: 'Finalizado', value: 'Finalizado' }
    ];
  }

  pesquisarAnime() {
    this.http.get(`http://localhost:4000/animes`)
      .subscribe(resultado => this.animes = resultado);
  }

  openNew() {
    this.putOrPost = false;
    this.submetido = false;
    this.animeDialogo = true;
  }

  editAnime(anime) {
    this.putOrPost = true;
    this.animeDialogo = true;

    this.anime._id = anime._id
    this.anime.titulo = anime.titulo
    this.anime.estudio = anime.estudio
    this.anime.status = anime.status
    this.anime.progresso = anime.progresso
    this.anime.nota = anime.nota
  }

  deleteAnime(anime) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:4000/animes/${anime._id}`)
          .subscribe(
            resultado => {
              this.pesquisarAnime();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Anime Deletado!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.animeDialogo = false;
    this.submetido = false;
  }

  saveAnime() {
    this.submetido = true;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.anime);

    if (this.putOrPost) {
      const { _id } = this.anime

      this.http.put<any>(`http://localhost:4000/animes/${_id}`, body, { headers })
        .subscribe(
          () => {
            this.pesquisarAnime();
          });
      this.hideDialog();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Anime Atualizado!', life: 3000 });
    } else {
      this.http.post<any>('http://localhost:4000/animes', body, { headers })
        .subscribe(() => {
          this.pesquisarAnime();
        });
      this.hideDialog()
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Anime Criado!', life: 3000 });
    }
  }
}
