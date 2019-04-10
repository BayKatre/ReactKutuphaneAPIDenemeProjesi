import React, { Props } from "react";
import "./index.css";
import { any, checkPropTypes } from "prop-types";
import {Link} from "react-router-dom"
interface KProps {
    kitaplar: any
    yazarlar: any
    yayinevleri: any
}
interface KState {}
interface SProps {
    kitaplar: any
    saveState: any
    sayfaSayisi: any
}
interface SState {
    sayfaSayisi: any
}
interface IProps {
    type: any
    placeholder: any
    saveState: any
    name: any
    kitaplar: any
    yazarlar: any
    yayinevleri: any
    parametreid: any
    sayfaSayisi: any
}
interface IState {
    filtered: any
}
class Kitaplar extends React.Component<KProps, KState>{
    constructor(props: any){
        super(props)
    }

    render(){
        if(this.props.yazarlar && this.props.yayinevleri){
            const link = "/detail/"+this.props.kitaplar.id+"/"
        return(
            <tr>
                <td>{this.props.kitaplar.id}</td>
                <td>{this.props.kitaplar.kitapAdi}</td>
                <td>{this.props.yazarlar.yazarAdi}</td>
                <td>{this.props.yayinevleri.yayineviAdi}</td>
                <td><Link className="btn btn-info" to={link}>Detay</Link></td>
            </tr>
        )
        } else return(
            <tr>
                <td>{this.props.kitaplar.id}</td>
                <td>{this.props.kitaplar.kitapAdi}</td>
                <td>Yükleniyor...</td>
                <td>Yükleniyor...</td>
                <td><Link className="btn btn-info" to="/detail">Detay</Link></td>
            </tr>
        )
    }
}
const KitapList = (props: any) => {
    if(props.yeniKitap && Object.values(props.yeniKitap).length){
        let yeniList= props.yeniKitap
        const aramaIDList= Object.entries(yeniList).map((kit: any, index) => {
            return kit[1].id
        })
        console.log(aramaIDList)
        console.log(yeniList)
        if(props.sayfaid) {
             const list = Object.values(yeniList).filter((kit: any, index) => {
                if((props.sayfaid-1)*5<index+1 && index+1<=props.sayfaid*5){
                    return true
                }
                else return false
                })
            console.log(list)
            yeniList=list
        }
        const kitapList= Object.entries(yeniList).map((kit: any, index) => {
            return(
                <Kitaplar kitaplar={kit[1]} yazarlar={props.yazarlar[kit[1].yazarID-1]} yayinevleri={props.yayinevleri[kit[1].yayineviID-1]} key={index}/>
            )
        })
        return(
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Kitap No</th>
                                <th>Kitap Adı</th>
                                <th>Yazarı</th>
                                <th>Yayınevi</th>
                                <th>Eylemanan</th>
                            </tr>
                        </thead>
                        <tbody className="kitap_liste">{kitapList}</tbody>
                    </table>
                </div>
            </div>
        )
    }else if(props.kitaplar && !Object.values(props.yeniKitap).length){
        let yeniList: any
        if(props.sayfaid) {
             const list = Object.values(props.kitaplar).filter((kit: any) => {
                if((props.sayfaid-1)*5<kit.id && kit.id<=props.sayfaid*5){
                    return true
                }
                else return false
                })
            console.log(list)
            yeniList=list
        }
        const kitapList= Object.entries(yeniList).map((kit: any, index) => {
            return(
                <Kitaplar kitaplar={kit[1]} yazarlar={props.yazarlar[kit[1].yazarID-1]} yayinevleri={props.yayinevleri[kit[1].yayineviID-1]} key={index}/>
            )
        })
        return(
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Kitap No</th>
                            <th>Kitap Adı</th>
                            <th>Yazarı</th>
                            <th>Yayınevi</th>
                            <th>Eylem</th>
                        </tr>
                    </thead>
                    <tbody className="kitap_liste">{kitapList}</tbody>
                </table>
            </div>
            
        </div>
        )
    }
    else return(<div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Kitap No</th>
                                    <th>Kitap Adı</th>
                                    <th>Yazarı</th>
                                    <th>Yayınevi</th>
                                    <th>Eylem</th>
                                </tr>
                            </thead>
                            <tbody className="kitap_liste"></tbody>
                        </table>
                    </div>
                </div>
)
}
class Input extends React.Component<IProps, IState>{
    constructor(props: any) {
		super(props);
		this.state = {
			filtered: any
		}
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeForParams = this.handleChangeForParams.bind(this)
	}
	handleChange(e: any) {
        let currentList = []
        let newList = []
        let yokList = [{
            "id": "",
            "kitapAdi": "Böyle bir kitap yok!",
            "yazarID": "",
            "yayineviID": "",
            "stokMiktari": "",
            "aciklama": ""
        }]
        if (e.target.value !== "") {
            if(this.props.kitaplar && this.props.parametreid ==1){
                currentList = this.props.kitaplar;
                newList = currentList.filter((item: any) => {
                const lc = item.kitapAdi.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
                })
                if(!newList.length) newList = yokList
            }else if(this.props.kitaplar && this.props.parametreid ==2){
                currentList = this.props.yazarlar;
                newList = currentList.filter((item: any) => {
                const lc = item.yazarAdi.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
                })
                const newListYazarID=newList.map((kit: any) => {
                    return(
                        kit.id
                    )
                })
                let kitapList = this.props.kitaplar.filter((item: any) => {
                    const lc = newListYazarID
                    const filter = item.yazarID
                    return lc.includes(filter);
                    })
                newList=kitapList
                if(!newList.length) newList = yokList
                console.log(newList)
            }else if(this.props.kitaplar && this.props.parametreid ==3){
                currentList = this.props.yayinevleri;
                newList = currentList.filter((item: any) => {
                const lc = item.yayineviAdi.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
                })
                const newListYayineviID=newList.map((kit: any) => {
                    return(
                        kit.id
                    )
                })
                let kitapList = this.props.kitaplar.filter((item: any) => {
                    const lc = newListYayineviID
                    const filter = item.yayineviID
                    return lc.includes(filter);
                    })
                newList=kitapList
                if(!newList.length) newList = yokList
                console.log(newList)
            } else newList = yokList;
            if(newList.length>5){
                let sayfa=[]
                for(let i=0; i<newList.length; i+=5){
                    sayfa.push(i)
                    this.props.saveState("sayfaSayisi", sayfa)
                }
            }else this.props.saveState("sayfaSayisi", ["1"])
        }else if (e.target.value == "") {
            newList= []
            if(this.props.kitaplar.length>5){
                let sayfa=[]
                for(let i=0; i<this.props.kitaplar.length; i+=5){
                    sayfa.push(i)
                    this.props.saveState("sayfaSayisi", sayfa)
                }
            }else this.props.saveState("sayfaSayisi", ["1"])
        }
        
        console.log(newList)
        this.props.saveState("yeniKitap", newList);
    }
    handleChangeForParams(e: any){
        if (e.target.value == "1") 
            {this.props.saveState("parametreid", 1);console.log(this.props.parametreid)}
        else if (e.target.value == "2") 
            {this.props.saveState("parametreid", 2);console.log(this.props.parametreid)}
        else if (e.target.value == "3") 
            {this.props.saveState("parametreid", 3);console.log(this.props.parametreid)}
        else
            {this.props.saveState("parametreid", 0);console.log(this.props.parametreid)}
    }
    render(){
        return( 
            <form className="d-none d-sm-inline-block form-inline">
                <div className="input-group">
                    <input type={this.props.type} className="form-control border-1 small" placeholder={this.props.placeholder} onChange={this.handleChange}/>
                    <select onChange={this.handleChangeForParams} className="form-control">
                        <option value="1">Parametre Seçin (Varsayılan Kitap)</option>
                        <option value="2">Yazar</option>
                        <option value="3">Yayınevi</option>
                    </select>

                </div>
          </form>
            );
    }
}
class Sayfalama extends React.Component<SProps, SState>{
    constructor(props: any) {
		super(props);
		this.state = {
			sayfaSayisi: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e: any){
        if(e!==""){
            this.props.saveState("sayfaid", e+1)
        }
        else this.props.saveState("sayfaid", 1)
        }
    render(){
        const sayfaList= Object.entries(this.props.sayfaSayisi).map((kit: any, index) => {
            return(
                <li className="page-item" key={index} onClick={() => { this.handleChange(index) }}><button className="page-link">{index+1}</button></li>
            )
        })

        return(
            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-lg justify-content-end">
                    {sayfaList}
                </ul>
            </nav>
        )
    }
}
class Veriler extends React.Component<{},any>{
    constructor(props: any){
        super(props)
        this.state={
            yayinevleri: any,
            yazarlar: any,
            kitaplar: any,
            key: any,
            parametreid: 1,
            sayfaid: 1,
            yeniKitap: [],
            sayfaSayisi: []
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
            if(this.state.kitaplar.length>5){
                let sayfa=[]
                for(let i=0; i<this.state.kitaplar.length; i+=5){
                    sayfa.push(i)
                    this.setState({sayfaSayisi: sayfa})
                }
            }
    }
    render(){
        return(
            <div id="wrapper"><br/>
                <div id="content-wrapper" className="d-flex flex-column"><br/>
                    <div id="content">
                        <div className="container-fluid">
                            <h1 className="h3 mb-2 font-weight-bold text-primary text-gray-800">React Kütüphane API Deneme Projesi</h1><br/>  
                        </div>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <div className="row">
                                    <div className="col-md-3 col-xs-12">
                                        <h6 className="m-0 font-weight-bold text-primary">Kitap Listesi</h6>
                                    </div>
                                    <div className="col-md-7 col-xs-12">
                                        <Input type="text" name="arama" placeholder="Arama" saveState={this.saveState} kitaplar={this.state.kitaplar} yazarlar={this.state.yazarlar} yayinevleri={this.state.yayinevleri} parametreid={this.state.parametreid} sayfaSayisi={this.state.sayfaSayisi}/>
                                    </div>
                                    <div className="col-md-2 col-xs-12">
                                        <Link className="btn btn-primary" to="/create">Kitap Ekle</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body py-3">
                            <KitapList kitaplar={this.state.kitaplar} yazarlar={this.state.yazarlar} yayinevleri={this.state.yayinevleri} yeniKitap={this.state.yeniKitap} saveState={this.saveState} sayfaid={this.state.sayfaid}/>
                            <div className="row">
                                    <div className="col-md-4 col-xs-12">
                                        <h6 className="m-0 font-weight-bold text-primary">Sayfa: {this.state.sayfaid}/{this.state.sayfaSayisi.length}</h6>
                                    </div>
                                    <div className="col-md-4 col-xs-12">
                                    </div>
                                    <div className="col-md-4 col-xs-12">
                                        <Sayfalama kitaplar={this.state.kitaplar} saveState={this.saveState} sayfaSayisi={this.state.sayfaSayisi}/>
                                    </div>
                                </div>
                            
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Veriler;