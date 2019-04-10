import React, { Component } from 'react';
import './App.css';
import {Link} from "react-router-dom"
import { any } from 'prop-types';
interface DProps {
    match: any
}
interface DState {
    yayinevleri: any
    yazarlar: any
    kitaplar: any
}
const DetayList = (props: any) => {
    console.log()
    if(props.yazar && props.yayinevi){
    return(
        <div>
            <p className="h5 mb-0 font-weight-bold text-gray-800">Kitap No</p><p>{props.kitap.id}</p>
            <p className="h5 mb-0 font-weight-bold text-gray-800">Kitabın Adı</p><p>{props.kitap.kitapAdi}</p>
            <p className="h5 mb-0 font-weight-bold text-gray-800">Yazarı</p><p>{props.yazar.yazarAdi}</p>
            <p className="h5 mb-0 font-weight-bold text-gray-800">Yayınevi</p><p>{props.yayinevi.yayineviAdi}</p>
            <p className="h5 mb-0 font-weight-bold text-gray-800">Açıklama</p><p>{props.kitap.aciklama}</p>
            <p className="h5 mb-0 font-weight-bold text-gray-800">Stok Miktarı</p><p>{props.kitap.stokMiktari}</p>
        </div>
    )
    }else return(
        <div><p>Yükleniyor...</p></div>
    )
}
class Detay extends Component<DProps, DState> {
    constructor(props: any){
        super(props)
        this.state={
            yayinevleri: any,
            yazarlar: any,
            kitaplar: any
        }
    }
    async componentDidMount(){
        await fetch('https://5ca0c6abc1b53400149ac999.mockapi.io/api/v1/kitap')
        .then(kabasonuc => {
            return kabasonuc.json()
        }).then(sonuclarj => {
            this.setState({kitaplar : sonuclarj})
        }).catch((error) => {
            console.error(error);
            });
        await fetch('https://5ca0c6abc1b53400149ac999.mockapi.io/api/v1/yazar/')
        .then(yazarsonuc => {
            return yazarsonuc.json()
        }).then(sonuclary => {
            this.setState({yazarlar : sonuclary})
            
        }).catch((error) => {
            console.error(error);
            });
        await fetch('https://5ca0c6abc1b53400149ac999.mockapi.io/api/v1/yayinevi/')
        .then(yayinevisonuc => {
            return yayinevisonuc.json()
        }).then(sonuclary => {
            this.setState({yayinevleri : sonuclary})
            
        }).catch((error) => {
            console.error(error);
            });
    }
  render() {
      const { params } = this.props.match
        const yazarno = this.state.kitaplar[params.id-1]
        const yayinevino = this.state.kitaplar[params.id-1]
    if(yazarno && yayinevino){
    return (
        <div>
            <br/><br/>
        <div className="row">
            <div className="col-md-4 mb-4"></div>
            <div className="col-md-4 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Detaylar</div>
                    <div><DetayList kitap={this.state.kitaplar[params.id-1]} yazar={this.state.yazarlar[yazarno.yazarID-1]} yayinevi={this.state.yayinevleri[yayinevino.yayineviID-1]}/></div>
                    </div>
                </div>
                <hr/>
                    <Link className="btn btn-secondary btn-user btn-block" to="/">Ana Sayfa</Link>
                </div>
            </div>
            </div>
      </div>
      </div>
    )} else return (
        <div>
            <br/><br/>
        <div className="row">
            <div className="col-md-4 mb-4"></div>
            <div className="col-md-4 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Detaylar</div>
                    <div><DetayList kitap={this.state.kitaplar[params.id]}/></div>
                    </div>
                </div>
                <hr/>
                    <Link className="btn btn-secondary btn-user btn-block" to="/">Ana Sayfa</Link>
                </div>
            </div>
            </div>
      </div>
      </div>
    )
  }
}

export default Detay;
