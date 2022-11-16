import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  url = '/api-tarea';
  constructor(private http: HttpClient) {}

  //get tarea
  getTareas() {
    return this.http.get('/api-tarea/getTareas');
  }

  //get un tarea
  getTarea(id: string) {
    return this.http.get('/api-tarea/getTarea/' + id);
  }

  //agregar un tarea
  addTarea(tarea: AgregarTarea) {
    return this.http.post(this.url, tarea);
  }

  //eliminar un tarea
  deleteTarea(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  //modificar un tarea
  editTarea(id: string, tarea: Tarea) {
    return this.http.put(this.url + '/UpdateTarea/' + id, tarea);
  }
}

export interface Tarea {
  id_t?: string;
  nombre_t?: string;
  descripcion_t?: string;
  fecha_inicio_t?: string;
  fecha_entrega_t?: string;
  porcentaje_avance_t?: string;
  estado_t?: string;
}

export interface AgregarTarea {
  nombre_t?: string;
  descripcion_t?: string;
  fecha_inicio_t?: string;
  fecha_entrega_t?: string;
  porcentaje_avance_t?: string;
  estado_t?: string;
}
