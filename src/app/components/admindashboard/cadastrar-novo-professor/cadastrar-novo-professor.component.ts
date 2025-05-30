import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Software } from '../../../models/software.model';
import { SoftwareService } from '../../../services/software.service';
interface Type {
  id: number;
  nome: string;
}

interface Professor {
  id?: number;
  nome: string;
  escola: string;
  tipo: Type;
  senha: string;
}

@Component({
  selector: 'app-cadastrar-novo-professor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastrar-novo-professor.component.html',
  styleUrls: ['./cadastrar-novo-professor.component.scss']
})
export class CadastrarNovoProfessorComponent implements OnInit {
  professor = {
    nome: '',
    escola: '',
    tipo: {
      id: 1  // ou qualquer id válido do tipo (ex: 1 para professor, 2 para admin)
    },
    senha: ''
  };

    software = {
      nome: '',
      versao: '',
      link: '',
      softwareLivre: false,
    };

  tipos: Type[] = [];
  senhaVisivel = false;

  constructor(private http: HttpClient,private softwareService: SoftwareService) {}

  ngOnInit() {
    // Se quiser, aqui pode carregar os tipos do backend também
  }

  cadastrarProfessor() {
    this.http.post('http://localhost:8081/api/professores', this.professor).subscribe({
      next: res => {
        alert('Professor cadastrado com sucesso!');
        this.professor = { nome: '', escola: '', tipo: { id: 1 }, senha: '' };
      },
      error: err => {
        alert('Erro ao cadastrar professor.');
        console.error(err);
      }
    });
  }

  toggleSenhaVisivel() {
    this.senhaVisivel = !this.senhaVisivel;
  }
  onSubmit() {
    this.softwareService.createSoftware(this.software).subscribe(
      (response) => {
        console.log('Software cadastrado com sucesso!', response);
        alert('Software cadastrado com sucesso!');
        // Limpar o formulário
        this.software = {
          nome: '',
          versao: '',
          link: '',
          softwareLivre: false,
        };
      },
      (error) => {
        console.error('Erro ao cadastrar software:', error);
        alert('Erro ao cadastrar software!');
      }
    );
  }
}
