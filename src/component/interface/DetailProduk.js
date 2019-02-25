import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

class DetailProduk extends Component {

    state={
        produk: []
    }

    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        var idproduk = params.id;
        this.renderDetailproduk(idproduk);
    }

    renderDetailproduk = (idproduk) => {
        axios.get('http://localhost:2000/produk-detail/'+ idproduk)
        .then((res) => {
            this.setState({produk: res.data})
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    putDetailProduk = () => {
        var produkDetail = this.state.produk.map((item) => {
            var {nama,deskripsi,harga,image,kategori} = item;
            return(
                <div className="row">
                    <div className="col-md-5">
                            <div>
                            <img src={image} className="img-responsive" height="225px" width="auto"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="">
                            <h4>{nama}</h4>
                            <h4>Rp {harga}</h4>
                            <p>{deskripsi}</p>
                            <p>{kategori}</p>
                            <button className="btn btn btn-primary" type="button">Add to cart</button>
                        </div>

                    </div>
                </div>
            )
        })
        return produkDetail;
    }

    render() {
        return (
            <div className="container">
                {this.putDetailProduk()};
            </div>
        )
    }
}

export default DetailProduk;