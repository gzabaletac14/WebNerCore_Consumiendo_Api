import { Component, OnInit } from '@angular/core';
import { Postmodel } from 'src/app/models/postmodel';
import { FormGroup, FormControl } from '@angular/forms'


//importamos el servicio
import { PostService } from '../../services/post.service'


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  //creamos la variable para pasar la informacion del servicio al html 

  public isEdit: boolean = false;
  public listpost: Postmodel[] = [];
  public formgrouppost = new FormGroup({
    PostId: new FormControl(''),
    UserId: new FormControl(''),
    Description: new FormControl(''),
    Image: new FormControl(''),
    Date: new FormControl(''),
  });
  public id: null = null;
  //public id: number = 0;

  //inicializamos el servicio 
  constructor(private PostService: PostService) {
    this.getallpost();
  }

  ngOnInit(): void {
  }
  //funcion para limpiar formularios
  limpiar() {
    this.formgrouppost.reset();
  }
  //metodos del crud
  //listar todos los post
  getallpost() {
    this.PostService.getallpost().subscribe((res: any) => {
      //llenamos la variable para pasarla al html
      this.listpost = res.data as Postmodel[];
    },
      (error: any) => {
        console.log('Error al procesar' + error)
      }
    )
  }
  //1- actualizar y  2- guardar  un post
  addpost() {
    if (this.formgrouppost.controls['PostId'].value != '') {
      this.PostService.updatepost(this.formgrouppost.value, this.formgrouppost.controls['PostId'].value).subscribe(
        (res) => {
          this.getallpost();
          this.formgrouppost.reset();
        })
    } else {
      var obj = {
        UserId: this.formgrouppost.controls['UserId'].value,
        Description: this.formgrouppost.controls['Description'].value,
        Image: this.formgrouppost.controls['Image'].value,
        Date: this.formgrouppost.controls['Date'].value,
      }
      //metodo de guardar 
      this.PostService.addpost(obj).subscribe(
        res => {
          //una vez se guarde nuevamente consultamos para actualizar la vista
          this.getallpost();
          //en este punto debemos colocar el logo de procesando.
          //limpiamos los formularios despues de guardar
          this.formgrouppost.reset();
        },
        err => console.log(err)
      )
    }
  }

  //eliminar
  deletepost(id: number) {
    const confirmar = confirm('Esta seguro que desea eliminar?');
    if (confirmar) {
      this.PostService.deletepost(id).subscribe(
        res => {
          this.getallpost();
        },
        err => console.log(err)
      );
      this.getallpost();
    }
  }

  //actualizar
  updatepost(post: Postmodel, id: number) {

    //pintamos en el formulario la informacion
    this.formgrouppost.controls['PostId'].setValue(post.postId);
    this.formgrouppost.controls['UserId'].setValue(post.userId);
    this.formgrouppost.controls['Description'].setValue(post.description);
    this.formgrouppost.controls['Image'].setValue(post.image);
    this.formgrouppost.controls['Date'].setValue(post.date);
  }
}




