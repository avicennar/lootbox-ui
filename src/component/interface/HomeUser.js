import React,{Component} from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';
import Axios from 'axios';

class HomeUser extends Component{
    state={
        dataKategori:[]
    }
    componentDidMount(){
        this.getKategori()
    }
    getKategori=()=>{
        Axios.get("http://localhost:2000/categories")
        .then((res)=>{
            this.setState({dataKategori:res.data})
            console.log(this.state.dataKategori)
        }).catch((err)=>{
            console.log(err)
        })
    }
    renderDataKategori=()=>{
        var kategori = this.state.dataKategori.map((item)=>{
            var {id,nama}= item
            return (
                <div className="col-md-4 mb-4">
                    <a  href={`/categories?id=${id}`} className="text-dark btn">
                        <Card >
                            <CardTitle>{nama}</CardTitle>
                        </Card>
                    </a>
                </div>
            )
        })
        return kategori
    }
    render(){
        return(
            <div className="container">
              <center><h1>INSIDE LOOTBOX</h1></center>
                <div className="row">
                   {this.renderDataKategori()}
                </div>
             </div>
        )
    }
}
export default HomeUser;