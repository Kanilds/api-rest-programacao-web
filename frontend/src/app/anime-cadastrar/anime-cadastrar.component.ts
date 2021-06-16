import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-anime-cadastrar',
  templateUrl: './anime-cadastrar.component.html',
  styleUrls: ['./anime-cadastrar.component.css']
})
export class AnimeCadastrarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { this.router = router; }

  ngOnInit(): void {
    
  }

  animes: any = [
    'Jujutsu kaisen',
    'Naruto',
    'Dragon Ball',
    'Bleach',
    'Rurouni Kenshin: Meiji Kenkaku Romantan',
    'Yu Yu Hakusho',
    'One piece',
    'Berserk'
  ]

  estudios: any = [
    'MAPPA',
    'Toei Animation',
    'Studio Pierrot',
    'Gainax',
    'Ufotable',
    'David Production',
    'WIT STUDIO',
    'Sunrise'
  ]

  status: any = [
    'Em curso',
    'Visto',
    'A ver',
    'Pausado'
  ]

  anime: any = {
    titulo: '',
    estudio: '',
    status: '',
    progresso: '',
    nota: ''
  };



  adicionarAnime(anime) {

    // if (this.anime.descricao === '') {
    //   this.anime.descricao = null;
    // }
    this.http.post('http://localhost:4000/animes', JSON.stringify(this.anime))
      .subscribe(
        resultado => {
          console.log(this.anime);
          this.mensagem();
          this.router.navigate(['/', 'animes']);
        }, erro => {
          if (erro.status === 500) {
            console.log(this.anime);
            this.mensagemErro();
          }
        }
      );
  }

  mensagem() {
    this.messageService.add({ severity: 'success', summary: 'SUCESSO', detail: 'Anime criado!' });
  }

  mensagemErro() {
    this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Campos obrigatorios não preenchidos!' });
  }
}
