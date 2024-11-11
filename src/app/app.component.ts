import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'to-do-list';
  isAvilaple = false;
  task:string[]= []
  newTask:string= ''
  temp :any ;
  mode = 'add';
  ngOnInit(): void {
    this.getTask()
  }
  getTask(){
    if('task' in localStorage){
      this.task = JSON.parse(localStorage.getItem('task')!)
      if(this.task.length>0){
        this.isAvilaple = true
      }
    }
  }
  addTask(){
    if (this.mode == 'add'){
      if(this.newTask !== ''){
        this.task.push(this.newTask);
        this.newTask = '';
      }
        localStorage.setItem('task',JSON.stringify(this.task))
        this.isAvilaple = true;
    }else{
      this.task[this.temp] = this.newTask ;
      localStorage.setItem('task',JSON.stringify(this.task))
    }
  }
  delate(index:number){
    this.task.splice(index,1)
    if(this.task.length  === 0){
      this.isAvilaple = false
    }
    localStorage.setItem('task',JSON.stringify(this.task))
  }
  update(index:number){
    this.mode = 'update'    
    let updates:any = document.getElementById('up');
    updates.value =  this.task[index];
    this.temp = index ;
    let mode:any = document.getElementById('mode');
    mode.innerHTML = 'UPDATE' ;
  }

}
