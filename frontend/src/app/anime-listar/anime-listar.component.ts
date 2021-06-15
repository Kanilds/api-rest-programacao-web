import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-anime-listar',
  templateUrl: './anime-listar.component.html',
  styleUrls: ['./anime-listar.component.css'],
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

  animeDialogo: boolean;
  submetido: boolean;
  animes: any = [];
  status: any = [];
  anime: any = {
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
      { label: 'PLANEJANDO', value: 'planejando' },
      { label: 'ASSISTINDO', value: 'assistindo' },
      { label: 'EM ESPERA', value: 'em espera' },
      { label: 'FINALIZADO', value: 'finalizado' }
    ];
  }

  pesquisarAnime() {
    this.http.get(`http://localhost:4000/animes`)
      .subscribe(resultado => this.animes = resultado);
  }

  openNew() {
    this.submetido = false;
    this.animeDialogo = true;
  }

  editAnime(anime) {
    this.animeDialogo = true;
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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Anime Deletado', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.animeDialogo = false;
    this.submetido = false;
  }

  saveAnime() {
    this.submetido = true;

    this.http.post('http://localhost:4000/animes', JSON.stringify(this.anime))
      .subscribe(
        resultado => {
          console.log(this.anime);
        }
      );
  }
}
