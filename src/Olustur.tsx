import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { any } from 'prop-types';
interface IProps {
    type: any
    placeholder: any
    saveState: any
    name: any
    durumbilgisi: any
}
interface IState {
    value: any
}
interface YazProps {
    yazarlar: any
    saveState: any
    durumbilgisi: any
}
interface YazState {
    value: any
}
interface YayProps {
    yayinevleri: any
    saveState: any
    durumbilgisi: any
}
interface YayState {
    value: any
}
class Input extends Component<IProps, IState>{
    constructor(props: any){
        super(props);
        this.state={
            value: ""
        }
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(event: any){
        this.setState({
            value: event.target.value
        })
        this.props.saveState(this.props.name, event.target.value);
    }
    render(){
        if(this.props.durumbilgisi !=="" && this.state.value!==""){
            this.setState({value: ""})
            this.props.saveState(this.props.name, "");
        }
        return(
                <input className="form-control" type={this.props.type} placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange}/>
            );
    }
}
class Yazar extends Component<YazProps, YazState>{
    constructor(props: any){
        super(props)
        this.state = {
            value: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event: any){
        this.setState({
            value: event.target.value
        });
        this.props.saveState("yazarid", event.target.value);
    }
    render(){
        const yazarList = Object.entries(this.props.yazarlar).map((yaz: any, index) => {
            return(
                <option key={index} value={yaz[1].id}>{yaz[1].yazarAdi}</option>
            )
        })
        return(
            <select onChange={this.handleChange} className="form-control">
                <option value="">Yazar Seçin</option>
                {yazarList}
            </select>
        )
    }
}
class Yayinevi extends Component<YayProps, YayState>{
    constructor(props: any){
        super(props)
        this.state = {
            value: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event: any){
        this.setState({
            value: event.target.value
        });
        this.props.saveState("yayineviid", event.target.value);
    }
    render(){
        const yayineviList = Object.entries(this.props.yayinevleri).map((yay: any, index) => {
            return(
                <option key={index} value={yay[1].id}>{yay[1].yayineviAdi}</option>
            )
        })
        return(
            <select onChange={this.handleChange} className="form-control">
                <option value="">Yayinevi Seçin</option>
                {yayineviList}
            </select>
        )
    }
}
class Olustur extends Component<{},any> {
    constructor(props: any){
        super(props)
        this.state={
            yayinevleri: any,
            yazarlar: any,
            kitaplar: any,
            key: any,
            durumbilgisi: "",
            durumid: 0
        }
        this.saveState = this.saveState.bind(this);
    }
    saveState(key: any, value: any){
        this.setState({
            [key]: value
        })
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
    veriKaydet(kitapadi: any, kitapaciklamasi: any, stokdurumu: any, yazarid: any, yayineviid: any){
        const veri = {
            yazarID: yazarid,
            yayineviID: yayineviid,
            kitapAdi: kitapadi,
            aciklama: kitapaciklamasi,
            stokMiktari: stokdurumu
        }
        if(kitapadi!==""&&kitapaciklamasi!==""&&stokdurumu!==""&&yazarid!==""&&yayineviid!==""){
        fetch('https://5ca0c6abc1b53400149ac999.mockapi.io/api/v1/kitap/', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(veri)
                
           }).then(result => {
             this.setState({durumbilgisi : "Kitap Eklendi!"})
           }).catch((error) => {
            console.error(error);
            this.setState({durumbilgisi : "Kitap Eklenemedi!"})
            })
        }else this.setState({durumbilgisi : "Kitap Bilgilerini Boş Geçemezsiniz!"})
    }
  render() {
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
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Yeni Kitap</div><br/>
                    <form className="user">
                    <div className="form-group">
                        <Input type="text" name="kitapadi" placeholder="Kitap Adı" saveState={this.saveState} durumbilgisi={this.state.durumbilgisi}/>
                    </div>
                    <div className="form-group">
                        <Input type="text" name="kitapaciklamasi" placeholder="Kitap Açıklaması" saveState={this.saveState} durumbilgisi={this.state.durumbilgisi}/>
                    </div><div className="form-group">
                        <Input type="text" name="stokdurumu" placeholder="Stok Durumu" saveState={this.saveState} durumbilgisi={this.state.durumbilgisi}/>
                    </div><div className="form-group">
                        <Yazar yazarlar={this.state.yazarlar} saveState={this.saveState} durumbilgisi={this.state.durumbilgisi}/>
                    </div><div className="form-group">
                        <Yayinevi yayinevleri={this.state.yayinevleri} saveState={this.saveState} durumbilgisi={this.state.durumbilgisi}/>
                    </div><div className="form-group">
                        <button className="btn btn-primary btn-user btn-block" onClick={() => this.veriKaydet(this.state.kitapadi, this.state.kitapaciklamasi, this.state.stokdurumu, this.state.yazarid, this.state.yayineviid)}>Kaydet</button>
                    </div>
                    <div className="text-center border-left-danger">
                        <h5 className="small">{this.state.durumbilgisi}</h5>
                    </div>
                    </form>
                    <hr/>
                    <Link className="btn btn-secondary btn-user btn-block" to="/">Ana Sayfa</Link>
                    </div>
                    
                    
                </div>
                </div>
            </div>
            </div>
      </div>
      </div>
        
     
    )
  }
}

export default Olustur;
