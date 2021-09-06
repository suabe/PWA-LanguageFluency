import { Component, OnInit } from '@angular/core';

export interface MesTable {
  mes: string,
  ano: number,
  callsm: number,
  totalmin: number,
  realmin: number,
  payments: number
}

@Component({
  selector: 'app-commissions-calls',
  templateUrl: './commissions-calls.page.html',
  styleUrls: ['./commissions-calls.page.scss'],
})
export class CommissionsCallsPage implements OnInit {
  data = [
    {
      mes: 'ene',
      ano: 2021,
      callsm: 30,
      totalmin: 300,
      realmin: 300,
      payments: 630
    },
    {
      mes: 'feb',
      ano: 2021,
      callsm: 27,
      totalmin: 270,
      realmin: 270,
      payments: 567
    },
    {
      mes: 'mar',
      ano: 2021,
      callsm: 35,
      totalmin: 350,
      realmin: 350,
      payments: 735
    },
    {
      mes: 'abr',
      ano: 2021,
      callsm: 33,
      totalmin: 330,
      realmin: 330,
      payments: 693
    },
    {
      mes: 'may',
      ano: 2021,
      callsm: 30,
      totalmin: 300,
      realmin: 290,
      payments: 609
    },
    {
      mes: 'jun',
      ano: 2021,
      callsm: 31,
      totalmin: 310,
      realmin: 300,
      payments: 630
    },
    {
      mes: 'jul',
      ano: 2021,
      callsm: 6,
      totalmin: 60,
      realmin: 65,
      payments: 136.5
    }
  ]
  tabla: MesTable[]
  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.eligeMes()
  }



  eligeMes(mes=2021) {
    this.tabla = this.data.filter( meses => {
      return meses.ano == mes
    })
    // console.log(this.tabla);
    
    
  }

}
