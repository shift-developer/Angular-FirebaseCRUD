import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

import { HeroeModel } from '../../models/heroe.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  
  heroe = new HeroeModel;

  constructor(private heroeService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo') {
      this.heroeService.getHeroe(id)
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        })
    }
  }

  guardar(form: NgForm) {

    if(form.invalid) {
      console.log('Formulario invalido')
      return;
    } 

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroeService.actualizarHeroe(this.heroe);
        
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
        
    }
    
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text:'Se actualizó correctamente',
        icon: 'success'
      })
    })
  }

}
