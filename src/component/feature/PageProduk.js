import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {

    state = { listProduk: [], addProduk: '', editProduk: '', selectedEditProdukId: 0 }
    
    componentDidMount() {
        this.getProdukList();
    }

    getProdukList = () => {
        axios.get('http://localhost:2000/produk')
        .then((res) => {
            this.setState({ listProduk: res.data, selectedEditProdukId:0 })
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var id_kategori = this.refs.id_kategori.value;
        var nama = this.refs.nama.value;
        var harga = this.refs.harga.value;
        var deskripsi = this.refs.deskripsi.value;
        var image = this.refs.image.value;

        axios.post('http://localhost:2000/addproduk',{
            id_kategori,nama,harga,deskripsi,image
        })
        .then((res) => {
            alert('input produk success')
            this.getProdukList();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnUpdateClick = (id) => {
        var nama = this.refs.EditNamaProduk.value;
        var id_kategori = this.refs.EditKategoriProduk.value;
        var image = this.refs.EditImageProduk.value;
        var harga = this.refs.EditHargaProduk.value;
        var deskripsi = this.refs.EditDeskripsi.value;

        axios.post('http://localhost:2000/editproduk/' + id,{
            id_kategori,nama,harga,deskripsi,image
        })
        .then((res) => {
            alert('update sukses')
            this.getProdukList();
        })
        .catch((err) => {
            console.log(err)
        })     
    }
    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete("http://localhost:2000/deleteproduk/" + id)
            .then((res) => {
                alert('Delete Success');
                this.getProdukList();
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    renderListProduk = () => {
        var listJSX = this.state.listProduk.map((item) =>  {
            if(item.id === this.state.selectedEditProdukId) {
                return (
                    <tr>
                        <td></td>
                        <td><input type="text" ref="EditKategoriProduk" defaultValue={item.id_kategori} /></td>
                        <td><input type="text" ref="EditNamaProduk" defaultValue={item.nama} /></td>
                        <td><input type="text" ref="EditHargaProduk" defaultValue={item.harga} /></td>
                        <td><input type="text" ref="EditDeskripsi" defaultValue={item.deskripsi} /></td>
                        <td><input type="text" ref="EditImageProduk" defaultValue={item.image} /></td>
                        <td><input type="button" class="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedEditProdukId: 0 })} /></td>
                        <td><input type="button" class="btn btn-primary" value="Save" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.id_kategori}</td>
                    <td>{item.nama}</td>
                    <td>{item.harga}</td>
                    <td>{item.deskripsi}</td>
                    <td><img src={item.image} alt="img" width="100px" height="auto"/></td>
                    <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => this.setState({selectedEditProdukId:item.id})} /></td>
                    <td><input type="button" class="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>
                </tr>
            )
        })
        return listJSX;
    }

    render() {
        return (
            <div>
                <center>
                    <h1>LIST PRODUK</h1>
                        <table>
                            <thead>
                                <tr>
                                <th>Id</th>
                                <th>Id Produk</th>
                                <th>Nama</th>
                                <th>harga</th>
                                <th>Deskripsi</th>
                                <th>Image</th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                        <tbody>
                            {this.renderListProduk()}                  
                        </tbody>
                        <tfoot>
                            <td></td>
                            <td><input type="text" ref="id_kategori"/></td>
                            <td><input type="text" ref="nama"/></td>
                            <td><input type="text" ref="harga"/></td>
                            <td><input type="text" ref="deskripsi"/></td>
                            <td><input type="text" ref="image"/></td>
                            <td><input type="button" class="btn btn-success" id="addProduk" value="addProduk" onClick={this.onBtnAddClick} /></td>
                            <td></td>
                        </tfoot>
                    </table>
                </center>
            </div> 
        )
    }
}


export default Product;
