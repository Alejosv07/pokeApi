import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css'
})
export class Loading {
  @ViewChild("loading") imgLoading!:HTMLImageElement;

  stopAnimation(){
    this.imgLoading.style.animationIterationCount = "0";
  }

  startAnimation(){
    this.imgLoading.style.animationIterationCount = "infinite";
  }
}
