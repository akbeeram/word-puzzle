import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  words:any ;
  directions: any;
  rows = 10;
  cols = 10;
  arr: any;
  userSelection: any;
  alphabets: string;
  gameCompleted: boolean;
  constructor() {

  }
  ngOnInit() {
    this.gameCompleted = false;
    this.alphabets = 'abcdefghijklmnopqrstuvwxyz';
    this.arr = new Array(this.rows);
    // this.arr.fill([]);
    for(let i=0;i<this.rows;i++){
      this.arr[i] = [];
      for(let j=0;j<this.cols;j++){
        this.arr[i].push([]);
      }
    }
    this.userSelection = JSON.parse(JSON.stringify(this.arr));
    // _.each(this.arr, (a) => {
    //   a = new Array(this.cols);
    //   a.fill([]);
    //   // _.each(a, (b) => {
    //   //   this.arr[a][b] = '';
    //   // })
    // });
    this.initializeWords();
    this.directions = [
      'diagUpLeft', 
      'diagUpright',
      'diagDownLeft',
      'diagDownRight',
      'horizontalLeft',
      'horizontalRight',
      'verticalUp',
      'verticalDown'
    ];
  }
  private initializeWords() {
    this.words = [
      {
        word:'ANIL'
      }, {
        word: 'KUMAR'
      }, {
        word: 'BEERAM'
      // }, {
      //   word: 'RAMYA'
      // }, {
      //   word: 'KRISHNA'
      }
    ];
  }
  private createNewGame() : any {
    console.log('called createNewGame');
    this.clearGrid();
    this.initialize();
    for(let i=0;i<this.arr.length;i++) {
      for(let j=0;j<this.arr[i].length;j++) {
        if(_.isEmpty(this.arr[i][j])) {
          this.arr[i][j] = this.alphabets.charAt(Math.floor(Math.random()*this.alphabets.length)).toUpperCase();
        }
      }
    }
  }
  private initialize = () => {
    _.each(this.words, this.randomizeDirection);
    //populate question words
        var isOverlapping = false;
    _.each(this.words, (word: any) => {
      var startRow = word.startRow;
      var startCol = word.startCol;
      var a = word.word.split('');
        word.alpha= [];
      _.each(a, (b: any) => {
        switch(word.direction) {
          case 'diagUpLeft':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;              
              word.alpha.push({row: startRow, col: startCol});
              startRow--;
              startCol--;
            } else {
              isOverlapping = true;
            }
            break;
          case 'diagUpright':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;              
              word.alpha.push({row: startRow, col: startCol});
              startRow--;
              startCol++;
            } else {
              isOverlapping = true;
            }
            break;
          case 'diagDownLeft':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;
              word.alpha.push({row: startRow, col: startCol});
              startRow++;
              startCol--;
            } else {
              isOverlapping = true;
            }
            break;
          case 'diagDownRight':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;
              word.alpha.push({row: startRow, col: startCol});
              startRow++;
              startCol++;
            } else {
              isOverlapping = true;
            }
            break;
          case 'horizontalLeft':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;
              word.alpha.push({row: startRow, col: startCol});
              startCol--;
            } else {
              isOverlapping = true;
            }
            break;
          case 'horizontalRight':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;
              word.alpha.push({row: startRow, col: startCol});
              startCol++;
            } else {
              isOverlapping = true;
            }
            break;
          case 'verticalUp':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;
              word.alpha.push({row: startRow, col: startCol});
              startRow--;
            } else {
              isOverlapping = true;
            }
            break;
            case 'verticalDown':
            if(this.checkForAlphaOverlap(startCol, startRow, b)) {
              this.arr[startRow][startCol] = b;              
              word.alpha.push({row: startRow, col: startCol});
              startRow++;
            } else {
              isOverlapping = true;
            }
            break;
        }
        if(isOverlapping) {
          return false;
        }
      });
      if(isOverlapping) {
        return false;
      }
    });
    if(isOverlapping) {
      this.createNewGame();
    }
    // this.checkForAlphaOverlap();
  }
  private randomizeDirection = (word: any) => {
    word.direction = this.directions[Math.floor(Math.random()*this.directions.length)];
    // word.direction = 'diagUpLeft';
    this.assignStartingPlace(word);
  }
  private assignStartingPlace(word: any) {
    word.startRow = Math.floor(Math.random()*this.rows);
    word.startCol = Math.floor(Math.random()*this.cols);
   if(this.checkIfStartPlaceIsValid(word)) {
     word.validPos = true;
   } else {
     word.validPos = false;
     this.randomizeDirection(word);
   }
  }
  private checkIfStartPlaceIsValid = (word: any) => {
    switch(word.direction) {
      case 'diagUpLeft':
        return (word.startRow - word.word.length) >= 0 && (word.startCol-word.word.length)>=0;
      case 'diagUpright':
        return (word.startRow - word.word.length) >= 0 && (word.startCol+word.word.length)<this.cols;
      case 'diagDownLeft':
        return (word.startRow + word.word.length) < this.rows && (word.startCol-word.word.length)>=0;
      case 'diagDownRight':
        return (word.startRow + word.word.length) <this.rows && (word.startCol+word.word.length)<this.cols;
      case 'horizontalLeft':
        return (word.startCol - word.word.length) >=0;
      case 'horizontalRight':
        return (word.startCol + word.word.length) <this.cols;
      case 'verticalUp':
        return (word.startRow - word.word.length) >=0;
      case 'verticalDown':
        return (word.startRow + word.word.length) <this.rows;
    }
  }
  private clearGrid(): any {
    for(let i=0;i<this.rows;i++){
      for(let j=0;j<this.cols;j++){
        this.arr[i][j] = '';
      }
    }
    this.userSelection = JSON.parse(JSON.stringify(this.arr));
  }
  private checkForAlphaOverlap(startCol, startRow, alpha) {
    return _.isEmpty(this.arr[startRow][startCol]) || this.arr[startRow][startCol] === alpha;
  }
  public selectBlock(alpha, row, col) {
    console.log(alpha, row, col);
    this.userSelection[row][col] = !this.userSelection[row][col];
    this.checkIfWordsSelected();
  }
  private checkIfWordsSelected(): any {
    console.log(this.userSelection);
    _.each(this.words, (word) => {
      word.userSelects = word.userSelects || [];
      _.each(word.alpha, (pos) => {
        // pos.selected = false;
        if(this.userSelection[pos.row][pos.col]) {
          // word.userSelects.push(true);
          pos.selected = true;
          // return false;
        }
      });
      let a = word.alpha.map(pos => !!pos.selected);
      // word.userSelectedAllAlpha = false;
      if(_.countBy(a, b => b).true === word.word.length) {
        word.userSelectedAllAlpha = true;
      } else {
        word.userSelectedAllAlpha = false;
      }
    });
    this.checkForGameCompletion();
  }
  private checkForGameCompletion() {
    let result = this.words.map(word => word.userSelectedAllAlpha);
    if(_.countBy(result, a => a).true === this.words.length) {
      this.gameCompleted = true;
    }
    console.log(result);
  }
}
