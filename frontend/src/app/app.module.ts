import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { CaptchaModule } from 'primeng/captcha';
import { FieldsetModule } from 'primeng/fieldset';
import { GMapModule } from 'primeng/gmap';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProdutolistagemComponent } from './produtolistagem/produtolistagem.component';
import { VendaComponent } from './venda/venda.component';
import { ProdutocadastroComponent } from './produtocadastro/produtocadastro.component';
import { ProdutoatualizarComponent } from './produtoatualizar/produtoatualizar.component';
import { HomeComponent } from './home/home.component';
import { FornecedorlistagemComponent } from './fornecedorlistagem/fornecedorlistagem.component';
import { FornecedorcadastroComponent } from './fornecedorcadastro/fornecedorcadastro.component';
import { FornecedoratualizarComponent } from './fornecedoratualizar/fornecedoratualizar.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'produtos', component: ProdutolistagemComponent },
  { path: 'venda', component: VendaComponent },
  { path: 'produtos/novo', component: ProdutocadastroComponent },
  { path: 'produtos/atualizar/:codigo', component: ProdutoatualizarComponent },
  { path: 'fornecedores', component: FornecedorlistagemComponent },
  { path: 'fornecedores/novo', component: FornecedorcadastroComponent },
  { path: 'fornecedores/atualizar/:codigo', component: FornecedoratualizarComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProdutolistagemComponent,
    VendaComponent,
    ProdutocadastroComponent,
    ProdutoatualizarComponent,
    HomeComponent,
    FornecedorlistagemComponent,
    FornecedorcadastroComponent,
    FornecedoratualizarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputTextModule,
    ConfirmPopupModule,
    InputTextareaModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastModule,
    CarouselModule,
    InputNumberModule,
    RatingModule,
    CaptchaModule,
    FieldsetModule,
    GMapModule,
    CardModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
